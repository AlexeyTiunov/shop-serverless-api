import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Product } from "../../models/Product";
import { BatchWriteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { PutRequest } from "@aws-sdk/client-dynamodb";
import { AttributeValue } from "@aws-sdk/client-dynamodb/dist-types/models";
import { WriteRequest } from "@aws-sdk/client-dynamodb/dist-types/models/models_0";

export function getBatchWriteItemsFormatFromProduct(data: Array<Product>, fields: Array<string> = []): BatchWriteItemCommandInput {
  const productDynamoTypeMap = {
    imgUrl: "S",
    product_id: "S",
    title: "S",
    description: "S",
    price: "N",
    id: "S",
    count: "N",
    key_id: "N",
  };

  const requests: WriteRequest[] = data.map((item: Product) => {
    let putRequest = {} as PutRequest;
    let Item = {} as Record<string, AttributeValue>;
    let keys = Object.keys(item);
    if (fields.length) {
      keys = keys.filter((key: string) => fields.includes(key));
    }
    keys.forEach((key: string) => {
      Item[key] = { [productDynamoTypeMap[key]]: item[key].toString() } as unknown as AttributeValue;
    });
    putRequest.Item = Item;
    return { PutRequest: putRequest }; // WriteRequest
  });

  return { RequestItems: { table: requests } };
}

export default async function batchWrite(tableName: string, data: Array<Product>, fields?: Array<string>): Promise<void> {
  const client = new DynamoDB({ region: "us-east-1" });
  const input = getBatchWriteItemsFormatFromProduct(data, fields);
  const inputForTable = { RequestItems: { [tableName]: [...input.RequestItems.table] } };
  await client.batchWriteItem(inputForTable);
}
