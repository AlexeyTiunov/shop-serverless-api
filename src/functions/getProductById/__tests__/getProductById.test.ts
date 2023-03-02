import { getProductById } from "@functions/handler";
import lambdaTester from "lambda-tester";
import { products } from "@functions/getProductList/mock";

describe("Unit test for getProductById file", () => {
  it("should return function", async () => {
    expect(typeof getProductById).toBe("function");
  });

  it("verifies 200 response", async () => {
    return await lambdaTester(getProductById)
      .event({
        pathParameters: {
          productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        },
      })
      .expectResult((result) => {
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(
          JSON.stringify({
            ...products[0],
          })
        );
      });
  });

  it("verifies 404 response", async () => {
    return await lambdaTester(getProductById)
      .event({
        pathParameters: {
          productId: "10",
        },
      })
      .expectResult((result) => {
        expect(result.statusCode).toBe(404);
      });
  });
});
