// ============================================
//   JOOMA — Lógica principal de la tienda
// ============================================

// ─── PRODUCTOS ───────────────────────────────
// Edita aquí tus productos: nombre, precio, imagen, categoría
const products = [
  {
    id: 1,
    name: 'Undergold',
    brand: 'undergold',
    price: 85000,
    img: 'img/productos/undergold.png',
    badge: 'new',
    description: 'Camiseta UnderGold con estilo urbano y acabado premium.',
    tallas: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Supreme',
    brand: 'undergold',
    price: 85000,
    img: 'img/productos/supreme.jpg',
    badge: 'new',
    description: 'Camiseta Supreme con diseño destacado y fit cómodo.',
    tallas: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'Nike',
    brand: 'undergold',
    price: 85000,
    img: 'img/productos/nike.jpg',
    badge: 'new',
    description: 'Camiseta Nike estilo casual, perfecta para diario.',
    tallas: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Clemount',
    brand: 'undergold',
    price: 85000,
    img: 'img/productos/clemount.png',
    badge: 'new',
    description: 'Camiseta Clemount con diseño único.',
    tallas: ['S', 'M', 'L', 'XL'],
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
        ${p.img ? `
          <img
            id="product-image-${p.id}"
            src="${p.img}"
            alt="${p.name}"
          />
        ` : ''}
        <div class="product-actions">
          <button class="add-to-cart" onclick="addToCart(${p.id})">Agregar al carrito</button>
          <button class="wishlist-btn">♡</button>
        </div>
      </div>
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <p class="product-description">${p.description}</p>
      <div class="product-sizes">Tallas: ${p.tallas.join(', ')}</div>
      <div class="product-price">
        <span class="price-current">${formatPrice(p.price)}</span>
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
      <div class="cart-item-img">${i.name ? i.name.charAt(0) : ''}</div>
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
