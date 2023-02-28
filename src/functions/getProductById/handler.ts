import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import schema from "@functions/hello/schema";
import { products } from "@functions/getProductList/mock";
import { Product } from "../../models/Product";

export const HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

const getResultFromDb = async (id: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result: Product = products.find((item) => item.id === id);
      result ? resolve(result) : reject("No product found");
    }, 200);
  });
};

export const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const {
      pathParameters: { id },
    } = event;

    const searchResult = await getResultFromDb(id);
    return formatJSONResponse(searchResult, 200, HEADERS);
  } catch (e) {
    return formatJSONResponse(e, 400, HEADERS);
  }
};
