import os
from apig_wsgi import make_lambda_handler
from application import create_app

app = create_app()


def proxied_app(environ, start_response):
    environ["SCRIPT_NAME"] = os.environ["stage_mount_point"]
    return app(environ, start_response)


lambda_handler = make_lambda_handler(proxied_app)
