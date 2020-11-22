#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FlaskApiStack } from '../lib/deploy-stack';

const app = new cdk.App();
new FlaskApiStack(app, 'FlaskAPIStack');
