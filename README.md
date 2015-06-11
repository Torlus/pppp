# pppp
"People Per Project" Provisioning

# Installation

## Environment

Assuming a working installation of Python 3.
> pip install --upgrade pip
> pip install --upgrade virtualenv
> virtualenv -p /path/to/python3/python3 .env
> source .env/bin/activate

## Setup

> pip install -r reqs
> python manage.py migrate
> python manage.py syncdb

## Running

> python manage.py runserver

# Development notes

> django-admin startproject pppp
> cp pppp
> python manage.py migrate
> python manage.py startapp api
