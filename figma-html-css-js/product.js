document.addEventListener("DOMContentLoaded", async () => {
  const productDetailsContainer = document.getElementById("product-details");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  try {
    const response = await fetch("StoreData.json");
    const data = await response.json();
    const allProducts = Object.values(data.products).flat();
    const product = allProducts.find((p) => p.id === parseInt(productId));

    if (product) {
      const img = document.createElement("img");
      img.src = product.thumbnail;
      img.alt = product.title;
      document.getElementById("image").appendChild(img);

      const title = document.getElementById("title");
      title.textContent = product.title;

      const description = document
        .getElementById("description")
        .querySelector("span");
      description.textContent = product.description;

      const price = document.getElementById("price");
      price.textContent = `$${(product.price / 100).toFixed(2)}`;

      const rating = document.getElementById("rating");
      rating.textContent = `Ratings: ${
        product.rating || "No ratings available"
      }`;

      const button = document.getElementById("button");
      button.textContent = "Shop Now";
    } else {
      productDetailsContainer.innerHTML = "<p>Product not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    productDetailsContainer.innerHTML =
      "<p>Failed to load product details. Please try again later.</p>";
  }
});
