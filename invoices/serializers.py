from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):
    """
    Serializes specific Invoice model fields into JSON data.

    Sets unique names for inv_id, inv_owner, job_assigned_to, job_id,
    inv_created_at and inv_updated_at to avoid clashing with job model field names.

    get_is_inv_owner method checks if the user making the request is the owner of
    the profile.
    """
    inv_id = serializers.IntegerField(source='id', read_only=True)
    inv_owner = serializers.ReadOnlyField(source='owner.username')
    job_assigned_to = serializers.ReadOnlyField(source='job.assigned_to.username')
    is_inv_owner = serializers.SerializerMethodField()
    job_id = serializers.IntegerField()

    # Formats date and time
    inv_created_at = serializers.DateTimeField(source="created_at", format="%Y-%m-%d %H:%M:%S", read_only=True)
    inv_updated_at = serializers.DateTimeField(source="updated_at", format="%Y-%m-%d %H:%M:%S", read_only=True)
    # Format with only date
    inv_due_date = serializers.DateField(source="due_date", format="%Y-%m-%d")

    def get_is_inv_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Invoice
        fields = [
            'inv_id', 'inv_owner', 'job_assigned_to', 'is_inv_owner', 'job_id',
            'customer_firstname', 'customer_lastname', 'customer_email', 'customer_phone', 'inv_created_at', 'inv_updated_at','inv_due_date', 'amount', 'invoice_status'
        ]


class InvoiceDetailSerializer(InvoiceSerializer):
    """
    Invoice Detail Serializer ensures an invoice is always associated
    with a specific job
    """
    job_id = serializers.ReadOnlyField(source='job.id')