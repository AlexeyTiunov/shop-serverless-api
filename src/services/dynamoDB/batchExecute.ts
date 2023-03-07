import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { BatchExecuteStatementCommandInput } from "@aws-sdk/client-dynamodb";
import { BatchStatementRequest } from "@aws-sdk/client-dynamodb/dist-types/models/models_0";

function prepareStatement(tables: Array<string>): BatchStatementRequest[] {
  const statements: BatchStatementRequest[] = tables.map((table: string) => {
    return { Statement: `SELECT * FROM ${table} WHERE id IS String` } as BatchStatementRequest;
  });

  return statements;
}

export default async function batchExecute(tables: Array<string>): Promise<void> {
  const Statements: BatchStatementRequest[] = prepareStatement(tables);
  const statements = { Statements } as BatchExecuteStatementCommandInput;
  const client = new DynamoDB({ region: "us-east-1" });
  const result = await client.batchExecuteStatement(statements);
  console.log(result.Responses[0].Error);
  console.log(result.Responses);
}

batchExecute(["products"]);
