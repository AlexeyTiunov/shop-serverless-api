export default {
  //  handler: `${handlerPath(__dirname)}/handler.getProductList`,
  handler: `./handler.getProductById`,
  events: [
    {
      http: {
        method: "get",
        path: "/product/{id}",
        cors: {
          origin: "*",
          headers: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key", "X-Amz-Security-Token", "X-Amz-User-Agent"],
          allowCredentials: false,
        },
      },
    },
  ],
};
