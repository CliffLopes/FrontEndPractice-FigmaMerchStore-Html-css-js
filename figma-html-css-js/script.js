document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products");

  async function fetchAndDisplayProducts(category) {
    try {
      const response = await fetch("StoreData.json");
      const data = await response.json();
      productsContainer.innerHTML = "";
      let products = [];

      if (category === "all") {
        Object.keys(data.products).forEach((cat) => {
          products = products.concat(data.products[cat]);
        });
      } else {
        products = data.products[category];
      }

      if (products && products.length) {
        products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.dataset.id = product.id;

          const img = document.createElement("img");
          img.src = product.thumbnail;
          img.alt = product.title;

          const title = document.createElement("h2");
          title.textContent = product.title;

          const price = document.createElement("p");
          price.textContent = `$${(product.price / 100).toFixed(2)}`;

          productDiv.appendChild(img);
          productDiv.appendChild(title);
          productDiv.appendChild(price);

          productsContainer.appendChild(productDiv);
        });
      } else {
        productsContainer.innerHTML =
          "<p>No products found in this category.</p>";
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      productsContainer.innerHTML =
        "<p>Failed to load products. Please try again later.</p>";
    }
  }

  document.querySelectorAll("#category #cat-item #item").forEach((item) => {
    item.addEventListener("click", () => {
      const category = item.textContent.toLowerCase();
      fetchAndDisplayProducts(category === "all" ? "all" : category);
    });
  });

  productsContainer.addEventListener("click", (event) => {
    const productDiv = event.target.closest(".product");
    if (productDiv) {
      const productId = productDiv.dataset.id;
      window.location.href = `product.html?id=${productId}`;
    }
  });

  fetchAndDisplayProducts("all");
});
