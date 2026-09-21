import React, { useState, useRef } from "react";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
  FiMaximize2,
  FiX,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiMinus,
  FiPlus,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDroplet,
  FiSun,
  FiClock,
} from "react-icons/fi";
import { FaStar, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import "./Home.css";
import "./Product.css";

/* =========================================================
   SHARED SITE DATA (kept identical to Home.jsx for consistency)
   ========================================================= */

const NAV_LINKS = [
  { label: "خانه", href: "/" },
  { label: "عطر و ادکلن", href: "#" },
  { label: "لوازم آرایشی و بهداشتی", href: "#" },
  { label: "اکسسوری", href: "#" },
];

const FOOTER_QUICK_LINKS = ["صفحه اصلی", "عطر و ادکلن", "لوازم آرایشی و بهداشتی", "اکسسوری"];
const FOOTER_SERVICE_LINKS = ["پشتیبانی", "تماس با ما", "سوالات متداول", "شرایط و قوانین"];

/* =========================================================
   PRODUCT DATA
   ========================================================= */

const PRODUCT = {
  id: 2,
  category: "perfume", // "perfume" -> manual gram field, anything else -> quantity stepper
  badge: "عطر زنانه",
  name: "عطر ادکلن شنل چنس او تندر",
  rating: 5,
  reviewCount: 12,
  description:
    "عطری زنانه، لطیف و جذاب با رایحه‌ای از گل و میوه‌ای که حس طراوت و اعتماد به نفس را در شما زنده می‌کند.",
  longDescription:
    "عطر شنل چنس او تندر، ترکیبی از رایحه‌های گل یاس، فلفل صورتی و وانیل است که احساس لطافت، انرژی و زنانگی را به شما هدیه می‌دهد. این عطر برای استفاده روزانه و مجالس خاص انتخابی بی‌نظیر است.",
  price: 2890000,
  oldPrice: null,
  images: [
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=900&auto=format&fit=crop",
  ],
  specs: [
    { label: "نوع رایحه", value: "گلی - میوه‌ای" },
    { label: "فصل مناسب", value: "گرم و معتدل" },
    { label: "ماندگاری", value: "بالا" },
    { label: "خانواده رایحه", value: "Eau de Parfum" },
    { label: "کشور سازنده", value: "فرانسه" },
    { label: "حجم‌های موجود", value: "۵۰ / ۱۰۰ / ۱۵۰ میلی‌لیتر" },
  ],
  reviews: [
    {
      name: "نگار.م",
      rating: 5,
      date: "۱۴۰۴/۰۵/۱۲",
      comment: "رایحه فوق‌العاده و ماندگار، بسته‌بندی هم خیلی شیک بود.",
    },
    {
      name: "سارا ک",
      rating: 4,
      date: "۱۴۰۴/۰۴/۳۰",
      comment: "عطر خوبیه ولی پخش بو کمی کمتر از انتظارم بود.",
    },
    {
      name: "مریم",
      rating: 5,
      date: "۱۴۰۴/۰۴/۱۰",
      comment: "دقیقاً مثل عکس و توضیحات بود، ارسال هم خیلی سریع انجام شد.",
    },
  ],
};

const MIN_GRAM = 5;

const RELATED_PRODUCTS = [
  {
    id: 10,
    name: "عطر دیور جادور",
    price: 2250000,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "عطر ورساچه برایت کریستال",
    price: 2390000,
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "عطر لانکوم لا وی است بله",
    price: 2950000,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 13,
    name: "عطر گوچی بلوم",
    price: 2690000,
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 14,
    name: "عطر شنل کوکو مادمازل",
    price: 3190000,
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=500&auto=format&fit=crop",
  },
];

const formatPrice = (value) => new Intl.NumberFormat("fa-IR").format(value) + " تومان";

const Stars = ({ rating }) => (
  <div className="stars" aria-label={`امتیاز ${rating} از ۵`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < rating ? "star star--full" : "star star--empty"} />
    ))}
  </div>
);

