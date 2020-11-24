# Flask Serverless Skeleton

GraphQL Flask app that can be run locally or serverless in the cloud (AWS).
Implements the "Star wars" example of the [Official GraphQL.org](https://graphql.org/)

## Local startup
### Windows
```shell
.\venv\Scripts\activate.bat
cd flask_app
set FLASK_APP=application
flask run
```
### Linux
```shell
./venv/Scripts/activate
cd flask_app
export FLASK_APP=application
flask run
```

Then go to http://localhost:5000/graphql
and try for example
```graphql
{
  human(id: "1000") {
    name
    appearsIn
  }
}
```

## Cloud deployment
Use the provided deploy / cleanup workflows

## Extras
### Latest deploy@master : ![Deploy Stack](https://github.com/muldos/graphql-serverless/workflows/Deploy%20Stack/badge.svg?branch=master&event=workflow_dispatch)

### Autolint by : [![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black) 

