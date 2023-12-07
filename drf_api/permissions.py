"""
Imports for Permissions
"""
from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Allows all users Read Only access and controls access to specific
    objects based on whether the user making the request is the owner
    of the object or not.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class IsOwnerOrAssignedToOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or users assigned
    to the job to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request,
        if request.method in SAFE_METHODS:
            return True

        is_owner = obj.owner == request.user

        # Checks if the user is assigned to the job
        is_assigned_to_job = obj.job and (
            obj.job.assigned_to == request.user
            or obj.job.assigned_to_id == request.user.id
        )

        return is_owner or is_assigned_to_job

