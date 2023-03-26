import type { AWS } from "@serverless/typescript";
import getProductList from "src/functions/getProductList";
import getProductById from "src/functions/getProductById";
import createProduct from "@functions/createProduct";
import catalogBatchProcess from "@functions//catalogBatchProcess";

const serverlessConfiguration: AWS = {
  service: "shop-serverless-api",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCT_TABLE: "products",
      STOCK_TABLE: "stock",
      SQS_URL: { Ref: "SQSQueue" },
      SNS_URL: { Ref: "SNSTopic" },
    },
  },
  // import the function via paths
  functions: { getProductList, getProductById, createProduct, catalogBatchProcess },
  //package: { individually: true },
  resources: {
    Resources: {
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
        },
      },
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "createProductTopic",
        },
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "alexeytiunov@ukr.net",
          Protocol: "email",
          TopicArn: { Ref: "SNSTopic" },
        },
      },
      sqsLambdaFnRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          RoleName: "sqsLambdaFnRole",
          ManagedPolicyArns: [
            "arn:aws:iam::aws:policy/AmazonSQSFullAccess",
            "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
            "arn:aws:iam::aws:policy/AmazonSNSFullAccess",
          ],
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Service: ["lambda.amazonaws.com"],
                },
                Action: ["sts:AssumeRole"],
              },
            ],
          },
          Policies: [
            {
              PolicyName: "importLambdaFnBasicPolicy",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: {
                  Effect: "Allow",
                  Action: ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
                  Resource: "*",
                },
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
