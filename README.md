# SFTP File Manager
[API Documentation](https://github.com/HolyShining/File-Manager/blob/master/API.md)

How to run project:

## `Via Docker:`
1. Clone project from GitHub
2. Add `.env` file from attachment with secret key to root folder
3. Run in terminal: `docker-compose up`
4. Go to the `localhost:8000`

## `Via OS:`
1. Clone project from GitHub
2. Add secret key from attachment to `sftp_client/settings.py` at line `11`
3. Install Pipenv:
	* For Mac: `brew install pipenv`
	* For Linux: `apt install -y pipenv`
	* For Windows: `pip install pipenv`

4. Run `pipenv install` at root folder to install project dependencies
5. Run `pipenv run python manage.py runserver` to start Django project
6. Go to the `localhost:8000`

# General Documentation:

 * To add new connection click (+) button at the sidebar \
 * To connect to existent connection just click on it
 * To Edit/Delete connection click button near the name 
 * For navigation use click on first folder (with name `..`) or navigation menu at navigation bar
 * To download file click on the name or on the icon
 
