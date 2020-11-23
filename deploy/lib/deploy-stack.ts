import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
import * as child from 'child_process';
export class FlaskApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const layer = new lambda.LayerVersion(this, 'FlaskLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../../'), {
          bundling: {
            local: {
              tryBundle(outputDir: string, options: cdk.BundlingOptions) {
                  try {
                    child.spawnSync('python -V');
                  } catch {
                    return false;
                  }
                  child.spawnSync(`pip3 install -r requirements.txt -t ${path.join(outputDir, 'python/lib/python3.8/site-packages')}`);
                  return true;
                }
            },            
            image: lambda.Runtime.PYTHON_3_8.bundlingDockerImage,
            command: [
              'bash', '-c', `
               pip3 install -r requirements.txt -t /asset-output &&
               cp -au . /asset-output
              `,
            ],
          },
        }),     
      
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_8],
      license: 'Apache-2.0',
      description: 'Third parties modules layer for the flask graphql app',
    });
  }
}
