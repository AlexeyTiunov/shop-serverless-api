import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { createTransaction } from "../../services/dynamoDB/createTransaction";
import { formatJSONResponse } from "@libs/api-gateway";
export const HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

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
  "TransactionCanceledException",
];
export const createProduct: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await createTransaction(body);
    return formatJSONResponse([{ message: "Item was added" }, result], 200, HEADERS);
  } catch (e) {
    if (invalidDataErrors.includes(e.name)) {
      return formatJSONResponse(e, 400, HEADERS);
    }
    return formatJSONResponse(e, 500, HEADERS);
  }
};
