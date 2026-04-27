/* =============================================
   ShopFind — City & Product Filter
   app.js
   ============================================= */

// ─── Product Data ────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    city: "Mumbai",
    price: 29999,
    emoji: "🎧",
    desc: "Industry-leading noise cancellation with 30-hr battery life."
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    category: "Electronics",
    city: "Delhi",
    price: 119900,
    emoji: "📱",
    desc: "Titanium build, A18 Pro chip, ProRes video at 4K 120fps."
  },
  {
    id: 3,
    name: "Levi's 511 Slim Jeans",
    category: "Fashion",
    city: "Bangalore",
    price: 3499,
    emoji: "👖",
    desc: "Classic slim fit denim, stretch fabric for all-day comfort."
  },
  {
    id: 4,
    name: "Nike Air Zoom Pegasus 41",
    category: "Sports",
    city: "Pune",
    price: 9995,
    emoji: "👟",
    desc: "Responsive cushioning for everyday runs and gym sessions."
  },
  {
    id: 5,
    name: "Biryani Spice Hamper",
    category: "Food",
    city: "Nagpur",
    price: 799,
    emoji: "🌶️",
    desc: "Authentic Vidarbha-style spice blend, curated for biryani lovers."
  },
  {
    id: 6,
    name: "Atomic Habits – James Clear",
    category: "Books",
    city: "Mumbai",
    price: 499,
    emoji: "📚",
    desc: "The definitive guide to building good habits, breaking bad ones."
  },
  {
    id: 7,
    name: "Samsung 4K Smart TV 55\"",
    category: "Electronics",
    city: "Bangalore",
    price: 54999,
    emoji: "📺",
    desc: "Crystal UHD display with Tizen OS and built-in voice assistant."
  },
  {
    id: 8,
    name: "Zara Floral Kurta Set",
    category: "Fashion",
    city: "Delhi",
    price: 2899,
    emoji: "👗",
    desc: "Lightweight cotton blend, perfect for festive occasions."
  },
  {
    id: 9,
    name: "Bournvita Nutrition Pack",
    category: "Food",
    city: "Pune",
    price: 349,
    emoji: "🍫",
    desc: "Malted drink mix with essential vitamins for growing kids."
  },
  {
    id: 10,
    name: "Yoga Mat Pro",
    category: "Sports",
    city: "Nagpur",
    price: 1299,
    emoji: "🧘",
    desc: "6mm thick, non-slip surface with alignment lines & carry strap."
  },
  {
    id: 11,
    name: "The Alchemist – Paulo Coelho",
    category: "Books",
    city: "Bangalore",
    price: 299,
    emoji: "📖",
    desc: "A magical fable about following your dream, translated to 80+ languages."
  },
  {
    id: 12,
    name: "OnePlus Nord Buds 3 Pro",
    category: "Electronics",
    city: "Nagpur",
    price: 5999,
    emoji: "🎵",
    desc: "ANC earbuds with 49 dB noise cancellation & 44hr total playtime."
  },
  {
    id: 13,
    name: "Allen Solly Chino Trousers",
    category: "Fashion",
    city: "Mumbai",
    price: 1999,
    emoji: "👔",
    desc: "Slim-fit stretch chinos for office or casual outings."
  },
  {
    id: 14,
    name: "Protein Bar Variety Pack",
    category: "Food",
    city: "Delhi",
    price: 1199,
    emoji: "🍪",
    desc: "12-pack assorted flavours, 20g protein per bar, no added sugar."
  },
  {
    id: 15,
    name: "Cricket Bat – MRF Genius",
    category: "Sports",
    city: "Pune",
    price: 4500,
    emoji: "🏏",
    desc: "English willow grade 2, balanced swing weight for all formats."
  },
  {
    id: 16,
    name: "Rich Dad Poor Dad",
    category: "Books",
    city: "Delhi",
    price: 399,
    emoji: "💰",
    desc: "Robert Kiyosaki's classic on financial independence and investing."
  }
];

// ─── State ────────────────────────────────────────────────────────
const state = {
  search: "",
  city: "all",
  category: "all"
};

// ─── DOM refs ─────────────────────────────────────────────────────
const searchInput  = document.getElementById("searchInput");
const clearBtn     = document.getElementById("clearBtn");
const cityFilter   = document.getElementById("cityFilter");
const catFilter    = document.getElementById("categoryFilter");
const productGrid  = document.getElementById("productGrid");
const emptyState   = document.getElementById("emptyState");
const countEl      = document.getElementById("count");

// ─── Helpers ──────────────────────────────────────────────────────
const fmt = (n) =>
  "₹" + n.toLocaleString("en-IN");

const highlight = (text, term) => {
  if (!term) return text;
  const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(re, '<mark>$1</mark>');
};

// ─── Filter Logic ─────────────────────────────────────────────────
function getFiltered() {
  const term = state.search.toLowerCase().trim();
  return PRODUCTS.filter(p => {
    const matchCity = state.city === "all" || p.city === state.city;
    const matchCat  = state.category === "all" || p.category === state.category;
    const matchSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.desc.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term);
    return matchCity && matchCat && matchSearch;
  });
}

// ─── Render Cards ─────────────────────────────────────────────────
function renderCards() {
  const filtered = getFiltered();
  productGrid.innerHTML = "";
  countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    productGrid.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  productGrid.style.display = "grid";

  filtered.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${i * 0.05}s`;

    const term = state.search.trim();
    const hl   = (t) => highlight(t, term);

    card.innerHTML = `
      <div class="card-img-placeholder">${p.emoji}</div>
      <div class="card-body">
        <div class="card-tags">
          <span class="tag tag-city">${p.city}</span>
          <span class="tag tag-cat">${p.category}</span>
        </div>
        <div class="card-name">${hl(p.name)}</div>
        <div class="card-desc">${hl(p.desc)}</div>
        <div class="card-footer">
          <span class="card-price">${fmt(p.price)}</span>
          <button class="card-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

// ─── Cart feedback ────────────────────────────────────────────────
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  // Simple toast notification
  showToast(`${p.emoji} "${p.name}" added to cart!`);
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
      position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(20px);
      background: #1e2235; border: 1px solid rgba(249,115,22,0.4);
      color: #e8eaf2; padding: 12px 24px; border-radius: 999px;
      font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      transition: opacity 0.3s, transform 0.3s;
      opacity: 0; z-index: 999; white-space: nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
  }, 2400);
}

// ─── Chip click helpers ───────────────────────────────────────────
function bindChips(container, stateKey) {
  container.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state[stateKey] = chip.dataset.value;
      renderCards();
    });
  });
}

// ─── Search input ─────────────────────────────────────────────────
searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  clearBtn.classList.toggle("visible", state.search.length > 0);
  renderCards();
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.search = "";
  clearBtn.classList.remove("visible");
  searchInput.focus();
  renderCards();
});

// ─── Init ─────────────────────────────────────────────────────────
bindChips(cityFilter, "city");
bindChips(catFilter, "category");
renderCards();
