from django.urls import path, include
from core.views import index

urlpatterns = [
    path('api/', include('file_manager.urls')),
    path('', index)
]
