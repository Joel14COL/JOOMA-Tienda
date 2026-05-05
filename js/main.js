// ============================================
//   JOOMA — Lógica principal de la tienda
// ============================================

// ─── PRODUCTOS ───────────────────────────────
// Edita aquí tus productos: nombre, precio, imagen, categoría
const products = [
  {
    id: 1,
    name: 'Blazer Estructurado',
    brand: 'JOOMA Collection',
    price: 189000,
    oldPrice: null,          // null = sin precio tachado
    img: 'img/productos/blazer-estructurado.jpg',
    emoji: '🧥',             // Reemplaza con img cuando tengas fotos
    badge: 'new',            // 'new', 'sale', o null
    description: 'Blazer de corte estructurado en tela premium.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    categoria: 'ropa',
  },
  {
    id: 2,
    name: 'Camiseta Logo JOOMA',
    brand: 'JOOMA Collection',
    price: 95000,
    oldPrice: 145000,
    img: 'img/productos/camiseta-logo.jpg',
    emoji: '👕',
    badge: 'sale',
    description: 'Camiseta con logo JOOMA, diseño minimalista y cómoda.',
    tallas: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    categoria: 'ropa',
  },
  {
    id: 5,
    name: 'Pantalón Wide Leg',
    brand: 'JOOMA Collection',
    price: 165000,
    oldPrice: null,
    img: 'img/productos/pantalon-wide.jpg',
    emoji: '👖',
    badge: null,
    description: 'Pantalón de pierna ancha en tela fluida.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    categoria: 'ropa',
  },

  {
    id: 7,
    name: 'Cardigan Oversized',
    brand: 'JOOMA Basics',
    price: 135000,
    oldPrice: null,
    img: 'img/productos/cardigan.jpg',
    emoji: '🧣',
    badge: 'new',
    description: 'Cardigan oversize en lana suave color carbón.',
    tallas: ['S/M', 'L/XL'],
    categoria: 'ropa',
  },

];

// ─── CARRITO ─────────────────────────────────
let cart = [];

function formatPrice(p) {
  return '$' + p.toLocaleString('es-CO');
}

// ─── RENDERIZAR PRODUCTOS ─────────────────────
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'new' ? 'Nuevo' : 'Oferta'}</span>` : ''}
        <span>${p.emoji}</span>
        <div class="product-actions">
          <button class="add-to-cart" onclick="addToCart(${p.id})">Agregar al carrito</button>
          <button class="wishlist-btn">♡</button>
        </div>
      </div>
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">
        <span class="price-current">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
      </div>
    </div>
  `).join('');
}

// ─── CARRITO ─────────────────────────────────
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  showToast();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cart-total').textContent = formatPrice(total);

  const container = document.getElementById('cart-items');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛍</div><p>Tu carrito está vacío</p></div>';
    return;
  }
  container.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-item-img">${i.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-size">Cantidad: ${i.qty}</div>
        <div class="cart-item-price">${formatPrice(i.price)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i.id})">✕</button>
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById('cart-overlay').classList.toggle('open');
}

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function subscribeNewsletter() {
  const val = document.getElementById('email-input').value.trim();
  if (!val || !val.includes('@')) {
    alert('Por favor ingresa un correo válido.');
    return;
  }
  alert('¡Gracias! Te avisaremos con las mejores novedades 🖤');
  document.getElementById('email-input').value = '';
}

// ─── INIT ─────────────────────────────────────
renderProducts();
