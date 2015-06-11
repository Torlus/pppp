from django.db import models

class Team(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    code = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=250, blank=True, default='')

    def __str__(self):
        return "[" + self.code + ": " + self.desc + "]"

    class Meta:
        ordering = ('created_at',)


class Skill(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    code = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=250, blank=True, default='')

    def __str__(self):
        return "[" + self.code + ": " + self.desc + "]"

    class Meta:
        ordering = ('created_at',)


class Teammate(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    team = models.ForeignKey(Team, on_delete=models.PROTECT)
    skills = models.ManyToManyField(Skill)
    name = models.CharField(max_length=250, blank=False)
    external = models.BooleanField(default=False)
    half_days_per_week = models.IntegerField(default=10)

    def __str__(self):
        return str(self.team) + " / [" + self.name + "]"

    class Meta:
        ordering = ('created_at',)
