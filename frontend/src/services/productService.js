import http from "./httpService";

export function getAllProducts() {
  return http.get("/products");
}

export function getProduct(id) {
  return http.get("/products/" + id);
}

export function saveProduct(product) {
  const body = { ...product };
  delete body._id;
  delete body.__v;

  if (product._id) return http.put("/products/" + product._id, body);

  return http.post("/products", body);
}

export function deleteProduct(id) {
  return http.delete("/products/" + id);
}
