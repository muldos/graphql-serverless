from flask import Flask


def create_app():
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False)

    # Initialize Plugins

    with app.app_context():
        # Include our Routes
        from . import graphql_view

        # Register Blueprints
        return app
