import { getBatchWriteItemsFormatFromProduct } from "../batchWrite";
import { products } from "@functions/getProductList/mock";
import { BatchWriteItemCommandInput } from "@aws-sdk/client-dynamodb";
describe("[function] getBatchWriteItemsFormatFromProduct", () => {
  it("getBatchWriteItemsFormatFromProduct", () => {
    const product = products.slice(0, 1);
    const wantData = {
      RequestItems: {
        table: [
          {
            PutRequest: {
              Item: {
                description: {
                  S: "Smartphone iPhone 14",
                },

                imgUrl: {
                  S: "https://i.citrus.world/imgcache/size_800/uploads/shop/e/8/e8cd27e887fd313824de25c832ae8b6b.jpg",
                },
                price: {
                  N: "1800",
                },
                id: {
                  S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                },
                title: {
                  S: "iPhone 14",
                },
              },
            },
          },
        ],
      },
    };

    const expectedData: BatchWriteItemCommandInput = getBatchWriteItemsFormatFromProduct(product);
    expect(expectedData).toEqual(wantData);
  });

  it("getBatchWriteItemsFormatFromProduct with filter", () => {
    const product = products.slice(0, 1);
    const wantData = {
      RequestItems: {
        table: [
          {
            PutRequest: {
              Item: {
                price: {
                  N: "1800",
                },
                id: {
                  S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                },
              },
            },
          },
        ],
      },
    };

    const expectedData: BatchWriteItemCommandInput = getBatchWriteItemsFormatFromProduct(product, ["id", "price"]);
    expect(expectedData).toEqual(wantData);
  });
});
