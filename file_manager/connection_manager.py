import pysftp


class ConnectionManager:
    """Manager for SFTP connections"""
    def __init__(self, request):
        """Initialize user request to work with connection"""
        self.request = request
        self.connection = None

    def _connect(self):
        """Provides connection instance"""
        cnopts = pysftp.CnOpts()
        cnopts.hostkeys = None
        return pysftp.Connection(host=self.request.session['connect'].get('host'),
                                 username=self.request.session['connect'].get('username'),
                                 password=self.request.session['connect'].get('password'),
                                 cnopts=cnopts)

    def test(self):
        """Test connection is could be established"""
        try:
            self._connect()
            return 'Success'
        except pysftp.exceptions.ConnectionException:
            return 'Host error'
        except pysftp.exceptions.CredentialException:
            return 'Credential error'

    def __enter__(self):
        """Interface to use class instance with context manager"""
        self.connection = self._connect()
        return self._connect()

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Close connection after context manager"""
        return self.connection.close()
