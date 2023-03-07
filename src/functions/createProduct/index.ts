export default {
  //  handler: `${handlerPath(__dirname)}/handler.getProductList`,
  handler: `./handler.createProduct`,
  events: [
    {
      http: {
        method: "post",
        path: "/products",
        cors: {
          origin: "*",
          headers: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key", "X-Amz-Security-Token", "X-Amz-User-Agent"],
          allowCredentials: false,
        },
      },
    },
  ],
};
