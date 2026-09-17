import React,{useEffect,useMemo,useState}from"react";
import{FiPlus,FiSearch,FiFilter,FiChevronDown,FiChevronLeft,FiChevronRight,FiCalendar,FiUsers,FiDatabase,FiCheckCircle,FiTruck,FiClock,FiXCircle,FiEye,FiMoreHorizontal,FiCopy,FiPackage,FiRefreshCw,FiShoppingBag}from"react-icons/fi";
import"./Orders.css";

const shaminOrdersData=[
{id:"SH-1048",customer:"سارا محمدی",customerType:"مشتری عادی",products:[{name:"Chanel Coco Mademoiselle",type:"عطر زنانه"},{name:"Dior Sauvage",type:"عطر مردانه"}],productCount:2,amount:4850000,status:"completed",statusLabel:"تکمیل شده",time:"۱۲ دقیقه پیش",date:"امروز"},
{id:"SH-1047",customer:"علی رضایی",customerType:"مشتری عادی",products:[{name:"Dior Sauvage",type:"عطر مردانه"}],productCount:1,amount:5250000,status:"shipping",statusLabel:"در حال ارسال",time:"۳۵ دقیقه پیش",date:"امروز"},
{id:"SH-1046",customer:"نگار احمدی",customerType:"مشتری عادی",products:[{name:"YSL Libre",type:"عطر زنانه"},{name:"Chanel Chance",type:"عطر زنانه"},{name:"Versace Bright Crystal",type:"عطر زنانه"}],productCount:3,amount:4600000,status:"pending",statusLabel:"در انتظار",time:"۵۲ دقیقه پیش",date:"امروز"},
{id:"SH-1045",customer:"محمد کریمی",customerType:"مشتری ویژه",products:[{name:"Tom Ford Oud Wood",type:"عطر مردانه"}],productCount:1,amount:7900000,status:"completed",statusLabel:"تکمیل شده",time:"۱ ساعت پیش",date:"امروز"},
{id:"SH-1044",customer:"فاطمه حسینی",customerType:"مشتری عادی",products:[{name:"Black Opium",type:"عطر زنانه"},{name:"J'adore",type:"عطر زنانه"}],productCount:2,amount:3250000,status:"cancelled",statusLabel:"لغو شده",time:"۲ ساعت پیش",date:"امروز"},
{id:"SH-1043",customer:"رضا صادقی",customerType:"مشتری عادی",products:[{name:"Bleu de Chanel",type:"عطر مردانه"},{name:"Acqua di Gio",type:"عطر مردانه"}],productCount:2,amount:6200000,status:"completed",statusLabel:"تکمیل شده",time:"۳ ساعت پیش",date:"امروز"},
{id:"SH-1042",customer:"مریم اکبری",customerType:"مشتری عادی",products:[{name:"YSL Libre",type:"عطر زنانه"}],productCount:1,amount:3850000,status:"shipping",statusLabel:"در حال ارسال",time:"۵ ساعت پیش",date:"امروز"},
{id:"SH-1041",customer:"امیر نادری",customerType:"مشتری ویژه",products:[{name:"Tom Ford Noir",type:"عطر مردانه"},{name:"Dior Homme",type:"عطر مردانه"}],productCount:2,amount:7400000,status:"pending",statusLabel:"در انتظار",time:"۶ ساعت پیش",date:"امروز"},
{id:"SH-1040",customer:"الهام مرادی",customerType:"مشتری عادی",products:[{name:"Chanel Coco Mademoiselle",type:"عطر زنانه"}],productCount:1,amount:2450000,status:"completed",statusLabel:"تکمیل شده",time:"۸ ساعت پیش",date:"دیروز"},
{id:"SH-1039",customer:"حسین موسوی",customerType:"مشتری عادی",products:[{name:"Dior Sauvage",type:"عطر مردانه"}],productCount:1,amount:5200000,status:"shipping",statusLabel:"در حال ارسال",time:"دیروز",date:"دیروز"}
];

const shaminStatusConfig={completed:{label:"تکمیل شده",icon:FiCheckCircle},shipping:{label:"در حال ارسال",icon:FiTruck},pending:{label:"در انتظار",icon:FiClock},cancelled:{label:"لغو شده",icon:FiXCircle}};

const shaminProductImages=[
"https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=120&q=80",
"https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=120&q=80",
"https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=120&q=80"
];

