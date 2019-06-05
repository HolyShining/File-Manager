from django.views.generic.base import View
from django.http import JsonResponse

from copy import deepcopy
import json
import uuid


class Connections(View):
    """Manages connections to specified session"""
    @staticmethod
    def get_connections_list(request):
        return request.session.get('connections', [])

    def get(self, request):
        """Return all connection or specified with query parameter"""
        if 'id' in request.GET:
            for connection in self.get_connections_list(request):
                if connection['id'] == request.GET.get('id'):
                    return JsonResponse({'connection': connection})
        filtered_connections = deepcopy(self.get_connections_list(request))
        for element in filtered_connections:
            element.pop('password')
        return JsonResponse({'connections': self.get_connections_list(request)})

    def post(self, request):
        """Receives new connection credentials and store it. JSON schema provided in documentation"""
        data = json.loads(request.body)

        if 'host' not in data:
            return JsonResponse({'error': 'Please, provide a host'}, status=400)

        credentials = {
            'id': uuid.uuid4().hex,
            'host': data.get('host'),
            'username': data.get('username', None),
            'password': data.get('password', None),
        }

        # TODO factory set connection
        request.session['connections'] = \
            self.get_connections_list(request) + [credentials]

        return JsonResponse({'message': credentials})

    def put(self, request):
        """Update existence connection. Must contain 1 or more fields"""
        data = json.loads(request.body)
        for connection in self.get_connections_list(request):
            # TODO refactor this to loop by dict keys
            # + More generic solution
            # - Less readable code
            if data.get('id') == str(connection['id']):
                connection['host'] = data.get('host', connection['host'])
                connection['username'] = data.get('username', connection['username'])
                connection['password'] = data.get('password', connection['password'])
                request.session['connections'] = self.get_connections_list(request)
                return JsonResponse({'connections': self.get_connections_list(request)})
        return JsonResponse({'error': 'Connection with selected id is absent'})

    def delete(self, request):
        """Delete connection by id"""
        if request.GET.get('all', False):
            request.session['connections'] = []
            return JsonResponse({'connections': []})

        data = json.loads(request.body)
        request.session['connections'] = \
            list(filter(lambda element: element.get('id') != data.get('id'), self.get_connections_list(request)))
        return JsonResponse({'connections': self.get_connections_list(request)})
