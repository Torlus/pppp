# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_category_project_task_work'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='priority',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='task',
            name='priority',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='task',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, null=True, to='api.Team'),
        ),
        migrations.AddField(
            model_name='work',
            name='priority',
            field=models.IntegerField(default=1),
        ),
    ]
