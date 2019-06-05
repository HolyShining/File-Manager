from io import BytesIO
from mimetypes import guess_type

from django.views.generic.base import View
from django.http import HttpResponse, JsonResponse

from file_manager.connection_manager import ConnectionManager


class DownloadFile(View):
    """Returns elements of specified directory:"""
    def get(self, request):
        flo = BytesIO()
        with ConnectionManager(request) as conn:
            path = request.GET.get('path')
            file = path.split('/')[-1]
            try:
                conn.getfo(path, flo)
                response = HttpResponse(flo.getvalue(), content_type=guess_type(file)[0])
                response['Content-Length'] = len(response.content)
                response['Content-Disposition'] = "attachment; filename={}".format(file)
                return response
            except FileNotFoundError:
                return JsonResponse({'error': 'File not found'}, status=400)
