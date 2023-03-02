import { getProductList } from "@functions/handler";
import lambdaTester from "lambda-tester";
import { products } from "@functions/getProductList/mock";
describe("Unit test for getProductsList file", () => {
  it("should return function", async () => {
    expect(typeof getProductList).toBe("function");
  });

  it("verifies 200 response", async () => {
    return await lambdaTester(getProductList).expectResult((result) => {
      expect(result.statusCode).toBe(200);
      expect(result.body).toEqual(JSON.stringify(products));
    });
  });
});
