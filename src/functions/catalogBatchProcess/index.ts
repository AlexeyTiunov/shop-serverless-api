export default {
  //  handler: `${handlerPath(__dirname)}/handler.getProductList`,
  handler: `./handler.catalogBatchProcess`,
  role: "sqsLambdaFnRole",
  events: [
    {
      sqs: {
        batchSize: 3,
        arn: {
          "Fn::GetAtt": ["SQSQueue", "Arn"],
        },
      },
    },
  ],
};
