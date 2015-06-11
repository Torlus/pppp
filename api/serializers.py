from rest_framework import serializers

from django.contrib.auth.models import User, Group
from .models import Team, Skill

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url',
                  'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'url',
                  'name')


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'code', 'desc')


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'code', 'desc')

