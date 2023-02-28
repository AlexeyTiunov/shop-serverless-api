import { formatJSONResponse } from "@libs/api-gateway";
import { products } from "@functions/getProductList/mock";
import { Product } from "../../models/Product";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

export const HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

const getResultFromDb = async (id: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result: Product = products.find((item) => item.id === id);
      result ? resolve(result) : reject("Product nottt found");
    }, 200);
  });
};

export const getProductById: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
  try {
    const {
      pathParameters: { productId },
    } = event;
    const searchResult = await getResultFromDb(productId);
    return formatJSONResponse(searchResult, 200, HEADERS);
  } catch (e) {
    return formatJSONResponse(e, 404, HEADERS);
  }
};
