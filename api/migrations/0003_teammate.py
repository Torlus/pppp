# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_skill'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teammate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=250)),
                ('external', models.BooleanField(default=False)),
                ('half_days_per_week', models.IntegerField(default=10)),
                ('skills', models.ManyToManyField(to='api.Skill')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.Team')),
            ],
            options={
                'ordering': ('created_at',),
            },
        ),
    ]
