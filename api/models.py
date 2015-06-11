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

