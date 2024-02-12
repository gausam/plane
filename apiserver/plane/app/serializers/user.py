# Third party imports
from rest_framework import serializers

# Module import
from .base import BaseSerializer
from plane.db.models import (
    User,
    Workspace,
    WorkspaceMemberInvite,
    Profile,
    Account,
    Session,
)
from plane.license.models import InstanceAdmin, Instance


class UserSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "is_superuser",
            "is_staff",
            "last_active",
            "last_login_time",
            "last_logout_time",
            "last_login_ip",
            "last_logout_ip",
            "last_login_uagent",
            "token_updated_at",
            "is_bot",
            "is_password_autoset",
            "is_email_verified",
        ]
        extra_kwargs = {"password": {"write_only": True}}

        # If the user has already filled first name or last name then he is onboarded
        def get_is_onboarded(self, obj):
            return bool(obj.first_name) or bool(obj.last_name)


class UserMeSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "avatar",
            "cover_image",
            "date_joined",
            "display_name",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_bot",
            "is_email_verified",
            "is_managed",
            "mobile_number",
            "user_timezone",
            "username",
            "is_password_autoset",
            "is_email_verified",
        ]
        read_only_fields = fields


class UserMeSettingsSerializer(BaseSerializer):
    workspace = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "workspace",
        ]
        read_only_fields = fields

    def get_workspace(self, obj):
        workspace_invites = WorkspaceMemberInvite.objects.filter(
            email=obj.email
        ).count()

        # profile
        profile = Profile.objects.get(user=obj)
        if (
            profile.last_workspace_id is not None
            and Workspace.objects.filter(
                pk=profile.last_workspace_id,
                workspace_member__member=obj.id,
                workspace_member__is_active=True,
            ).exists()
        ):
            workspace = Workspace.objects.filter(
                pk=profile.last_workspace_id,
                workspace_member__member=obj.id,
                workspace_member__is_active=True,
            ).first()
            return {
                "last_workspace_id": profile.last_workspace_id,
                "last_workspace_slug": workspace.slug
                if workspace is not None
                else "",
                "fallback_workspace_id": profile.last_workspace_id,
                "fallback_workspace_slug": workspace.slug
                if workspace is not None
                else "",
                "invites": workspace_invites,
            }
        else:
            fallback_workspace = (
                Workspace.objects.filter(
                    workspace_member__member_id=obj.id,
                    workspace_member__is_active=True,
                )
                .order_by("created_at")
                .first()
            )
            return {
                "last_workspace_id": None,
                "last_workspace_slug": None,
                "fallback_workspace_id": fallback_workspace.id
                if fallback_workspace is not None
                else None,
                "fallback_workspace_slug": fallback_workspace.slug
                if fallback_workspace is not None
                else None,
                "invites": workspace_invites,
            }


class UserLiteSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "avatar",
            "is_bot",
            "display_name",
        ]
        read_only_fields = [
            "id",
            "is_bot",
        ]


class UserAdminLiteSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "avatar",
            "is_bot",
            "display_name",
            "email",
        ]
        read_only_fields = [
            "id",
            "is_bot",
        ]


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    confirm_password = serializers.CharField(required=True, min_length=8)

    def validate(self, data):
        if data.get("old_password") == data.get("new_password"):
            raise serializers.ValidationError(
                {"error": "New password cannot be same as old password."}
            )

        if data.get("new_password") != data.get("confirm_password"):
            raise serializers.ValidationError(
                {
                    "error": "Confirm password should be same as the new password."
                }
            )

        return data


class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """

    new_password = serializers.CharField(required=True, min_length=8)


class ProfileSerializer(BaseSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class AccountSerializer(BaseSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class SessionSerializer(BaseSerializer):

    class Meta:
        model = Session
        fields = "__all__"
