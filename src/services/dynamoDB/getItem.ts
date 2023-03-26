import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";

function prepareInput(tableName: string, id: string): GetItemCommandInput {
  return { TableName: tableName, Key: { key_id: { N: "0" }, id: { S: id } } } as unknown as GetItemCommandInput;
}
export async function findItemById(id: string): Promise<GetItemCommandOutput> {
  const client = new DynamoDB({ region: "us-east-1" });
  const params = prepareInput(process.env.PRODUCT_TABLE, id);
  const result = client.getItem(params);
  return result;
}

// findItemById("7567ec4b-b10c-48c5-9345-fc73c48a80aa").then((item) => {
//   console.log(item);
// });
