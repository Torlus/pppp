# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20150619_1039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='priority',
            field=models.IntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.IntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='work',
            name='man_days',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='work',
            name='priority',
            field=models.IntegerField(default=10),
        ),
    ]
