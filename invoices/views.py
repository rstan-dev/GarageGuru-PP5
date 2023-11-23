from rest_framework import status, permissions, generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Invoice
from .serializers import InvoiceSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend


class CustomPagination(PageNumberPagination):
    """
    View to add a count of all invoice status types to pagination data
    """
    def get_paginated_response(self, data):
        # Gets the total counts for each status according to filter set
        request = self.request
        filtered_queryset = request.filtered_queryset if hasattr(request, 'filtered_queryset') else Invoice.objects.all()
        invoice_status_counts = filtered_queryset.values('invoice_status').annotate(total=Count('invoice_status')).order_by()
        invoice_status_counts_dict = {item['invoice_status']: item['total'] for item in invoice_status_counts}

        return Response({
            'invoice_status_counts': invoice_status_counts_dict,  # Include the counts
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })


class InvoiceList(generics.ListCreateAPIView):
    """
    View to retrieve a list of invoices or create a new invoice using the
    perform_create function.
    serializer_class renders form.
    permission_classes requires users to be logged in to create an
    invoice card.
    """
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    search_fields = [
        'owner__username',
        'id',
        'customer_firstname',
        'customer_lastname',
        'customer_email',
        'customer_phone',
        'due_date',
        'job__id',
        'job__job_type',
        'invoice_status',
    ]
    ordering_fields = [
        'created_at',
        'updated_at',
        'due_date',
    ]
    filterset_fields = [
        'job_id'
    ]

    def get_queryset(self):
        queryset = Invoice.objects.all()
        # Apply the filters from the filter backends manually
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        # Assign the filtered queryset to the request for use in pagination
        self.request.filtered_queryset = queryset
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class InvoiceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, edit or delete an invoice card according to invoice id and
    if the owner is logged in.
    """
    serializer_class = InvoiceSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Invoice.objects.all()

