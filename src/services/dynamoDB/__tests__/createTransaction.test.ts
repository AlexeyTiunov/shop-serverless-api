import { prepareTransactionInput } from "../createTransaction";
import { Product } from "../../../models/Product";
import process from "process";

process.env.PRODUCT_TABLE = "table";

describe("[function] prepareTransactionInput", () => {
  it("prepareTransactionInput", () => {
    const product: Product = {
      description: "Smartphone iPhone 14",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 1800,
      title: "iPhone 14",
      imgUrl: "https://i.citrus.world/imgcache/size_800/uploads/shop/e/8/e8cd27e887fd313824de25c832ae8b6b.jpg",
    };

    const want = {
      TransactItems: [
        {
          Put: {
            ConditionExpression: "attribute_exists (id)",
            Item: {
              description: {
                S: "Smartphone iPhone 14",
              },
              id: {
                S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
              },
              imgUrl: {
                S: "https://i.citrus.world/imgcache/size_800/uploads/shop/e/8/e8cd27e887fd313824de25c832ae8b6b.jpg",
              },
              price: {
                N: "1800",
              },
              title: {
                S: "iPhone 14",
              },
            },
            TableName: "table",
          },
        },
      ],
    };

    const got = prepareTransactionInput(product);

    expect(got).toEqual(want);
  });
});
