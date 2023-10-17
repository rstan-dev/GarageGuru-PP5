rest_framework import permission


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