/* =========================================================
   HEADER (identical to Home.jsx, for site-wide consistency)
   ========================================================= */

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__nav">
          <button
            className="header__hamburger"
            aria-label="باز کردن منو"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
          <nav className="header__links">
            {NAV_LINKS.map((link) => (
              <a href={link.href} key={link.label} className="header__link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <a href="/" className="header__logo" aria-label="فروشگاه شمین">
          <img src="/logo.png" alt="لوگوی شمین گالری" className="header__logo-img" />
          <span className="header__logo-text">گالری شمین</span>
        </a>

        <div className="header__actions">
          <div className="header__search">
            <FiSearch className="header__search-icon" />
            <input type="text" placeholder="جستجو در محصولات..." />
          </div>
          <a href="/register" className="header__icon-btn" aria-label="ورود / ثبت نام">
            <FiUser />
          </a>
          <button className="header__icon-btn" aria-label="علاقه‌مندی‌ها">
            <FiHeart />
          </button>
          <a href="/cart" className="header__icon-btn" aria-label="سبد خرید">
            <FiShoppingCart />
            <span className="header__badge">0</span>
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__backdrop" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu__panel">
            <div className="mobile-menu__head">
              <span className="mobile-menu__brand">
                <img src="/logo.png" alt="لوگوی شمین گالری" className="header__logo-img" />
                <span className="header__logo-text">گالری شمین</span>
              </span>
              <button
                className="header__icon-btn"
                aria-label="بستن منو"
                onClick={() => setMenuOpen(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="mobile-menu__search">
              <FiSearch className="header__search-icon" />
              <input type="text" placeholder="جستجو در محصولات..." />
            </div>
            <nav className="mobile-menu__links">
              {NAV_LINKS.map((link) => (
                <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

/* =========================================================
   FOOTER (identical to Home.jsx, for site-wide consistency)
   ========================================================= */

const Footer = () => (
  <footer className="footer">
    <div className="container footer__grid">
      <div className="footer__col footer__col--brand">
        <a href="/" className="header__logo header__logo--footer">
          <img src="/logo.png" alt="لوگوی شمین گالری" className="header__logo-img" />
          <span className="header__logo-text">
            SHAMIN
            <small>BEAUTY · STYLE · YOU</small>
          </span>
        </a>
        <p>فروشگاه آنلاین عطر، لوازم آرایشی و اکسسوری با ضمانت اصالت کالا.</p>
        <div className="footer__social">
          <a href="#" aria-label="اینستاگرام">
            <FaInstagram />
          </a>
          <a href="https://t.me/Shamin_Galerri" aria-label="تلگرام">
            <FaTelegramPlane />
          </a>
          <a href="https://ble.ir/shamin_galerri" aria-label="بله">
            <img src="/bale-icon.png" alt="بله" className="footer__social-icon" />
          </a>
          <a href="https://eitaa.com/Shamin_Galerri" aria-label="ایتا">
            <img src="/eitaa-icon.png" alt="ایتا" className="footer__social-icon" />
          </a>
          <a href="https://splus.ir/Shamin_Galerri" aria-label="سروش">
            <img src="/soroush-icon.png" alt="سروش" className="footer__social-icon" />
          </a>
          <a href="rubika.ir/@shamin_galeri" aria-label="روبیکا">
            <img src="/rubika-icon.png" alt="روبیکا" className="footer__social-icon" />
          </a>
        </div>
      </div>

      <div className="footer__col">
        <h4>دسترسی به دسته بندی</h4>
        <ul>
          {FOOTER_QUICK_LINKS.map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__col">
        <h4>خدمات مشتریان</h4>
        <ul>
          {FOOTER_SERVICE_LINKS.map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__col">
        <h4>تماس با ما</h4>
        <ul className="footer__contact">
          <li>
            <FiPhone /> 09185642392 / 09193046284
          </li>
          <li>
            <FiMail /> shamingallery1401@gmail.com
          </li>
          <li>
            <FiMapPin /> تهران، افسریه
          </li>
        </ul>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="container footer__bottom-inner">
        <span>© تمامی حقوق مادی و معنوی متعلق به فروشگاه شمین است.</span>
        <a href="https://morenacode.ir/" id="morena" className="footer__morena">
          طراحی شده توسط تیم برنامه نویسی
          <img src="/logo-morena.png" alt="مورنا کد" className="footer__morena-logo" />
        </a>
      </div>
    </div>
  </footer>
);

/* =========================================================
   PRODUCT GALLERY
   ========================================================= */

const ProductGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbsRef = useRef(null);

  const scrollThumbs = (dir) => {
    thumbsRef.current?.scrollBy({ top: dir * 90, behavior: "smooth" });
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery__thumbs-col">
        <button
          className="product-gallery__scroll-btn"
          onClick={() => scrollThumbs(-1)}
          aria-label="تصاویر قبلی"
        >
          <FiChevronUp />
        </button>
        <div className="product-gallery__thumbs" ref={thumbsRef}>
          {images.map((img, i) => (
            <button
              key={i}
              className={
                i === activeIndex
                  ? "product-gallery__thumb product-gallery__thumb--active"
                  : "product-gallery__thumb"
              }
              onClick={() => setActiveIndex(i)}
              aria-label={`تصویر ${i + 1}`}
            >
              <img src={img} alt={`${PRODUCT.name} - ${i + 1}`} />
            </button>
          ))}
        </div>
        <button
          className="product-gallery__scroll-btn"
          onClick={() => scrollThumbs(1)}
          aria-label="تصاویر بعدی"
        >
          <FiChevronDown />
        </button>
      </div>

      <div className="product-gallery__main">
        <button
          className={
            wishlisted
              ? "product-gallery__wishlist product-gallery__wishlist--active"
              : "product-gallery__wishlist"
          }
          onClick={() => setWishlisted((prev) => !prev)}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <FiHeart />
        </button>
        <img src={images[activeIndex]} alt={PRODUCT.name} className="product-gallery__image" />
        <button
          className="product-gallery__zoom"
          onClick={() => setLightboxOpen(true)}
          aria-label="بزرگ‌نمایی تصویر"
        >
          <FiMaximize2 />
        </button>
      </div>

      {lightboxOpen && (
        <div className="product-lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="product-lightbox__close" aria-label="بستن">
            <FiX />
          </button>
          <img src={images[activeIndex]} alt={PRODUCT.name} />
        </div>
      )}
    </div>
  );
};

/* =========================================================
   PRODUCT INFO PANEL
   ========================================================= */

const ProductInfo = ({ product }) => {
  const isPerfume = product.category === "perfume";
  const [gram, setGram] = useState(MIN_GRAM);
  const [quantity, setQuantity] = useState(1);

  const handleGramChange = (e) => {
    const raw = e.target.value;
    if (raw === "") {
      setGram("");
      return;
    }
    const value = Number(raw);
    if (!Number.isNaN(value)) {
      setGram(value);
    }
  };

  const handleGramBlur = () => {
    setGram((prev) => {
      const value = Number(prev);
      return !prev || Number.isNaN(value) || value < MIN_GRAM ? MIN_GRAM : value;
    });
  };

  const handleAddToCart = () => {
    // TODO: connect to real cart logic (e.g. context, redux, or an API call)
    const payload = isPerfume
      ? { productId: product.id, gram: Math.max(MIN_GRAM, Number(gram) || MIN_GRAM) }
      : { productId: product.id, quantity };
    console.log("افزودن به سبد خرید:", payload);
  };

  const handleAddToWishlist = () => {
    // TODO: connect to real wishlist logic
    console.log("افزودن به علاقه‌مندی‌ها:", product.id);
  };

  return (
    <div className="product-info">
      <span className="product-info__badge">{product.badge}</span>
      <h1 className="product-info__title">{product.name}</h1>

      <div className="product-info__rating">
        <Stars rating={product.rating} />
        <span>({product.reviewCount} نظر)</span>
      </div>

      <p className="product-info__desc">{product.description}</p>

      <div className="product-info__price">
        {product.oldPrice && (
          <span className="product-info__price-old">{formatPrice(product.oldPrice)}</span>
        )}
        {formatPrice(product.price)}
      </div>

      <div className="product-info__trust">
        <span>
          <FiShield />
          اصالت کالا
        </span>
        <span>
          <FiTruck />
          ارسال سریع
        </span>
        <span>
          <FiRefreshCw />
          ضمانت بازگشت
        </span>
      </div>

      {isPerfume ? (
        <div className="product-info__field">
          <span className="product-info__field-label">گرم مورد نظر خود را وارد کنید (حداقل {MIN_GRAM} گرم)</span>
          <input
            type="number"
            min={MIN_GRAM}
            step={1}
            inputMode="numeric"
            value={gram}
            onChange={handleGramChange}
            onBlur={handleGramBlur}
            className="product-info__gram-input"
          />
        </div>
      ) : (
        <div className="product-info__field">
          <span className="product-info__field-label">تعداد</span>
          <div className="product-info__stepper">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="کاهش تعداد"
            >
              <FiMinus />
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} aria-label="افزایش تعداد">
              <FiPlus />
            </button>
          </div>
        </div>
      )}

      <button className="product-info__add-btn" onClick={handleAddToCart}>
        افزودن به سبد خرید
        <FiShoppingCart />
      </button>
      <button className="product-info__wishlist-btn" onClick={handleAddToWishlist}>
        افزودن به علاقه‌مندی‌ها
        <FiHeart />
      </button>
    </div>
  );
};

/* =========================================================
   PRODUCT TABS
   ========================================================= */

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "توضیحات محصول" },
    { id: "specs", label: "مشخصات" },
    { id: "reviews", label: "نظرات کاربران" },
  ];

  const specIcons = {
    "نوع رایحه": <FiDroplet />,
    "فصل مناسب": <FiSun />,
    ماندگاری: <FiClock />,
  };

  const quickSpecs = product.specs.filter((s) => specIcons[s.label]);

  return (
    <div className="product-tabs">
      <div className="product-tabs__nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={
              activeTab === tab.id
                ? "product-tabs__tab product-tabs__tab--active"
                : "product-tabs__tab"
            }
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="product-tabs__panel">
        {activeTab === "description" && (
          <div className="product-tabs__description">
            <p>{product.longDescription}</p>
            <div className="product-tabs__specs-box">
              {quickSpecs.map((spec) => (
                <div className="product-tabs__spec-row" key={spec.label}>
                  <div className="product-tabs__spec-text">
                    <span className="product-tabs__spec-label">{spec.label}</span>
                    <span className="product-tabs__spec-value">{spec.value}</span>
                  </div>
                  <span className="product-tabs__spec-icon">{specIcons[spec.label]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <table className="product-tabs__specs-table">
            <tbody>
              {product.specs.map((spec) => (
                <tr key={spec.label}>
                  <th>{spec.label}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "reviews" && (
          <div className="product-tabs__reviews">
            <div className="product-tabs__reviews-summary">
              <span className="product-tabs__reviews-score">{product.rating.toFixed(1)}</span>
              <div>
                <Stars rating={product.rating} />
                <span className="product-tabs__reviews-count">
                  بر اساس {product.reviewCount} نظر
                </span>
              </div>
            </div>
            {product.reviews.map((review, i) => (
              <div className="product-tabs__review" key={i}>
                <div className="product-tabs__review-head">
                  <strong>{review.name}</strong>
                  <span>{review.date}</span>
                </div>
                <Stars rating={review.rating} />
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   RELATED PRODUCTS
   ========================================================= */

const RelatedProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <a href={`/product/${product.id}`} className="related-card">
      <button
        className={
          wishlisted ? "related-card__wishlist related-card__wishlist--active" : "related-card__wishlist"
        }
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setWishlisted((prev) => !prev);
        }}
        aria-label="افزودن به علاقه‌مندی‌ها"
      >
        <FiHeart />
      </button>
      <div className="related-card__media">
        <img src={product.image} alt={product.name} />
      </div>
      <span className="related-card__name">{product.name}</span>
      <span className="related-card__price">{formatPrice(product.price)}</span>
    </a>
  );
};

const RelatedProducts = ({ products }) => {
  const scrollerRef = useRef(null);

  const scroll = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <section className="related-products">
      <div className="related-products__title">
        <span className="related-products__line" />
        <h2>محصولات مشابه</h2>
      </div>

      <div className="related-products__row">
        <button
          className="related-products__arrow"
          onClick={() => scroll(1)}
          aria-label="محصولات بعدی"
        >
          <FiChevronRight />
        </button>
        <div className="related-products__scroller" ref={scrollerRef}>
          {products.map((p) => (
            <RelatedProductCard product={p} key={p.id} />
          ))}
        </div>
        <button
          className="related-products__arrow"
          onClick={() => scroll(-1)}
          aria-label="محصولات قبلی"
        >
          <FiChevronLeft />
        </button>
      </div>
    </section>
  );
};

/* =========================================================
   PAGE
   ========================================================= */

const Product = () => {
  return (
    <div className="home-page" dir="rtl">
      <Header />
      <main>
        <section className="container product-detail">
          <ProductGallery images={PRODUCT.images} />
          <ProductInfo product={PRODUCT} />
        </section>

        <section className="container">
          <ProductTabs product={PRODUCT} />
        </section>

        <RelatedProducts products={RELATED_PRODUCTS} />
      </main>
      <Footer />
    </div>
  );
};

export default Product;
