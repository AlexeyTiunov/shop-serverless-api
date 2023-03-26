import { SQSHandler } from "aws-lambda";
import { Product } from "../../models/Product";
import batchWrite from "../../services/dynamoDB/batchWrite";
import { SNS, PublishCommandInput } from "@aws-sdk/client-sns";

const snsClient = new SNS({ region: "us-east-1" });
export const catalogBatchProcess: SQSHandler = async (event) => {
  const importProducts: Array<Product> = event.Records.map((sqsRecord) => {
    return JSON.parse(sqsRecord.body) as Product;
  });
  const productList = importProducts.map((item: Product) => {
    return { ...item, key_id: 0 };
  });
  console.log(productList);
  await batchWrite("products", productList, ["description", "id", "price", "title", "imgUrl", "key_id"]);
  const stock = importProducts.map((item) => {
    return { ...item, product_id: item.id, count: "1", key_id: 0 };
  });

  await batchWrite("stock", stock, ["product_id", "count", "key_id"]);
  const params: PublishCommandInput = { TopicArn: process.env.SNS_URL, Message: JSON.stringify(productList) };
  await snsClient.publish(params);
};

//arn:aws:sns:us-east-1:773434008479:createProductTopic
