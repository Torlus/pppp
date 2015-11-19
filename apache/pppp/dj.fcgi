#!/home7/lvttl/Projects/pppp/env/bin/python
import sys, os

sys.path.insert(0, '/home7/lvttl/Projects/pppp/env');
sys.path.insert(13, '/home7/lvttl/Projects/pppp');

os.environ['DJANGO_SETTINGS_MODULE'] = 'pppp.settings'
from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")

