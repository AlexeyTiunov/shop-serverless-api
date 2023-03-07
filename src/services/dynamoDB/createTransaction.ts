import { DynamoDB, Put } from "@aws-sdk/client-dynamodb";
import { Product } from "../../models/Product";
import { TransactWriteItemsCommandInput, TransactWriteItemsCommandOutput } from "@aws-sdk/client-dynamodb";
import { AttributeValue } from "@aws-sdk/client-dynamodb/dist-types/models/models_0";
import * as process from "process";

export function prepareTransactionInput(params: Product): TransactWriteItemsCommandInput {
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

  const Item = {} as Record<string, AttributeValue>;
  Object.entries(params).forEach(([key, val]) => {
    return (Item[key] = { [productDynamoTypeMap[key]]: val.toString() } as unknown as AttributeValue);
  });
  Item["key_id"] = { N: "0" };

  const ConditionExpression: string = "attribute_not_exists(id)";

  const Put: Put = { Item, ConditionExpression, TableName: process.env.PRODUCT_TABLE } as Put;
  // const ConditionCheck = {
  //   Key: { key_id: { N: "0" }, product_id: { S: params.id } },
  //   ConditionExpression: "attribute_not_exists(product_id)",
  //   TableName: process.env.STOCK_TABLE,
  //  };
  const putStock = {
    Item: { key_id: { N: "0" }, product_id: { S: params.id }, count: { N: "1" } },
    ConditionExpression: "attribute_not_exists(product_id)",
    TableName: process.env.STOCK_TABLE,
  } as Put;

  return { TransactItems: [{ Put }, { Put: putStock }] } as TransactWriteItemsCommandInput;
}

export async function createTransaction(params: Product): Promise<TransactWriteItemsCommandOutput> {
  const client = new DynamoDB({ region: "us-east-1" });
  const paramsInput: TransactWriteItemsCommandInput = prepareTransactionInput(params);
  const result = await client.transactWriteItems(paramsInput);
  return result;
}

// const prods = {
//   description: "Smartphone iPhone 13",
//   id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
//   price: 1500,
//   title: "iPhone 13(3)",
// };
// createTransaction(prods);
