from django.views.generic.base import View
from django.http import JsonResponse

import json

from file_manager.connection_manager import ConnectionManager


class Browser(View):
    def post(self, request):
        with ConnectionManager(request) as conn:
            try:
                data = json.loads(request.body)
                path = data.get('path', '/')
                return JsonResponse({'tree': conn.listdir('/{}'.format('/'.join(path)))})
            except json.decoder.JSONDecodeError:
                return JsonResponse({'tree': conn.listdir('/')})
            except FileNotFoundError:
                return JsonResponse({'error': 'Path not found'}, status=400)
