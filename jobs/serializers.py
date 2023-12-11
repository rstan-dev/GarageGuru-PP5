"""
Imports for JobSerializer
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import Job
from invoices.serializers import InvoiceSerializer
from watchers.models import Watch


class JobSerializer(serializers.ModelSerializer):
    """
    Serializes specific Job model fields into JSON data.

    assigned_to variable returns username dropdown.

    validate_image uses validation function to manage image size.

    get_is_owner method checks if the user making the request is the owner of
    the profile.

    get_watch_id retreives the associated watch id for the job.
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    owner_id = serializers.ReadOnlyField(source="owner.id")
    is_owner = serializers.SerializerMethodField()
    has_invoice = serializers.SerializerMethodField()
    comment_count = serializers.IntegerField(read_only=True)
    invoice_details = serializers.SerializerMethodField()
    watch_id = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), allow_null=True
    )

    # Formats date and time
    created_at = serializers.DateTimeField(
        format="%d %b %Y - %H:%M:%S", read_only=True
    )
    # Format with only date
    due_date = serializers.DateField(format="%d %b %Y")

    def get_updated_at(self, obj):
        """
        Provides a human-readable representation of the comment's updated
        time.
        """
        return naturaltime(obj.updated_at)

    def validate_image(self, value):
        # Check if file size is greater than 2mb
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError("Image size larger than 2mb!")
        if value.image.width > 2048:
            raise serializers.ValidationError(
                "Image width larger than 2048px!"
            )
        if value.image.height > 2048:
            raise serializers.ValidationError(
                "Image height larger than 2048px!"
            )
        return value

    def get_is_owner(self, obj):
        """
        Determines if the request user is the owner of the comment.
        """
        request = self.context["request"]
        return request.user == obj.owner

    def get_has_invoice(self, obj):
        """
        Determines if the job has an associated invoice.
        """
        return hasattr(obj, "invoice")

    def get_invoice_details(self, obj):
        """
        Determines if there is an invoice and returns the invoice data.
        """
        invoice = getattr(obj, "invoice", None)
        if invoice:
            return InvoiceSerializer(invoice).data
        return None

    def get_watch_id(self, obj):
        """
        Determines if the user is authenticated, gets the watch id
        associated with a user and a job.
        """
        user = self.context["request"].user
        if user.is_authenticated:
            watch = Watch.objects.filter(owner=user, job=obj).first()
            return watch.id if watch else None
        else:
            return None

    class Meta:
        model = Job
        fields = [
            "id",
            "owner",
            "owner_id",
            "assigned_to",
            "job_type",
            "job_details",
            "status",
            "created_at",
            "updated_at",
            "image",
            "is_owner",
            "image_filter",
            "due_date",
            "has_invoice",
            "comment_count",
            "invoice_details",
            "watch_id",
        ]
