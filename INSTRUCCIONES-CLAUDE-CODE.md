# Rediseño IphoneSelectBV — Paquete completo para Claude Code

Aplicar **6 cambios coordinados** sobre el sitio actual. Todo comparte una misma paleta y lenguaje "tech premium" con rose gold como acento sobre fondos grafito.

---

## 🎨 Paleta unificada (variables a definir)

Crear/editar `src/styles/tokens.css` (o el archivo global de variables que ya tengas) y agregar:

```css
:root {
  /* Rose gold — acento */
  --rg-100: #F5EDE4;
  --rg-200: #E8C9A8;
  --rg-300: #D4B495;
  --rg-400: #C9A380;
  --rg-500: #B89070;
  --rg-600: #9C7558;

  /* Grafito cálido — fondos */
  --graphite-900: #1C1917;
  --graphite-800: #252220;
  --graphite-700: #2A2522;
  --graphite-600: #2F2926;
  --graphite-500: #3A3330;
  --graphite-400: #463F3A;
  --graphite-300: #5A524C;

  /* Estado / acción */
  --green-500: #10B981;
  --green-600: #059669;

  /* Texto sobre oscuro */
  --on-dark-1: #FFFFFF;
  --on-dark-2: rgba(255,255,255,0.78);
  --on-dark-3: rgba(255,255,255,0.6);
  --on-dark-4: rgba(255,255,255,0.4);

  /* Tipografía mono para detalles "tech" */
  --font-mono: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
}
```

> **Importar la fuente mono** en `index.html`:
> ```html
> <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
> ```

---

## 1️⃣ HEADER de catálogo (P3 — asimétrico tech)

**Archivo:** componente del bloque "Explorá por categoría" (típicamente `src/components/CategoriesHighlight.jsx` o `Hero.jsx`)

Reemplazar el header actual por el bloque siguiente. Va **arriba** del grid de cards de categorías (iPhones / Apple Watch / AirPods / iPad).

```jsx
<section className="catalog-header">
  <div className="catalog-header__bg-grid" />
  <div className="catalog-header__glow" />

  <div className="catalog-header__inner">
    {/* IZQUIERDA: brand + título */}
    <div className="catalog-header__left">
      <div className="catalog-header__brand">
        <div className="catalog-header__logo">
          <img src="/logo.png" alt="IphoneSelectBV" />
        </div>
        <div>
          <div className="catalog-header__brand-name">IphoneSelectBv</div>
          <div className="catalog-header__brand-sub">tienda oficial</div>
        </div>
      </div>

      <div className="catalog-header__eyebrow">
        <span className="dot" />
        Catálogo · 04 categorías
      </div>

      <h2 className="catalog-header__title">
        Explorá<br />
        <span className="grad">por categoría</span>
      </h2>

      <p className="catalog-header__lead">
        Encontrá exactamente lo que buscás. Productos seleccionados con garantía oficial.
      </p>
    </div>

    {/* DERECHA: panel info */}
    <aside className="catalog-header__panel">
      <div className="catalog-header__chips">
        <div className="chip"><div className="chip__num">✓</div><div className="chip__label">Recibimos usados</div></div>
        <div className="chip"><div className="chip__num">24h</div><div className="chip__label">Entregas en el día</div></div>
        <div className="chip"><div className="chip__num">12m</div><div className="chip__label">Garantía oficial</div></div>
        <div className="chip"><div className="chip__num">★</div><div className="chip__label">Confianza · +5 años</div></div>
      </div>

      <a href="https://wa.me/5493537301603" className="catalog-header__cta">
        <span>✆</span> Consultar por WhatsApp
      </a>

      <div className="catalog-header__online">
        <span className="dot-green" />
        Respuesta en menos de 1 hora
      </div>
    </aside>
  </div>
</section>
```

