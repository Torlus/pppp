# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20150618_0734'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='code',
        ),
        migrations.RemoveField(
            model_name='project',
            name='code',
        ),
        migrations.RemoveField(
            model_name='skill',
            name='code',
        ),
        migrations.RemoveField(
            model_name='task',
            name='code',
        ),
        migrations.RemoveField(
            model_name='task',
            name='team',
        ),
        migrations.RemoveField(
            model_name='team',
            name='code',
        ),
        migrations.AddField(
            model_name='task',
            name='teams',
            field=models.ManyToManyField(to='api.Team'),
        ),
        migrations.AddField(
            model_name='work',
            name='desc',
            field=models.CharField(default='', blank=True, max_length=250),
        ),
    ]
