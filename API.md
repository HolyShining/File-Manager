# **API Documentation:**

Connections API: \
Manages connections to specified session
###_Methods:_

GET: Returns all connections for current session \
GET with parameter 'id': Return all data of specified connection \

POST: Creates new connection. \
PUT: Updates existent data (can exclude some fields). \

JSON schema:
```json
{
	"host": "some.host.com",
	"username": "user",
	"password": "password"
}
```

DELETE: Deletes connection by id

Browser API: \
Returns elements of specified directory:
###_Methods:_

POST: Specified path
JSON schema:
```json
{
	"path": "/usr/src/bin"
}
```

Connect API: \
Provides selected connection:
###_Methods:_

POST: Specified connection id

Download File API: \
Provides selected connection:
###_Methods:_

GET: Returns file by specified path

Query params: 'id' - full path to file
