from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import Connections, Connect, Browser, DownloadFile

urlpatterns = [
    path('connections', csrf_exempt(Connections.as_view())),
    path('connect', csrf_exempt(Connect.as_view())),
    path('browser', csrf_exempt(Browser.as_view())),
    path('download', csrf_exempt(DownloadFile.as_view())),
]
