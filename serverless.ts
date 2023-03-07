import type { AWS } from "@serverless/typescript";
import getProductList from "src/functions/getProductList";
import getProductById from "src/functions/getProductById";
import createProduct from "@functions/createProduct";

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
    },
  },
  // import the function via paths
  functions: { getProductList, getProductById, createProduct },
  //package: { individually: true },
};

module.exports = serverlessConfiguration;
