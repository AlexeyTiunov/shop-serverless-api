import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { products } from "@functions/getProductList/mock";

export const getProductList: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(products),
  };
};
