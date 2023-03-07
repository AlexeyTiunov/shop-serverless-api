import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { ScanCommandOutput } from "@aws-sdk/client-dynamodb";

function prepareInput(tableName: string): ScanCommandInput {
  return { TableName: tableName } as ScanCommandInput;
}
export async function scanItems(tableName: string): Promise<ScanCommandOutput["Items"]> {
  const client = new DynamoDB({ region: "us-east-1" });
  const response = await client.scan(prepareInput(tableName));
  return response.Items;
}
