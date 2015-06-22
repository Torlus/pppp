from rest_framework import serializers

from django.contrib.auth.models import User, Group
from .models import Team, Skill, Teammate
from .models import Category, Project, Task, Work

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
                  'desc')


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'desc')


class TeammateSerializer(serializers.ModelSerializer):
    skills_urls = serializers.HyperlinkedRelatedField(source='skills', many=True, read_only=True, view_name='skill-detail')
    team_url = serializers.HyperlinkedRelatedField(source='team', read_only=True, view_name='team-detail')
    half_days_per_week = serializers.IntegerField(required=True, min_value=1, max_value=10)

    class Meta:
        model = Teammate
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'name', 'external', 'half_days_per_week', 'team', 'team_url', 'skills', 'skills_urls')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'desc')


class ProjectSerializer(serializers.ModelSerializer):
    category_url = serializers.HyperlinkedRelatedField(source='category', read_only=True, view_name='category-detail')

    class Meta:
        model = Project
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'desc', 'priority',
                  'category', 'category_url')


class TaskSerializer(serializers.ModelSerializer):
    project_url = serializers.HyperlinkedRelatedField(source='project', read_only=True, view_name='project-detail')
    teams_urls = serializers.HyperlinkedRelatedField(source='teams', many=True, read_only=True, view_name='team-detail')

    class Meta:
        model = Task
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'desc', 'priority',
                  'project', 'project_url', 'teams', 'teams_urls')


class WorkSerializer(serializers.ModelSerializer):
    task_url = serializers.HyperlinkedRelatedField(source='task', read_only=True, view_name='task-detail')
    skill_url = serializers.HyperlinkedRelatedField(source='skill', read_only=True, view_name='skill-detail')
    man_days = serializers.IntegerField(required=True, min_value=1)
    project = serializers.IntegerField(source='task.project.id')
    project_url = serializers.HyperlinkedRelatedField(source='task.project', read_only=True, view_name='project-detail')

    class Meta:
        model = Work
        fields = ('id', 'url', 'created_at', 'updated_at',
                  'desc',
                  'man_days', 'priority',
                  'skill', 'skill_url',
                  'task', 'task_url',
                  'project', 'project_url')
