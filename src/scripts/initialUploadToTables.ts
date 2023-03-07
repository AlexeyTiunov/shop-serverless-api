import { products } from "@functions/getProductList/mock";
import batchWrite from "../services/dynamoDB/batchWrite";
import { Product } from "../models/Product";

(async () => {
  const productList = products.map((item: Product) => {
    return { ...item, key_id: 0 };
  });
  await batchWrite("products", productList, ["description", "id", "price", "title", "imgUrl", "key_id"]);
  const stock = products.map((item) => {
    return { ...item, product_id: item.id, count: "1", key_id: 0 };
  });
  await batchWrite("stock", stock, ["product_id", "count", "key_id"]);
})();
