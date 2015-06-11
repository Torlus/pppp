from rest_framework import serializers

from django.contrib.auth.models import User, Group
from .models import Team, Skill, Teammate

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


class TeammateSerializer(serializers.ModelSerializer):
    skills_urls = serializers.HyperlinkedRelatedField(source='skills', many=True, read_only=True, view_name='skill-detail')
    team_url = serializers.HyperlinkedRelatedField(source='team', read_only=True, view_name='team-detail')

    class Meta:
        model = Teammate
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'name', 'external', 'half_days_per_week', 'team', 'team_url', 'skills', 'skills_urls')

