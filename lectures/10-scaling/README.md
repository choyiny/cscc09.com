# Locust Demo for Microblog

A demonstration of how to stress test web server traffic with Locust.

## Development Setup

1. Create a virtualenv to isolate dependencies (`pip install virtualenv` to install)

```
$ virtualenv venv
```

2. Install dependencies

```
(venv) pip install -r requirements.txt
```

3. Specify host and run locustfile

```
$ locust -f locustfile.py --host=https://microblog.cscc09.com
```

4. Visit http://0.0.0.0:8089/ for Locust UI