```css
.catalog-header {
  position: relative;
  overflow: hidden;
  padding: 80px 60px;
  background: linear-gradient(180deg, #4A4340 0%, #3A3330 100%);
  color: #fff;
}
.catalog-header__bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(212,180,149,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,180,149,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(circle at 80% 50%, black 0%, transparent 70%);
          mask-image: radial-gradient(circle at 80% 50%, black 0%, transparent 70%);
}
.catalog-header__glow {
  position: absolute; top: -100px; right: -100px; width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(212,180,149,0.18) 0%, transparent 60%);
  filter: blur(40px); pointer-events: none;
}
.catalog-header__inner {
  position: relative; max-width: 1240px; margin: 0 auto;
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 60px; align-items: center;
}
.catalog-header__brand { display: flex; align-items: center; gap: 14px; margin-bottom: 32px; }
.catalog-header__logo {
  width: 56px; height: 56px; border-radius: 14px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F5EDE4 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8);
}
.catalog-header__logo img { width: 36px; height: 36px; object-fit: contain; }
.catalog-header__brand-name { font-size: 18px; font-weight: 700; letter-spacing: -0.4px; }
.catalog-header__brand-sub  { font-family: var(--font-mono); font-size: 11px; color: var(--rg-300); letter-spacing: 0.1em; margin-top: 2px; }

.catalog-header__eyebrow {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  color: var(--rg-300); letter-spacing: 0.2em; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.catalog-header__eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rg-300); box-shadow: 0 0 8px var(--rg-300); }

.catalog-header__title {
  font-size: 56px; font-weight: 800; margin: 0;
  letter-spacing: -2px; line-height: 1.05;
}
.catalog-header__title .grad {
  background: linear-gradient(135deg, #FFFFFF 0%, #E8C9A8 50%, #C9A380 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.catalog-header__lead { font-size: 15px; color: rgba(255,255,255,0.65); margin-top: 16px; line-height: 1.55; max-width: 460px; }

.catalog-header__panel {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(212,180,149,0.25);
  border-radius: 18px; padding: 28px;
  backdrop-filter: blur(8px);
}
.catalog-header__chips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
.chip {
  background: rgba(212,180,149,0.08);
  border: 1px solid rgba(212,180,149,0.18);
  border-radius: 12px; padding: 12px 14px;
}
.chip__num   { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: var(--rg-200); }
.chip__label { font-size: 10px; color: rgba(255,255,255,0.55); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }

.catalog-header__cta {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 14px 20px; border-radius: 12px;
  background: linear-gradient(135deg, var(--green-500) 0%, var(--green-600) 100%);
  color: #fff; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 0.3px;
  box-shadow: 0 8px 24px rgba(16,185,129,0.4);
}
.catalog-header__online {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  margin-top: 12px; font-size: 11px; color: rgba(255,255,255,0.55);
}
.catalog-header__online .dot-green { width: 6px; height: 6px; border-radius: 50%; background: var(--green-500); box-shadow: 0 0 6px var(--green-500); }

@media (max-width: 900px) {
  .catalog-header { padding: 50px 24px; }
  .catalog-header__inner { grid-template-columns: 1fr; gap: 32px; }
  .catalog-header__title { font-size: 38px; letter-spacing: -1px; }
}
```

---

## 2️⃣ CARDS de categorías (variante C-Grafito sobre fondo medio)

**Archivo:** mismo componente, justo debajo del header.

```jsx
<section className="categories">
  <div className="categories__grid">
    {categories.map(c => (
      <article className="cat-card" key={c.name}>
        {c.tag && <span className="cat-card__tag">{c.tag}</span>}
        <span className="cat-card__corner cat-card__corner--tl" />
        <span className="cat-card__corner cat-card__corner--tr" />
        <span className="cat-card__corner cat-card__corner--bl" />
        <span className="cat-card__corner cat-card__corner--br" />
        <div className="cat-card__halo" />
        <div className="cat-card__icon">{c.icon}</div>
        <div className="cat-card__name">{c.name}</div>
        <div className="cat-card__desc">{c.desc}</div>
        <div className="cat-card__count">· {c.count} productos ·</div>
      </article>
    ))}
  </div>
</section>
```

