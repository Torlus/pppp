from django.db import models

class Team(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # code = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=250, blank=True, default='')

    def __str__(self):
        return "[" + self.desc + "]"

    class Meta:
        ordering = ('created_at',)


class Skill(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # code = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=250, blank=True, default='')

    def __str__(self):
        return "[" + self.desc + "]"

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


class Category(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # code = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=250, blank=True, default='')

    def __str__(self):
        return "[" + self.desc + "]"

    class Meta:
        ordering = ('created_at',)


class Project(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    # code = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=250, blank=True, default='')
    priority = models.IntegerField(default=1)

    def __str__(self):
        return str(self.category) + " / [" + self.desc + "]"

    class Meta:
        ordering = ('created_at',)


class Task(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT)
    teams = models.ManyToManyField(Team)
    # code = models.CharField(max_length=50, blank=False)
    desc = models.CharField(max_length=250, blank=True, default='')
    priority = models.IntegerField(default=1)

    def __str__(self):
        return str(self.project) + " / [" + self.desc + "]"

    class Meta:
        ordering = ('created_at',)


class Work(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    skill = models.ForeignKey(Skill, on_delete=models.PROTECT)
    task = models.ForeignKey(Task, on_delete=models.PROTECT)
    desc = models.CharField(max_length=250, blank=True, default='')
    man_days = models.IntegerField()
    priority = models.IntegerField(default=1)

    def __str__(self):
        return str(self.task) + " / [" + str(self.skill) + ": " + str(self.man_days) + "]"

    class Meta:
        ordering = ('created_at',)

