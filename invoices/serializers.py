from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):
    """
    Serializes specific Job model fields into JSON data.

    assigned_to variable returns username dropdown.


    get_is_owner method checks if the user making the request is the owner of
    the profile.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    assigned_to = serializers.ReadOnlyField(source='job.assigned_to.username')
    is_owner = serializers.SerializerMethodField()

    # Formats date and time
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    # Format with only date
    due_date = serializers.DateField(format="%Y-%m-%d")

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Invoice
        fields = [
            'id', 'owner', 'assigned_to', 'is_owner', 'job',
            'customer_firstname', 'customer_lastname', 'customer_email', 'customer_phone', 'created_at', 'updated_at','due_date', 'amount', 'invoice_status'
        ]


class InvoiceDetailSerializer(InvoiceSerializer):
    """
    Invoice Detail Serializer ensures an invoice is always associated
    with a specific job
    """
    job = serializers.ReadOnlyField(source='job.id')
