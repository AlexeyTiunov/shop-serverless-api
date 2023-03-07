import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { QueryCommandInput } from "@aws-sdk/client-dynamodb";
import map from "async/map";
import { AttributeValue } from "@aws-sdk/client-dynamodb/dist-types/models";

function prepareQueryInput(tables: Array<string>): QueryCommandInput[] {
  const queries: QueryCommandInput[] = tables.map(
    (table) =>
      ({ TableName: table, KeyConditionExpression: "key_id=:key_id", ExpressionAttributeValues: { ":key_id": { N: "0" } } } as QueryCommandInput)
  );
  return queries;
}

export async function batchTableQuery(tables: Array<string>): Promise<Array<Record<string, AttributeValue>[]>> {
  const client = new DynamoDB({ region: "us-east-1" });
  const queries: QueryCommandInput[] = prepareQueryInput(tables);

  const result: Array<Record<string, AttributeValue>[]> = await map(queries, async (query) => {
    const result = await client.query(query);
    return result?.Items;
  });
  return result;
}
