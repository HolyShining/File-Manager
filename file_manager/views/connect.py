from django.views.generic.base import View
from django.http import JsonResponse
import json

from file_manager.connection_manager import ConnectionManager


class Connect(View):
    def post(self, request):
        data = json.loads(request.body)
        request.session['connect'] = request.session['connections'][data['id']]
        status = ConnectionManager(request).test()
        if status == 'Success':
            return JsonResponse({'message': status})
        else:
            return JsonResponse({'error': status}, status=400)
