import React, { useMemo, useState } from 'react';
import './Cart.css';

/* ── ابزارها ─────────────────────────────────────────────────────────────── */

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** تبدیل ارقام لاتین به فارسی */
const toFa = (value) =>
  String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

/** قالب‌بندی قیمت با جداکننده هزارگان + ارقام فارسی */
const formatPrice = (value) =>
  toFa(new Intl.NumberFormat('en-US').format(Math.round(value)));

/* ── منابع (فایل‌ها داخل پوشه public) ────────────────────────────────────── */

const BANNER_SRC = '/بنر سبدخرید.svg';

/* ── داده نمونه ──────────────────────────────────────────────────────────── */

const SEED_ITEMS = [
  {
    id: 1,
    brand: 'احسانا',
    name: 'عطر اسپرت مردانه — کالکشن نایت',
    tags: ['اورجینال', 'محدود'],
    price: 1250000,
    originalPrice: 1580000,
    discountPercent: 21,
    quantity: 1,
    image: '/عکس عطر1.png',
  },
  {
    id: 2,
    brand: 'احسانا',
    name: 'عطر گل‌محمدی زنانه — سری رز',
    tags: ['اورجینال', 'دست‌ساز'],
    price: 980000,
    originalPrice: null,
    discountPercent: null,
    quantity: 2,
    image: '/عکس عطر2.png',
  },
  {
    id: 3,
    brand: 'احسانا',
    name: 'عطر اود عربی — ادیشن گلد',
    tags: ['پرفروش', 'اورجینال'],
    price: 1750000,
    originalPrice: 2100000,
    discountPercent: 17,
    quantity: 1,
    image: '/عکس عطر3.png',
  },
];

const COUPONS = {
  EHSANA10: { type: 'percent', value: 10 },
  SAVE100: { type: 'fixed', value: 100000 },
};

/* ── آیکون‌ها ────────────────────────────────────────────────────────────── */

function TrashIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── بنر بالای صفحه ─────────────────────────────────────────────────────── */

function CartBanner() {
  return (
    <div
      className="cart-banner"
      style={{ backgroundImage: `url(${encodeURI('/banner-cart.svg')})` }}
    >
      <div className="cart-banner__content">
        <span className="cart-banner__icon" aria-hidden="true">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8h5l6.5 24h22l5-16H15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="22" cy="40" r="2.5" stroke="currentColor" strokeWidth="2.5"/>
            <circle cx="36" cy="40" r="2.5" stroke="currentColor" strokeWidth="2.5"/>
          </svg>
        </span>
        <h1 className="cart-banner__title">سبد خرید</h1>
        <p className="cart-banner__subtitle">محصولات منتخب شما در سبد خرید...</p>
      </div>
    </div>
  );
}





/* ── کنترل تعداد ────────────────────────────────────────────────────────── */

function QuantityControl({ item, onIncrease, onDecrease }) {
  return (
    <div
      className="cart-qty"
      role="group"
      aria-label={`تعداد ${item.name}`}
    >
      <button
        type="button"
        className="cart-qty__btn"
        onClick={() => onIncrease(item.id)}
        aria-label="افزایش تعداد"
      >
        +
      </button>

      <span className="cart-qty__value" aria-live="polite">
        {toFa(item.quantity)}
      </span>

      <button
        type="button"
        className="cart-qty__btn"
        onClick={() => onDecrease(item.id)}
        disabled={item.quantity <= 1}
        aria-label="کاهش تعداد"
      >
        −
      </button>
    </div>
  );
}

/* ── قیمت محصول ─────────────────────────────────────────────────────────── */

function ItemPrice({ item }) {
  return (
    <div className="cart-price">
      {item.originalPrice && (
        <span className="cart-price__old">
          {formatPrice(item.originalPrice)}
        </span>
      )}

      <div className="cart-price__row">
        {item.discountPercent && (
          <span className="cart-price__badge">
            ٪{toFa(item.discountPercent)}−
          </span>
        )}
        <span className="cart-price__now">{formatPrice(item.price)}</span>
        <span className="cart-price__unit">تومان</span>
      </div>
    </div>
  );
}

/* ── یک ردیف محصول ──────────────────────────────────────────────────────── */

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <div className="cart-item__media">
        <img
          src={encodeURI(item.image)}
          alt={item.name}
          loading="lazy"
        />
      </div>

      <div className="cart-item__body">
        {item.brand && <p className="cart-item__brand">{item.brand}</p>}
        <h3 className="cart-item__name">{item.name}</h3>

        {item.tags?.length > 0 && (
          <ul className="cart-item__tags" aria-label="ویژگی‌های محصول">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <div className="cart-item__foot">
          <QuantityControl
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
          <ItemPrice item={item} />
        </div>
      </div>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(item.id)}
        aria-label={`حذف ${item.name} از سبد خرید`}
      >
        <CloseIcon />
      </button>
    </article>
  );
}

/* ── بخش کد تخفیف ───────────────────────────────────────────────────────── */

