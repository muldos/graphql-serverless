import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as path from 'path';
export class FlaskApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const layer = new lambda.LayerVersion(this, 'FlaskLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../../dist/layer/third-parties-layer.zip')),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_8],
      license: 'Apache-2.0',
      description: 'Third parties modules layer for the flask graphql app',
    });
  
    const flaskApp = new lambda.Function(this, 'FlaskLambda', {
      runtime: lambda.Runtime.PYTHON_3_8,
      functionName: 'lb-flaskapp-wrapper',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../flask_app')),
      environment: {
        stage_mount_point: '/public'
      },
      layers: [layer],
      handler: 'aws_wsgi_middleware.lambda_handler'
    });  
  

    new apigw.LambdaRestApi(this, 'FlaskEndpoint', {
      handler: flaskApp,
      deployOptions: {
        stageName: 'public'
      }
    });
    
  }
}
