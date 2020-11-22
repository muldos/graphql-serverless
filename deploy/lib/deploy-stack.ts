import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
export class FlaskApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const layer = new lambda.LayerVersion(this, 'FlaskLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, 'flask-layer'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_8.bundlingDockerImage,
          command: [
            'bash', '-c', `
             pip install -r requirements.txt -t /asset-output &&
             cp -au . /asset-output
            `,
          ],
        },
      }),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_8],
      license: 'Apache-2.0',
      description: 'Third party layer for the flask graphql app',
    });
    // The code that defines your stack goes here
  }
}