```css
.categories { background: linear-gradient(180deg, #4A4340 0%, #3A3330 100%); padding: 0 60px 80px; }
.categories__grid { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }

.cat-card {
  position: relative; height: 260px; overflow: hidden;
  border-radius: 22px;
  background: linear-gradient(160deg, var(--graphite-300) 0%, var(--graphite-400) 100%);
  border: 1px solid rgba(201,163,128,0.4);
  box-shadow: 0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 2rem 1.5rem;
  transition: transform .3s ease, box-shadow .3s ease;
}
.cat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.45); }
.cat-card__halo {
  position: absolute; top: 12%; left: 50%; transform: translateX(-50%);
  width: 220px; height: 220px; pointer-events: none; filter: blur(8px);
  background: radial-gradient(circle, rgba(212,180,149,0.5) 0%, rgba(201,163,128,0.18) 40%, transparent 70%);
}
.cat-card__corner { position: absolute; width: 14px; height: 14px; }
.cat-card__corner--tl { top: 12px; left: 12px;  border-top: 1.5px solid var(--rg-300); border-left: 1.5px solid var(--rg-300); }
.cat-card__corner--tr { top: 12px; right: 12px; border-top: 1.5px solid var(--rg-300); border-right: 1.5px solid var(--rg-300); }
.cat-card__corner--bl { bottom: 12px; left: 12px;  border-bottom: 1.5px solid var(--rg-300); border-left: 1.5px solid var(--rg-300); }
.cat-card__corner--br { bottom: 12px; right: 12px; border-bottom: 1.5px solid var(--rg-300); border-right: 1.5px solid var(--rg-300); }
.cat-card__tag {
  position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
  font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
  padding: 3px 12px; border-radius: 20px;
  background: rgba(212,180,149,0.25); border: 1px solid rgba(212,180,149,0.6); color: #F0D9C0;
}
.cat-card__icon { font-size: 58px; margin-bottom: 12px; filter: drop-shadow(0 8px 20px rgba(212,180,149,0.55)); position: relative; z-index: 1; }
.cat-card__name {
  font-size: 22px; font-weight: 700; letter-spacing: -0.4px;
  background: linear-gradient(135deg, #FFFFFF 0%, #E8C9A8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; position: relative; z-index: 1;
}
.cat-card__desc { font-size: 13px; color: rgba(255,255,255,0.78); margin: 4px 0 10px; position: relative; z-index: 1; }
.cat-card__count { font-family: var(--font-mono); font-size: 11px; color: var(--rg-200); letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; position: relative; z-index: 1; }

@media (max-width: 900px) { .categories__grid { grid-template-columns: repeat(2, 1fr); } }
```

---

## 3️⃣ Sección "Todos nuestros productos" (variante A oscura unificada)

**Archivo:** `src/components/ProductsList.jsx` (o el que renderice el grid de productos)

