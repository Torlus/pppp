# pppp
"People Per Project" Provisioning

# Installation

## Environment

Assuming a working installation of Python 3.
```
pip install --upgrade pip
pip install --upgrade virtualenv
virtualenv -p /path/to/python3/python3 env
source env/bin/activate
```

## Setup

```
pip install -r reqs
python manage.py migrate
python manage.py syncdb
```

## Running

Change the scripts located in apache/pppp

# Development notes

```
django-admin startproject pppp
cd pppp
python manage.py migrate
python manage.py startapp api
```

```
python manage.py collectstatic
```
