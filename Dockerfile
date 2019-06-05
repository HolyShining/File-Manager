FROM kennethreitz/pipenv as build
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY . /code/
RUN pipenv install
