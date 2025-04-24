from django.contrib import admin
from django.urls import path
from api.views import app_view, auth_view, logout_view
from django.views.decorators.http import require_POST

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', app_view, name='app'),
    path('auth/', auth_view, name='auth'),
    path('logout/', require_POST(logout_view), name='logout'),
    path('', auth_view, name='home'),
]