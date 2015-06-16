from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from api import views

from django.contrib import admin
admin.autodiscover()


router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'teammates', views.TeammateViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'works', views.WorkViewSet)
router.include_root_view = False


urlpatterns = [
    url(r'^/?$', views.home),
    url(r'^api/?$', views.APIRootView.as_view(), name='api-root'),
    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
