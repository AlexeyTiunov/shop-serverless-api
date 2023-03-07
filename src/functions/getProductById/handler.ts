import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { findItemById } from "../../services/dynamoDB/getItem";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

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

export const getProductById: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
  try {
    const {
      pathParameters: { productId },
    } = event;
    const result: GetItemCommandOutput = await findItemById(productId);
    return formatJSONResponse(result.Item, 200, HEADERS);
  } catch (e) {
    if (invalidDataErrors.includes(e.name)) {
      return formatJSONResponse(e, 400, HEADERS);
    }
    return formatJSONResponse(e, 500, HEADERS);
  }
};
