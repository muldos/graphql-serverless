from flask import Flask, url_for
from flask import current_app as app
from flask_graphql import GraphQLView
from .graphql_schema import schema


app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

