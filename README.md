# JOOMA — Tienda de Moda

Página web completa lista para GitHub Pages.

## 📁 Estructura del proyecto

```
noir-tienda/
│
├── index.html              ← Página principal (estructura HTML)
├── README.md               ← Este archivo
│
├── css/
│   └── styles.css          ← Colores, fuentes y diseño visual
│
├── js/
│   └── main.js             ← Productos, carrito y funciones
│
└── img/
    ├── hero/               ← Imagen principal del banner
    ├── categorias/         ← Imágenes de ropa, bolsos, accesorios
    └── productos/          ← Fotos de cada producto
```

## ✏️ Cómo editar productos

Abre `js/main.js` y edita el array `products`:

```js
{
  id: 1,
  name: 'Nombre del producto',
  brand: 'Tu marca',
  price: 150000,           // Precio en pesos
  oldPrice: 200000,        // Precio tachado (null si no hay)
  img: 'img/productos/foto.jpg',
  badge: 'new',            // 'new', 'sale' o null
  description: 'Descripción del producto.',
  tallas: ['S', 'M', 'L'],
  categoria: 'ropa',       // 'ropa', 'bolsos' o 'accesorios'
}
```

## 🎨 Cómo cambiar colores

Abre `css/styles.css` y edita las variables en `:root { }`:

```css
--gold: #c9a96e;   /* Color acento principal */
--bg: #0a0a0a;     /* Fondo oscuro */
```

## 🖼️ Cómo agregar imágenes

1. Guarda tus fotos en la carpeta `img/productos/`
2. En `js/main.js` cambia el campo `img` de cada producto:
   ```js
   img: 'img/productos/mi-foto.jpg'
   ```
3. En `index.html` busca la línea `<span>${p.emoji}</span>` y cámbiala por:
   ```html
   <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">
   ```

## 🌐 Subir a GitHub Pages

1. Crea un repositorio en [github.com](https://github.com)
2. Sube todos los archivos de esta carpeta
3. Ve a **Settings → Pages**
4. En "Source" selecciona `main` y carpeta `/root`
5. Guarda — en unos minutos tendrás tu URL pública

## 📞 Ayuda

Si necesitas modificar algo, vuelve a Claude y describe qué quieres cambiar. 🖤
