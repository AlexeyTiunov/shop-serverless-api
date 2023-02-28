import type { AWS } from "@serverless/typescript";
import hello from "src/functions/hello";
import getProductList from "src/functions/getProductList";
import getProductById from "src/functions/getProductById";

const serverlessConfiguration: AWS = {
  service: "shop-serverless-api",
  frameworkVersion: "3",
  // plugins: ['serverless-esbuild'],
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
    },
  },
  // import the function via paths
  functions: { hello, getProductList, getProductById },
  //package: { individually: true },
};

module.exports = serverlessConfiguration;