```jsx
<section className="products">
  <div className="products__bg-grid" />
  <div className="products__inner">
    <header className="products__header">
      <div>
        <div className="products__eyebrow">
          <span className="dot" />
          Catálogo · {products.length} disponibles
        </div>
        <h2 className="products__title">Todos nuestros productos</h2>
      </div>
    </header>

    <div className="products__grid">
      {products.map(p => (
        <article className="prod-card" key={p.id}>
          <div className="prod-card__topbar" />
          {p.tag && <span className="prod-card__tag">{p.tag}</span>}
          <div className="prod-card__image">
            <img src={p.image} alt={p.name} />
          </div>
          <div className="prod-card__body">
            <div className="prod-card__name">{p.name}</div>
            <div className="prod-card__price-label">Precio</div>
            <div className="prod-card__price">{p.price} USD</div>
            <button className="prod-card__cta" onClick={() => goTo(p)}>
              <span>Ver más</span><span>→</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

```css
.products {
  position: relative; overflow: hidden;
  background: linear-gradient(180deg, #3A3330 0%, #2F2926 100%);
  padding: 80px 60px; color: #fff;
}
.products__bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(212,180,149,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,180,149,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(circle at 20% 0%, black 0%, transparent 60%);
          mask-image: radial-gradient(circle at 20% 0%, black 0%, transparent 60%);
}
.products__inner { position: relative; max-width: 1240px; margin: 0 auto; }
.products__header { margin-bottom: 36px; }
.products__eyebrow {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  color: var(--rg-300); letter-spacing: 0.2em; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
}
.products__eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rg-300); box-shadow: 0 0 8px var(--rg-300); }
.products__title {
  font-size: 44px; font-weight: 800; margin: 0; letter-spacing: -1.5px; line-height: 1.05;
  background: linear-gradient(135deg, #FFFFFF 0%, #E8C9A8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.products__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }

.prod-card {
  position: relative; overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(160deg, var(--graphite-300) 0%, var(--graphite-400) 100%);
  border: 1px solid rgba(212,180,149,0.25);
  box-shadow: 0 12px 28px rgba(0,0,0,0.35);
  display: flex; flex-direction: column;
  transition: transform .25s ease, box-shadow .25s ease;
}
.prod-card:hover { transform: translateY(-6px); box-shadow: 0 18px 36px rgba(0,0,0,0.45); }
.prod-card__topbar { height: 3px; background: linear-gradient(90deg, var(--rg-400) 0%, var(--rg-300) 100%); }
.prod-card__tag {
  position: absolute; top: 14px; right: 14px; z-index: 2;
  font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
  padding: 4px 9px; border-radius: 4px;
  background: linear-gradient(135deg, var(--rg-300), var(--rg-400)); color: #1A1A1A;
}
.prod-card__image {
  height: 180px;
  background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  border-bottom: 1px solid rgba(212,180,149,0.1);
  display: flex; align-items: center; justify-content: center;
}
.prod-card__image img { max-height: 160px; max-width: 90%; object-fit: contain; }
.prod-card__body { padding: 18px 20px 16px; flex: 1; display: flex; flex-direction: column; }
.prod-card__name { font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.3px; margin-bottom: 6px; }
.prod-card__price-label { font-family: var(--font-mono); font-size: 10px; color: rgba(212,180,149,0.7); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
.prod-card__price { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: var(--rg-200); margin-bottom: 18px; }

.prod-card__cta {
  margin-top: auto; padding: 11px 16px; border-radius: 10px;
  border: 1px solid rgba(212,180,149,0.4);
  background: linear-gradient(135deg, rgba(212,180,149,0.15) 0%, rgba(201,163,128,0.1) 100%);
  color: var(--rg-200);
  font-family: var(--font-mono); font-size: 12px; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer; transition: all .25s ease;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
}
.prod-card__cta:hover {
  background: linear-gradient(135deg, rgba(212,180,149,0.28) 0%, rgba(201,163,128,0.2) 100%);
  border-color: var(--rg-300); color: #fff;
}

@media (max-width: 1100px) { .products__grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 800px)  { .products__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .products__grid { grid-template-columns: 1fr; } }
```

---

## 4️⃣ "¿Por qué IphoneSelectBV?" (rediseñado tech)

**Archivo:** `src/components/AboutUs.jsx`. Reemplazar todo el bloque actual.

> ⚠️ Los textos NO repiten lo del header (que ya menciona usados, 24h, garantía, confianza). Acá hablamos de stock real, verificación, asesoramiento, envíos.

```jsx
<section className="about">
  <div className="about__bg-grid" />
  <div className="about__inner">
    <div className="about__left">
      <div className="about__eyebrow">
        <span className="dot" />
        Quiénes somos · 03
      </div>
      <h2 className="about__title">
        Más que una tienda,<br />
        <span className="grad">una decisión informada</span>
      </h2>
      <p className="about__lead">
        Trabajamos con Apple, Samsung y PlayStation desde Villa María. Vendemos equipos nuevos sellados y también recibimos usados en parte de pago, todo con la misma exigencia: que el cliente vuelva.
      </p>
      <p className="about__lead">
        No somos una multinacional. Somos un equipo chico que conoce cada producto y cada cliente por su nombre.
      </p>

      <div className="about__stat">
        <div className="about__stat-num">5+</div>
        <div>
          <div className="about__stat-title">Años en el mercado</div>
          <div className="about__stat-sub">+1.200 clientes en todo el país</div>
        </div>
      </div>
    </div>

    <div className="about__features">
      {[
        { icon: '◐', title: 'Stock real', desc: 'Lo que ves en la web está disponible. Sin falsas promesas.' },
        { icon: '☷', title: 'Equipos verificados', desc: 'Cada unidad pasa por un control técnico antes de salir.' },
        { icon: '◈', title: 'Asesoramiento 1 a 1', desc: 'Te ayudamos a elegir el modelo según tu uso real.' },
        { icon: '◇', title: 'Envíos coordinados', desc: 'Llegamos a todo el país con seguimiento del pedido.' },
      ].map(f => (
        <div className="about-feat" key={f.title}>
          <div className="about-feat__icon">{f.icon}</div>
          <div className="about-feat__title">{f.title}</div>
          <div className="about-feat__desc">{f.desc}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

```css
.about {
  position: relative; overflow: hidden;
  background: linear-gradient(180deg, #2F2926 0%, #2A2522 100%);
  padding: 100px 60px; color: #fff;
}
.about__bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(212,180,149,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,180,149,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(circle at 90% 50%, black 0%, transparent 70%);
          mask-image: radial-gradient(circle at 90% 50%, black 0%, transparent 70%);
}
.about__inner { position: relative; max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.1fr; gap: 60px; align-items: flex-start; }
.about__eyebrow {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  color: var(--rg-300); letter-spacing: 0.2em; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.about__eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rg-300); box-shadow: 0 0 8px var(--rg-300); }
.about__title { font-size: 44px; font-weight: 800; margin: 0; letter-spacing: -1.5px; line-height: 1.1; }
.about__title .grad {
  background: linear-gradient(135deg, #FFFFFF 0%, #E8C9A8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.about__lead { font-size: 15px; color: rgba(255,255,255,0.7); margin-top: 16px; line-height: 1.7; }
.about__stat {
  margin-top: 32px; padding: 20px 24px;
  background: rgba(212,180,149,0.08);
  border: 1px solid rgba(212,180,149,0.2);
  border-radius: 14px;
  display: flex; align-items: center; gap: 18px;
}
.about__stat-num   { font-size: 32px; font-weight: 800; color: var(--rg-200); letter-spacing: -1px; }
.about__stat-title { font-size: 14px; font-weight: 700; }
.about__stat-sub   { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 2px; }

.about__features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.about-feat {
  background: linear-gradient(160deg, var(--graphite-300) 0%, var(--graphite-400) 100%);
  border: 1px solid rgba(212,180,149,0.25);
  border-radius: 16px; padding: 24px;
  display: flex; flex-direction: column; gap: 10px;
}
.about-feat__icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(212,180,149,0.12);
  border: 1px solid rgba(212,180,149,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; color: var(--rg-200);
}
.about-feat__title { font-size: 16px; font-weight: 700; margin-top: 4px; }
.about-feat__desc  { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.5; }

@media (max-width: 900px) {
  .about { padding: 60px 24px; }
  .about__inner { grid-template-columns: 1fr; gap: 40px; }
  .about__title { font-size: 32px; }
  .about__features { grid-template-columns: 1fr; }
}
```

---

## 5️⃣ FOOTER unificado

**Archivo:** `src/components/Footer.jsx`

```jsx
<footer className="footer">
  <div className="footer__topline" />
  <div className="footer__inner">
    <div className="footer__col">
      <div className="footer__brand">
        <div className="footer__logo"><img src="/logo.png" alt="" /></div>
        <div className="footer__brand-name">IphoneSelectBV</div>
      </div>
      <p className="footer__about">
        Tienda especializada en celulares, accesorios y consolas. Recibimos usados y coordinamos entregas a todo el país.
      </p>
      <div className="footer__status">
        <span className="dot" /> Operativo · respuesta inmediata
      </div>
    </div>

    <div className="footer__col">
      <div className="footer__heading">· Contacto</div>
      <ul className="footer__list">
        <li><span>✆</span> +54 9 3537 30-1603</li>
        <li><span>◉</span> Villa María, Córdoba</li>
        <li><span>✉</span> hola@iphoneselectbv.com</li>
      </ul>
    </div>

    <div className="footer__col">
      <div className="footer__heading">· Horarios</div>
      <ul className="footer__hours">
        <li><span>Lun – Vie</span><b>9:00 – 20:00</b></li>
        <li><span>Sábado</span><b>9:00 – 14:00</b></li>
        <li><span>Domingo</span><b className="off">Cerrado</b></li>
      </ul>
    </div>

    <div className="footer__col">
      <div className="footer__heading">· Redes</div>
      <div className="footer__social">
        <a href="#"><i className="bi bi-whatsapp" /></a>
        <a href="#"><i className="bi bi-instagram" /></a>
        <a href="#"><i className="bi bi-facebook" /></a>
      </div>
      <p className="footer__social-sub">Seguinos para novedades de stock y promos.</p>
    </div>
  </div>

  <div className="footer__bottom">
    <span>© {new Date().getFullYear()} IphoneSelectBV · Todos los derechos reservados</span>
    <div className="footer__legal">
      <a href="#">Términos</a>
      <a href="#">Privacidad</a>
    </div>
  </div>
</footer>
```

```css
.footer {
  position: relative;
  background: linear-gradient(180deg, #252220 0%, #1C1917 100%);
  color: #fff; padding: 60px 60px 28px;
  border-top: 1px solid rgba(212,180,149,0.18);
}
.footer__topline {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--rg-400), var(--rg-300), var(--rg-400), transparent);
}
.footer__inner { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; }
.footer__brand { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.footer__logo {
  width: 40px; height: 40px; border-radius: 10px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F5EDE4 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.footer__logo img { width: 26px; height: 26px; object-fit: contain; }
.footer__brand-name { font-size: 18px; font-weight: 700; letter-spacing: -0.3px; }
.footer__about { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.65; margin: 0 0 18px; }
.footer__status {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 12px; border-radius: 20px;
  background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.35);
  font-size: 11px; color: var(--green-500); font-weight: 600;
}
.footer__status .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-500); box-shadow: 0 0 6px var(--green-500); }

.footer__heading { font-family: var(--font-mono); font-size: 10px; color: var(--rg-300); letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; margin-bottom: 18px; }
.footer__list, .footer__hours { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.footer__list li { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.78); font-size: 13px; }
.footer__list li span { color: var(--rg-300); font-size: 14px; width: 18px; }
.footer__hours li { display: flex; justify-content: space-between; font-size: 13px; color: rgba(255,255,255,0.78); }
.footer__hours li b { color: var(--rg-200); font-family: var(--font-mono); font-weight: 500; }
.footer__hours li b.off { color: rgba(255,255,255,0.4); }

.footer__social { display: flex; gap: 10px; }
.footer__social a {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(212,180,149,0.08);
  border: 1px solid rgba(212,180,149,0.25);
  display: flex; align-items: center; justify-content: center;
  color: var(--rg-200); font-size: 16px; text-decoration: none;
  transition: all .25s ease;
}
.footer__social a:hover { background: linear-gradient(135deg, var(--rg-400), var(--rg-300)); color: #1A1A1A; transform: translateY(-3px); }
.footer__social-sub { margin-top: 16px; font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.5; }

.footer__bottom {
  max-width: 1240px; margin: 48px auto 0; padding-top: 22px;
  border-top: 1px solid rgba(212,180,149,0.15);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px; color: rgba(255,255,255,0.45);
  font-family: var(--font-mono); letter-spacing: 0.1em;
}
.footer__legal { display: flex; gap: 24px; }
.footer__legal a { color: rgba(255,255,255,0.5); text-decoration: none; }
.footer__legal a:hover { color: var(--rg-300); }

@media (max-width: 900px) {
  .footer { padding: 50px 24px 24px; }
  .footer__inner { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer__bottom { flex-direction: column; gap: 12px; text-align: center; }
}
@media (max-width: 560px) {
  .footer__inner { grid-template-columns: 1fr; }
}
```

---

---

## 6️⃣ DETALLE de producto (`/item/:id`)

**Archivo:** `src/components/ItemDetail.jsx` (o `ItemDetailContainer`).

> **Importante:** mantener la lógica de que cada swatch de color cambia la imagen del producto. La prop `imagenSegunColor[color]` ya existe en tu app — solo cambia el contenedor visual.

```jsx
import { useState } from 'react';

export default function ItemDetail({ product }) {
  const [color, setColor] = useState(product.colors[0].id);
  const [storage, setStorage] = useState(product.storages[0].id);

  const selectedColor = product.colors.find(c => c.id === color);
  const selectedStorage = product.storages.find(s => s.id === storage);
  const currentImage = product.imagenSegunColor[color]; // ← se mantiene tu lógica

  return (
    <section className="detail">
      <div className="detail__bg-grid" />
      <div className="detail__inner">

        <nav className="detail__crumb">
          <span className="dot">·</span>
          <a href="/">Catálogo</a><span className="sep">/</span>
          <a href={`/cat/${product.category}`}>{product.category}</a><span className="sep">/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="detail__grid">
          {/* IZQUIERDA: galería */}
          <div className="detail__gallery">
            <div className="detail__image">
              <span className="detail__image-tag">{selectedColor.label}</span>
              <img src={currentImage} alt={`${product.name} ${selectedColor.name}`} />
            </div>

            <div className="detail__swatches">
              {product.colors.map(c => (
                <button key={c.id}
                  className={`swatch ${color === c.id ? 'swatch--active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c.id)}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* DERECHA: info */}
          <div className="detail__info">
            <div className="detail__eyebrow">
              <span className="dot" /> {product.category} · {product.brand}
            </div>

            <h1 className="detail__title">{product.name}</h1>

            <p className="detail__color-line">
              Color seleccionado · <span>{selectedColor.name}</span>
            </p>

            <div className="detail__stats">
              {product.specs.map(s => (
                <div className="detail__stat" key={s.label}>
                  <div className="detail__stat-num">{s.value}</div>
                  <div className="detail__stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="detail__field">
              <div className="detail__field-label">· Almacenamiento</div>
              <div className="detail__storages">
                {product.storages.map(s => (
                  <button key={s.id}
                    className={`storage ${storage === s.id ? 'storage--active' : ''}`}
                    onClick={() => setStorage(s.id)}>
                    <span className="storage__label">{s.label}</span>
                    <span className="storage__price">USD {s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="detail__price-card">
              <div>
                <div className="detail__price-label">Precio final</div>
                <div className="detail__price-value">
                  ${selectedStorage.price} <span>USD</span>
                </div>
              </div>
              <div className="detail__stock">
                <span className="dot" /> En stock
              </div>
            </div>

            <div className="detail__ctas">
              <a className="cta-wsp" href={whatsappLink(product, selectedColor, selectedStorage)}>
                <span>✆</span> Consultar por WhatsApp
              </a>
              <a className="cta-back" href="/">← Volver</a>
            </div>

            <div className="detail__meta">
              <div><div className="meta__label">Garantía</div><div className="meta__val">12 meses</div></div>
              <div><div className="meta__label">Despacho</div><div className="meta__val">24h</div></div>
              <div><div className="meta__label">Estado</div><div className="meta__val">Sellado</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```css
.detail {
  position: relative; overflow: hidden;
  background: linear-gradient(180deg, #3A3330 0%, #2F2926 100%);
  padding: 80px 60px; color: #fff;
}
.detail__bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(212,180,149,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,180,149,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(circle at 20% 0%, black 0%, transparent 60%);
          mask-image: radial-gradient(circle at 20% 0%, black 0%, transparent 60%);
}
.detail__inner { position: relative; max-width: 1240px; margin: 0 auto; }

.detail__crumb {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 8px; margin-bottom: 32px;
}
.detail__crumb .dot { color: var(--rg-300); }
.detail__crumb .sep { color: rgba(255,255,255,0.3); }
.detail__crumb .current { color: var(--rg-200); }
.detail__crumb a { color: inherit; text-decoration: none; }

.detail__grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 48px; }

.detail__gallery {
  background: linear-gradient(160deg, var(--graphite-300) 0%, var(--graphite-400) 100%);
  border: 1px solid rgba(212,180,149,0.25);
  border-radius: 20px; padding: 32px;
  display: flex; flex-direction: column;
  box-shadow: 0 12px 28px rgba(0,0,0,0.35);
}
.detail__image {
  flex: 1; min-height: 440px; border-radius: 14px;
  background: radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06), transparent 65%);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.detail__image img { max-height: 420px; max-width: 80%; object-fit: contain; }
.detail__image-tag {
  position: absolute; top: 18px; left: 18px;
  font-family: var(--font-mono); font-size: 10px; font-weight: 600;
  color: var(--rg-300); letter-spacing: 0.18em; text-transform: uppercase;
  padding: 5px 10px; border-radius: 20px;
  background: rgba(212,180,149,0.1); border: 1px solid rgba(212,180,149,0.25);
}
.detail__swatches { margin-top: 24px; display: flex; gap: 14px; justify-content: center; }
.swatch {
  width: 44px; height: 44px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.15);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  cursor: pointer; transition: all .25s ease; padding: 0;
}
.swatch--active {
  border-color: var(--rg-300);
  box-shadow: 0 0 0 4px rgba(212,180,149,0.2), 0 4px 12px rgba(0,0,0,0.3);
}

.detail__info { display: flex; flex-direction: column; }
.detail__eyebrow {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  color: var(--rg-300); letter-spacing: 0.2em; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.detail__eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rg-300); box-shadow: 0 0 8px var(--rg-300); }
.detail__title {
  font-size: 52px; font-weight: 800; margin: 0;
  letter-spacing: -2px; line-height: 1.05;
  background: linear-gradient(135deg, #FFFFFF 0%, #E8C9A8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.detail__color-line { font-size: 14px; color: rgba(255,255,255,0.6); margin: 10px 0 0; line-height: 1.6; }
.detail__color-line span { color: var(--rg-200); font-weight: 600; }

.detail__stats { margin-top: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.detail__stat {
  background: rgba(212,180,149,0.06); border: 1px solid rgba(212,180,149,0.15);
  border-radius: 10px; padding: 10px 12px;
}
.detail__stat-num { font-size: 14px; font-weight: 800; color: var(--rg-200); letter-spacing: -0.3px; }
.detail__stat-label { font-size: 9px; color: rgba(255,255,255,0.5); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }

.detail__field { margin-top: 32px; }
.detail__field-label {
  font-family: var(--font-mono); font-size: 10px; font-weight: 600;
  color: var(--rg-300); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px;
}
.detail__storages { display: flex; gap: 10px; }
.storage {
  flex: 1; padding: 14px 16px; border-radius: 12px;
  border: 1px solid rgba(212,180,149,0.2);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.7); font-weight: 700; font-size: 14px; cursor: pointer;
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
  transition: all .25s ease;
}
.storage--active {
  border-color: var(--rg-300); color: #fff;
  background: linear-gradient(135deg, rgba(212,180,149,0.22) 0%, rgba(201,163,128,0.12) 100%);
}
.storage__price { font-family: var(--font-mono); font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; }
.storage--active .storage__price { color: var(--rg-200); }

.detail__price-card {
  margin-top: 28px; padding: 20px 24px;
  background: rgba(212,180,149,0.08);
  border: 1px solid rgba(212,180,149,0.2);
  border-radius: 14px;
  display: flex; align-items: baseline; justify-content: space-between;
}
.detail__price-label { font-family: var(--font-mono); font-size: 10px; color: var(--rg-300); letter-spacing: 0.2em; text-transform: uppercase; }
.detail__price-value { font-size: 38px; font-weight: 800; color: #fff; letter-spacing: -1.5px; margin-top: 2px; }
.detail__price-value span { font-size: 16px; color: var(--rg-200); font-weight: 600; }
.detail__stock {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 10px; border-radius: 16px;
  background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.35);
  font-size: 10px; color: var(--green-500); font-weight: 600;
}
.detail__stock .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green-500); box-shadow: 0 0 6px var(--green-500); }

.detail__ctas { margin-top: 18px; display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px; }
.cta-wsp {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 15px 18px; border-radius: 12px;
  background: linear-gradient(135deg, var(--green-500) 0%, var(--green-600) 100%);
  color: #fff; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 0.3px;
  box-shadow: 0 8px 24px rgba(16,185,129,0.35);
}
.cta-back {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 15px 18px; border-radius: 12px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(212,180,149,0.3);
  color: var(--rg-200); text-decoration: none; font-weight: 700; font-size: 13px;
  font-family: var(--font-mono); letter-spacing: 0.15em; text-transform: uppercase;
}

.detail__meta {
  margin-top: 24px; padding-top: 20px;
  border-top: 1px solid rgba(212,180,149,0.15);
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
}
.meta__label { font-family: var(--font-mono); font-size: 9px; color: rgba(255,255,255,0.45); letter-spacing: 0.18em; text-transform: uppercase; }
.meta__val { font-size: 13px; color: #fff; font-weight: 600; margin-top: 4px; }

@media (max-width: 900px) {
  .detail { padding: 50px 24px; }
  .detail__grid { grid-template-columns: 1fr; gap: 32px; }
  .detail__title { font-size: 36px; letter-spacing: -1px; }
}
```

> **Estructura de datos esperada** (ejemplo) — adaptá tu fetch para entregarlo así:
> ```js
> const product = {
>   name: 'iPhone 16e',
>   brand: 'Apple',
>   category: 'Smartphone',
>   colors: [
>     { id: 'white', name: 'Blanco estelar', label: 'Starlight', hex: '#F5F5F0' },
>     { id: 'black', name: 'Negro medianoche', label: 'Midnight', hex: '#1A1A1A' },
>   ],
>   imagenSegunColor: { white: '/img/16e-white.png', black: '/img/16e-black.png' },
>   storages: [{ id: '128', label: '128GB', price: 660 }, { id: '256', label: '256GB', price: 760 }],
>   specs: [
>     { value: '128/256', label: 'GB' },
>     { value: '6.1"', label: 'Pantalla' },
>     { value: 'A18', label: 'Chip' },
>   ],
> };
> ```

---

## ✅ Checklist de implementación

1. [ ] Importar JetBrains Mono en `index.html`
2. [ ] Agregar tokens CSS (paleta) en archivo global
3. [ ] Reemplazar header de catálogo → bloque P3
4. [ ] Reemplazar cards de categorías → variante C-Grafito
5. [ ] Reemplazar `ProductsList` (fondo grafito + cards oscuras + botón Ver más rose gold tech)
6. [ ] Reemplazar `AboutUs` (textos NO repetidos, 4 features nuevas, stat 5+)
7. [ ] Reemplazar `Footer` (4 columnas + status verde + bottom legal)
8. [ ] Reemplazar `ItemDetail` (galería con swatches que cambian la imagen, panel info tech, selector almacenamiento + precio destacado + CTAs)
9. [ ] Eliminar archivos `.module.css` viejos que queden sin usar (`Item.module.css`, `AboutUs.module.css`, `Footer.module.css`, `ItemDetail.module.css`, etc.)

## 🎯 Notas importantes

- **No hay corte blanco entre secciones**: header → categorías → productos → about → footer fluyen del grafito medio al más oscuro.
- **Rose gold solo como acento**: bordes, eyebrows, números de stats, hover states. Nunca como fondo de bloques grandes.
- **Verde** solo para WhatsApp / status "online".
- **Mono** solo para detalles tipo "label", "·", precios secundarios. Nunca para titulares.
- Reemplazar los **iconos unicode** (`◐ ☷ ◈ ◇ ✆ ◉ ✉ ◍`) por íconos reales de tu librería (lucide-react, react-icons/bi, heroicons, etc.) cuando lo apliques.