function CouponBox({
  value,
  onChange,
  applied,
  onApply,
  onClear,
  message,
}) {
  return (
    <div className="cart-coupon">
      <label className="cart-coupon__label" htmlFor="cart-coupon-input">
        کد تخفیف دارید؟
      </label>

      <div className="cart-coupon__row">
        <input
          id="cart-coupon-input"
          type="text"
          className="cart-coupon__input"
          placeholder="کد تخفیف را وارد کنید"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onApply();
          }}
          disabled={Boolean(applied)}
          aria-describedby={message ? 'cart-coupon-msg' : undefined}
        />

        {applied ? (
          <button
            type="button"
            className="cart-coupon__btn cart-coupon__btn--clear"
            onClick={onClear}
          >
            حذف
          </button>
        ) : (
          <button
            type="button"
            className="cart-coupon__btn"
            onClick={onApply}
          >
            اعمال
          </button>
        )}
      </div>

      {message && (
        <p
          id="cart-coupon-msg"
          className={
            message.ok
              ? 'cart-coupon__msg cart-coupon__msg--ok'
              : 'cart-coupon__msg cart-coupon__msg--err'
          }
          role="status"
          aria-live="polite"
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

/* ── سایدبار خلاصه سفارش ────────────────────────────────────────────────── */

function OrderSummary({
  itemCount,
  subtotal,
  discount,
  total,
  applied,
  couponInput,
  onCouponChange,
  onApplyCoupon,
  onClearCoupon,
  couponMessage,
}) {
  return (
    <aside className="cart-summary" aria-label="خلاصه سفارش">
      <div className="cart-summary__head">
        <h2>خلاصه سفارش</h2>
        <span className="cart-summary__count">
          {toFa(itemCount)} کالا
        </span>
      </div>

      <div className="cart-summary__body">
        <CouponBox
          value={couponInput}
          onChange={onCouponChange}
          applied={applied}
          onApply={onApplyCoupon}
          onClear={onClearCoupon}
          message={couponMessage}
        />

        <div className="cart-summary__divider" />

        <div className="cart-summary__row">
          <span className="cart-summary__label">جمع کل اقلام</span>
          <span className="cart-summary__value">
            {formatPrice(subtotal)} تومان
          </span>
        </div>

        <div className="cart-summary__row">
          <span className="cart-summary__label">هزینه ارسال</span>
          <span className="cart-summary__value cart-summary__value--free">
            رایگان
          </span>
        </div>

        {discount > 0 && (
          <div className="cart-summary__row cart-summary__row--discount">
            <span className="cart-summary__label">
              سود شما از خرید
              {applied?.code && (
                <span className="cart-summary__code">{applied.code}</span>
              )}
            </span>
            <span className="cart-summary__value">
              − {formatPrice(discount)} تومان
            </span>
          </div>
        )}

        <div className="cart-summary__divider" />

        <div className="cart-summary__row cart-summary__row--total">
          <span className="cart-summary__label">مبلغ قابل پرداخت</span>
          <span className="cart-summary__total">
            {formatPrice(total)} تومان
          </span>
        </div>

        <button type="button" className="cart-summary__submit">
          ادامه و ثبت سفارش
        </button>

        <a href="/" className="cart-summary__back">
          بازگشت به فروشگاه
        </a>
      </div>
    </aside>
  );
}

/* ── حالت خالی ──────────────────────────────────────────────────────────── */

function EmptyCart() {
  return (
    <div className="cart-empty" role="status">
      <h2 className="cart-empty__title">سبد خرید شما خالی است</h2>
      <p className="cart-empty__text">
        هنوز محصولی به سبد خرید اضافه نکرده‌اید.
      </p>
      <a href="/" className="cart-empty__link">
        بازگشت به فروشگاه
      </a>
    </div>
  );
}

/* ── کامپوننت اصلی ──────────────────────────────────────────────────────── */

export default function Cart() {
  const [items, setItems] = useState(SEED_ITEMS);
  const [couponInput, setCouponInput] = useState('');
  const [applied, setApplied] = useState(null);
  const [couponMessage, setCouponMessage] = useState(null);

  /* ── تغییر تعداد ── */
  function handleIncrease(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrease(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  function handleRemove(id) {
    if (!window.confirm('این محصول از سبد خرید حذف شود؟')) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleClearAll() {
    if (!window.confirm('تمام محصولات از سبد خرید حذف شوند؟')) return;
    setItems([]);
    setApplied(null);
    setCouponInput('');
    setCouponMessage(null);
  }

  /* ── کد تخفیف ── */
  function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponMessage({ text: 'کد تخفیف را وارد کنید.', ok: false });
      return;
    }

    const found = COUPONS[code];

    if (!found) {
      setApplied(null);
      setCouponMessage({ text: 'کد تخفیف معتبر نیست.', ok: false });
      return;
    }

    setApplied({ code, ...found });
    setCouponMessage({ text: 'کد تخفیف با موفقیت اعمال شد.', ok: true });
  }

  function handleClearCoupon() {
    setApplied(null);
    setCouponInput('');
    setCouponMessage(null);
  }

  /* ── محاسبات ── */
  const { subtotal, discount, total, itemCount } = useMemo(() => {
    const sub = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const off = applied
      ? applied.type === 'percent'
        ? Math.round((sub * applied.value) / 100)
        : Math.min(applied.value, sub)
      : 0;

    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal: sub, discount: off, total: sub - off, itemCount: count };
  }, [items, applied]);

  /* ── رندر ── */
  return (
    <div className="cart-page" dir="rtl">
      <CartBanner />

      <div className="cart-page__inner">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="cart-page__heading">
              <h2 className="cart-page__title">محصولات انتخاب‌شده</h2>
              <button
                type="button"
                className="cart-page__clear"
                onClick={handleClearAll}
              >
                <TrashIcon />
                پاک کردن سبد
              </button>
            </div>

            <div className="cart-grid">
              <section
                className="cart-items"
                aria-label="محصولات سبد خرید"
              >
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
              </section>

              <OrderSummary
                itemCount={itemCount}
                subtotal={subtotal}
                discount={discount}
                total={total}
                applied={applied}
                couponInput={couponInput}
                onCouponChange={setCouponInput}
                onApplyCoupon={handleApplyCoupon}
                onClearCoupon={handleClearCoupon}
                couponMessage={couponMessage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
