//import { handlerPath } from "@libs/handler-resolver";

export default {
  //  handler: `${handlerPath(__dirname)}/handler.getProductList`,
  handler: `./handler.getProductList`,
  events: [
    {
      http: {
        method: "get",
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
