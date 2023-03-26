import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { batchTableQuery } from "../../services/dynamoDB/batchTableQuery";
import { formatJSONResponse } from "@libs/api-gateway";

const invalidDataErrors: Array<string> = [
  "AccessDeniedException",
  "ConditionalCheckFailedException",
  "IncompleteSignatureException",
  "ItemCollectionSizeLimitExceededException",
  "LimitExceededException",
  "MissingAuthenticationTokenException",
  "ProvisionedThroughputExceeded",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "ResourceInUseException",
  "ResourceNotFoundException",
  "ThrottlingException",
  "UnrecognizedClientException",
  "ValidationException",
];

export const HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};
export const getProductList: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async () => {
  try {
    const result = await batchTableQuery(["products", "stock"]);
    return formatJSONResponse(result, 200, HEADERS);
  } catch (e) {
    if (invalidDataErrors.includes(e.name)) {
      return formatJSONResponse(e, 400, HEADERS);
    }
    return formatJSONResponse(e, 500, HEADERS);
  }
};