function Orders(){
const[shaminSearch,setShaminSearch]=useState("");
const[shaminStatusFilter,setShaminStatusFilter]=useState("all");
const[shaminCustomerFilter,setShaminCustomerFilter]=useState("all");
const[shaminDateFilter,setShaminDateFilter]=useState("all");
const[shaminSort,setShaminSort]=useState("newest");
const[shaminPage,setShaminPage]=useState(1);
const[shaminRowsPerPage,setShaminRowsPerPage]=useState(6);
const[shaminOpenOrderMenu,setShaminOpenOrderMenu]=useState(null);
const[shaminCopiedOrder,setShaminCopiedOrder]=useState(null);
const[shaminMobileFilters,setShaminMobileFilters]=useState(false);
const[shaminPriceMin,setShaminPriceMin]=useState("");
const[shaminPriceMax,setShaminPriceMax]=useState("");
const shaminFormatPrice=price=>price.toLocaleString("fa-IR");

const shaminStats=useMemo(()=>{
const total=shaminOrdersData.length;
const completed=shaminOrdersData.filter(o=>o.status==="completed").length;
const shipping=shaminOrdersData.filter(o=>o.status==="shipping").length;
const pending=shaminOrdersData.filter(o=>o.status==="pending").length;
const cancelled=shaminOrdersData.filter(o=>o.status==="cancelled").length;
return{total,completed,shipping,pending,cancelled};
},[]);

const shaminFilteredOrders=useMemo(()=>{
const search=shaminSearch.trim().toLowerCase();
let result=shaminOrdersData.filter(order=>{
const matchesSearch=!search||order.id.toLowerCase().includes(search)||order.customer.toLowerCase().includes(search)||order.products.some(p=>p.name.toLowerCase().includes(search));
const matchesStatus=shaminStatusFilter==="all"||order.status===shaminStatusFilter;
const matchesCustomer=shaminCustomerFilter==="all"||(shaminCustomerFilter==="vip"&&order.customerType==="مشتری ویژه")||(shaminCustomerFilter==="normal"&&order.customerType==="مشتری عادی");
const matchesDate=shaminDateFilter==="all"||(shaminDateFilter==="today"&&order.date==="امروز")||(shaminDateFilter==="yesterday"&&order.date==="دیروز");
const numericMin=Number(shaminPriceMin.replace(/[^\d]/g,""))||0;
const numericMax=Number(shaminPriceMax.replace(/[^\d]/g,""))||Infinity;
const matchesPrice=order.amount>=numericMin&&order.amount<=numericMax;
return matchesSearch&&matchesStatus&&matchesCustomer&&matchesDate&&matchesPrice;
});
if(shaminSort==="oldest"){result=[...result].reverse();}
if(shaminSort==="amount-high"){result=[...result].sort((a,b)=>b.amount-a.amount);}
if(shaminSort==="amount-low"){result=[...result].sort((a,b)=>a.amount-b.amount);}
return result;
},[shaminSearch,shaminStatusFilter,shaminCustomerFilter,shaminDateFilter,shaminSort,shaminPriceMin,shaminPriceMax]);

const shaminTotalPages=Math.max(1,Math.ceil(shaminFilteredOrders.length/shaminRowsPerPage));
const shaminCurrentOrders=shaminFilteredOrders.slice((shaminPage-1)*shaminRowsPerPage,shaminPage*shaminRowsPerPage);
const shaminChangeFilter=(setter,value)=>{setter(value);setShaminPage(1);};
const shaminResetFilters=()=>{setShaminSearch("");setShaminStatusFilter("all");setShaminCustomerFilter("all");setShaminDateFilter("all");setShaminSort("newest");setShaminPriceMin("");setShaminPriceMax("");setShaminPage(1);};
const shaminCopyOrder=async orderId=>{try{await navigator.clipboard.writeText(`#${orderId}`);setShaminCopiedOrder(orderId);setTimeout(()=>{setShaminCopiedOrder(null);},1400);}catch{setShaminCopiedOrder(orderId);setTimeout(()=>{setShaminCopiedOrder(null);},1400);}};
const shaminGoToPage=page=>{if(page<1||page>shaminTotalPages)return;setShaminPage(page);};
const shaminVisiblePages=Array.from({length:shaminTotalPages},(_,index)=>index+1).slice(0,5);

useEffect(()=>{
const handleOutsideClick=event=>{
if(!event.target.closest(".shamin-orders__more")){
setShaminOpenOrderMenu(null);
}
};
document.addEventListener("mousedown",handleOutsideClick);
return()=>{
document.removeEventListener("mousedown",handleOutsideClick);
};
},[]);

return(
<section className="shamin-orders" dir="rtl">
<div className="shamin-orders__page-head">
<div className="shamin-orders__page-title">
<div className="shamin-orders__title-kicker">
<span className="shamin-orders__title-dot"></span>
مدیریت فروشگاه
</div>
<h1>سفارش‌ها</h1>
<p>مدیریت، پیگیری و بررسی سفارش‌های ثبت‌شده در فروشگاه</p>
</div>
<div className="shamin-orders__head-actions">
<button type="button" className="shamin-orders__new-order"><FiPlus/><span>سفارش جدید</span></button>
</div>
</div>

<div className="shamin-orders__stats">
<div className="shamin-orders__stat-card shamin-orders__stat-card--cancelled">
<div className="shamin-orders__stat-icon"><FiXCircle/></div>
<div className="shamin-orders__stat-content"><span>لغو شده</span><strong>{shaminStats.cancelled.toLocaleString("fa-IR")}</strong><small>سفارش</small></div>
</div>
<div className="shamin-orders__stat-card shamin-orders__stat-card--completed">
<div className="shamin-orders__stat-icon"><FiCheckCircle/></div>
<div className="shamin-orders__stat-content"><span>تکمیل شده</span><strong>{shaminStats.completed.toLocaleString("fa-IR")}</strong><small>سفارش</small></div>
</div>
<div className="shamin-orders__stat-card shamin-orders__stat-card--shipping">
<div className="shamin-orders__stat-icon"><FiTruck/></div>
<div className="shamin-orders__stat-content"><span>در حال ارسال</span><strong>{shaminStats.shipping.toLocaleString("fa-IR")}</strong><small>سفارش</small></div>
</div>
<div className="shamin-orders__stat-card shamin-orders__stat-card--pending">
<div className="shamin-orders__stat-icon"><FiClock/></div>
<div className="shamin-orders__stat-content"><span>در انتظار پرداخت</span><strong>{shaminStats.pending.toLocaleString("fa-IR")}</strong><small>سفارش</small></div>
</div>
</div>

<div className="shamin-orders__workspace">
<aside className={`shamin-orders__filters ${shaminMobileFilters?"shamin-orders__filters--mobile-open":""}`}>
<div className="shamin-orders__filters-head">
<div><span>جستجو و فیلتر</span><h2>فیلترها</h2></div>
<FiFilter/>
</div>

<div className="shamin-orders__filter-group">
<label>وضعیت سفارش</label>
<div className="shamin-orders__status-options">
{[
{value:"all",label:"همه",count:shaminStats.total},
{value:"completed",label:"تکمیل شده",count:shaminStats.completed},
{value:"shipping",label:"در حال ارسال",count:shaminStats.shipping},
{value:"pending",label:"در انتظار",count:shaminStats.pending},
{value:"cancelled",label:"لغو شده",count:shaminStats.cancelled}
].map(item=>(
<button key={item.value} type="button" className={`shamin-orders__status-option ${shaminStatusFilter===item.value?"shamin-orders__status-option--active":""}`} onClick={()=>shaminChangeFilter(setShaminStatusFilter,item.value)}>
<span className="shamin-orders__checkbox">{shaminStatusFilter===item.value&&<FiCheckCircle/>}</span>
<span>{item.label}</span>
<small>{item.count.toLocaleString("fa-IR")}</small>
</button>
))}
</div>
</div>

<div className="shamin-orders__filter-divider"/>

<div className="shamin-orders__filter-group">
<label><FiCalendar/>بازه زمانی</label>
<button type="button" className="shamin-orders__select">
<span>{shaminDateFilter==="today"?"امروز":shaminDateFilter==="yesterday"?"دیروز":"همه زمان‌ها"}</span>
<FiChevronDown/>
</button>
<div className="shamin-orders__quick-dates">
<button type="button" className={shaminDateFilter==="today"?"shamin-orders__quick-date--active":""} onClick={()=>shaminChangeFilter(setShaminDateFilter,shaminDateFilter==="today"?"all":"today")}>امروز</button>
<button type="button" className={shaminDateFilter==="yesterday"?"shamin-orders__quick-date--active":""} onClick={()=>shaminChangeFilter(setShaminDateFilter,shaminDateFilter==="yesterday"?"all":"yesterday")}>دیروز</button>
</div>
</div>

<div className="shamin-orders__filter-divider"/>

<div className="shamin-orders__filter-group">
<label><FiUsers/>نوع مشتری</label>
<button type="button" className="shamin-orders__select" onClick={()=>shaminChangeFilter(setShaminCustomerFilter,shaminCustomerFilter==="all"?"vip":shaminCustomerFilter==="vip"?"normal":"all")}>
<span>{shaminCustomerFilter==="vip"?"مشتری ویژه":shaminCustomerFilter==="normal"?"مشتری عادی":"همه مشتریان"}</span>
<FiChevronDown/>
</button>
<div className="shamin-orders__customer-switches">
<button type="button" className={shaminCustomerFilter==="vip"?"shamin-orders__customer-switch--active":""} onClick={()=>shaminChangeFilter(setShaminCustomerFilter,shaminCustomerFilter==="vip"?"all":"vip")}>ویژه</button>
<button type="button" className={shaminCustomerFilter==="normal"?"shamin-orders__customer-switch--active":""} onClick={()=>shaminChangeFilter(setShaminCustomerFilter,shaminCustomerFilter==="normal"?"all":"normal")}>عادی</button>
</div>
</div>

<div className="shamin-orders__filter-divider"/>

<div className="shamin-orders__filter-group">
<label><FiDatabase/>مبلغ سفارش</label>
<div className="shamin-orders__price-fields">
<div>
<span>از</span>
<input type="text" value={shaminPriceMin} onChange={event=>{setShaminPriceMin(event.target.value.replace(/[^\d]/g,""));setShaminPage(1);}} placeholder="۰" inputMode="numeric"/>
<small>تومان</small>
</div>
<div>
<span>تا</span>
<input type="text" value={shaminPriceMax} onChange={event=>{setShaminPriceMax(event.target.value.replace(/[^\d]/g,""));setShaminPage(1);}} placeholder="∞" inputMode="numeric"/>
<small>تومان</small>
</div>
</div>
</div>

<button type="button" className="shamin-orders__apply-filter" onClick={()=>setShaminMobileFilters(false)}><FiFilter/>اعمال فیلتر</button>
<button type="button" className="shamin-orders__reset-filter" onClick={shaminResetFilters}><FiRefreshCw/>بازنشانی فیلترها</button>
</aside>

<div className="shamin-orders__orders-panel">
<div className="shamin-orders__mobile-toolbar">
<button type="button" onClick={()=>setShaminMobileFilters(previous=>!previous)}><FiFilter/>فیلترها</button>
</div>

<div className="shamin-orders__table-head">
<div className="shamin-orders__results-count">
<span>سفارش‌ها</span>
<strong>نمایش {shaminFilteredOrders.length.toLocaleString("fa-IR")} مورد</strong>
</div>
<div className="shamin-orders__table-tools">
<div className="shamin-orders__sort">
<span>مرتب‌سازی:</span>
<select value={shaminSort} onChange={event=>shaminChangeFilter(setShaminSort,event.target.value)}>
<option value="newest">جدیدترین</option>
<option value="oldest">قدیمی‌ترین</option>
<option value="amount-high">بیشترین مبلغ</option>
<option value="amount-low">کمترین مبلغ</option>
</select>
<FiChevronDown/>
</div>
</div>
</div>

<div className="shamin-orders__search">
<FiSearch/>
<input type="text" value={shaminSearch} onChange={event=>{setShaminSearch(event.target.value);setShaminPage(1);}} placeholder="جستجو بر اساس شماره سفارش، مشتری یا محصول..."/>
{shaminSearch&&(<button type="button" onClick={()=>setShaminSearch("")} aria-label="پاک کردن جستجو"><FiXCircle/></button>)}
</div>

<div className="shamin-orders__table-wrapper">
<div className="shamin-orders__table">
<div className="shamin-orders__table-header">
<span>شماره سفارش</span><span>مشتری</span><span>محصولات</span><span>مبلغ کل</span><span>وضعیت</span><span>زمان</span><span>عملیات</span>
</div>

{shaminCurrentOrders.length>0?(
shaminCurrentOrders.map(order=>{
const StatusIcon=shaminStatusConfig[order.status].icon;
return(
<div className="shamin-orders__table-row" key={order.id}>
<div className="shamin-orders__order-number">
<button type="button" title="کپی شماره سفارش" onClick={()=>shaminCopyOrder(order.id)}>
<span>#{order.id}</span>
{shaminCopiedOrder===order.id?<FiCheckCircle/>:<FiCopy/>}
</button>
</div>
<div className="shamin-orders__customer">
<div className="shamin-orders__customer-avatar"><FiUsers/></div>
<div><strong>{order.customer}</strong><span>{order.customerType}</span></div>
</div>
<div className="shamin-orders__products">
<div className="shamin-orders__product-images">
{order.products.slice(0,3).map((product,index)=>(
<div className="shamin-orders__product-thumb" key={`${order.id}-${product.name}`}>
<img src={shaminProductImages[index%shaminProductImages.length]} alt=""/>
</div>
))}
{order.productCount>3&&(<span className="shamin-orders__more-products">+{(order.productCount-3).toLocaleString("fa-IR")}</span>)}
</div>
<div className="shamin-orders__product-summary">
<strong>{order.products[0]?.name}</strong>
<span>{order.productCount.toLocaleString("fa-IR")} کالا</span>
</div>
</div>
<div className="shamin-orders__amount">
<strong>{shaminFormatPrice(order.amount)}</strong>
<span>تومان</span>
</div>
<div className={`shamin-orders__status shamin-orders__status--${order.status}`}>
<StatusIcon/>
<span>{order.statusLabel}</span>
</div>
<div className="shamin-orders__time"><FiClock/><span>{order.time}</span></div>
<div className="shamin-orders__actions">
<button type="button" className="shamin-orders__view-button"><FiEye/><span>مشاهده</span></button>
<div className="shamin-orders__more">
<button type="button" className={shaminOpenOrderMenu===order.id?"shamin-orders__more-button--active":""} onClick={()=>setShaminOpenOrderMenu(shaminOpenOrderMenu===order.id?null:order.id)} aria-label="عملیات سفارش"><FiMoreHorizontal/></button>
{shaminOpenOrderMenu===order.id&&(
<div className="shamin-orders__more-menu">
<button type="button"><FiEye/>مشاهده جزئیات</button>
<button type="button"><FiPackage/>پیگیری سفارش</button>
<button type="button"><FiCopy/>کپی شماره سفارش</button>
</div>
)}
</div>
</div>
</div>
);
})
):(
<div className="shamin-orders__empty">
<div className="shamin-orders__empty-icon"><FiShoppingBag/></div>
<strong>سفارشی پیدا نشد</strong>
<span>با تغییر فیلترها یا عبارت جستجو دوباره تلاش کنید.</span>
<button type="button" onClick={shaminResetFilters}><FiRefreshCw/>حذف فیلترها</button>
</div>
)}
</div>
</div>

<div className="shamin-orders__table-footer">
<div className="shamin-orders__pagination-info">
نمایش <strong>{shaminFilteredOrders.length===0?"۰":((shaminPage-1)*shaminRowsPerPage+1).toLocaleString("fa-IR")}</strong> تا <strong>{Math.min(shaminPage*shaminRowsPerPage,shaminFilteredOrders.length).toLocaleString("fa-IR")}</strong> از <strong>{shaminFilteredOrders.length.toLocaleString("fa-IR")}</strong> سفارش
</div>
<div className="shamin-orders__pagination">
<button type="button" disabled={shaminPage===1} onClick={()=>shaminGoToPage(shaminPage-1)} aria-label="صفحه قبل"><FiChevronRight/></button>
{shaminVisiblePages.map(page=>(
<button type="button" key={page} className={shaminPage===page?"shamin-orders__pagination-page--active":""} onClick={()=>shaminGoToPage(page)}>{page.toLocaleString("fa-IR")}</button>
))}
<button type="button" disabled={shaminPage===shaminTotalPages} onClick={()=>shaminGoToPage(shaminPage+1)} aria-label="صفحه بعد"><FiChevronLeft/></button>
</div>
<label className="shamin-orders__rows-count">
<span>نمایش</span>
<select value={shaminRowsPerPage} onChange={event=>{setShaminRowsPerPage(Number(event.target.value));setShaminPage(1);}}>
<option value="6">۶</option>
<option value="8">۸</option>
<option value="10">۱۰</option>
</select>
<FiChevronDown/>
<span>مورد</span>
</label>
</div>
</div>
</div>
</section>
);
}

export default Orders;