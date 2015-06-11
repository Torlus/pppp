from rest_framework import permissions, viewsets, views
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.contrib.auth.models import User, Group
from .models import Team

from .serializers import UserSerializer, GroupSerializer
from .serializers import TeamSerializer

class APIRootView(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, format=None):
        return Response({
            'users': reverse('user-list', request=request, format=format),
            'groups': reverse('group-list', request=request, format=format),
            'teams': reverse('team-list', request=request, format=format),
        })


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        # permissions.DjangoModelPermissions,
    ]
