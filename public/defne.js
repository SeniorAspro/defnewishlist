const API_URL = "https://defnewishlist.web.app";

// render items from database
function renderItems(items) {
  itemsDiv.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <label>${item.item}</label>
      <button onclick="deleteItem(${item.id})" class="delete-btn">✖</button>
    `;
    itemsDiv.appendChild(div);
  });
}

// fetch items from DB
async function fetchItems() {
  try {
    const res = await fetch(`${API_URL}/wishlist`);
    const items = await res.json();
    renderItems(items);
  } catch (err) {
    console.error("Error fetching items:", err);
  }
}

// add new item to DB
async function addItem() {
  const newItem = input.value.trim();
  if (!newItem) return;
  try {
    await fetch(`${API_URL}/wishlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: newItem })
    });
    input.value = '';
    fetchItems();
  } catch (err) {
    console.error("Error adding item:", err);
  }
}

// delete item from DB
async function deleteItem(id) {
  try {
    await fetch(`${API_URL}/wishlist/${id}`, { method: 'DELETE' });
    fetchItems();
  } catch (err) {
    console.error("Error deleting item:", err);
  }
}

// initial load
fetchItems();
