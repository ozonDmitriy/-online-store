const cartBasket = document.querySelector('.header__logo-shoping-cart--button');
const basket = document.querySelector('.header__basket');
const closeIcon = document.querySelector('.backtopage'); 
const overlay = document.querySelector('.overlay')
const active = 'active'
const milliseconds = 1000
const mobileWindowWidth = 381
const addToBag = `Added to your Shopping bag.`
const errorToBag = 'This item is out of stock!'
const typeShowBannerEr = 'error'
const typeShowBannerSuc = 'succes'
const LOCAL_STORAGE_CART_KEY = 'cart';
import successIcon from '../images/iconsuccess.svg';
import errorIcon from '../images/icon-error.svg';
closeIcon.addEventListener('click', () => {
    basket.classList.remove(active); 
    overlay.classList.remove(active);
    document.body.classList.remove('body--no-scroll'); 
});

function showBanner(message, type ='succes') {
    let banner = document.querySelector('.header__message');
    const messageTitle=document.querySelector('.header__message-title')
    const icon = banner.querySelector('.header__message-res');
    messageTitle.textContent = message;
    icon.src = type === 'error' ? errorIcon : successIcon;
    banner.classList.add(active);

    setTimeout(() => banner.classList.remove(active), milliseconds); 
}

cartBasket.addEventListener('click', (e) => {
    e.preventDefault();
    
    basket.classList.toggle(active);
    overlay.classList.toggle(active,basket.classList.contains(active));
    document.body.classList.toggle('body--no-scroll', basket.classList.contains(active));
});

const basketContainer = document.querySelector('.header__basket');
const basketTemplate = document.querySelector('.header__basket-conteiner.template');

let cart = [];

try {
  const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
} catch (error) {
  console.warn('Ошибка чтения корзины из localStorage:', error);
  cart = [];
}

function addToCart(product) {

    if (!product || !product.id) return;
    
    const existing = cart.find(item => item.id === parseInt(product.id));
    if (existing) {
        if (existing.itemsInStock > 0) {
            existing.count += 1;
            existing.itemsInStock -= 1;

        } else {
            showBanner(errorToBag  , typeShowBannerSuc);
            return;
        }
    } else {
        if (product.itemsInStock <= 0) {
            showBanner(errorToBag  , typeShowBannerEr);
            return;
        }
    
        cart.push({
            id: product.id,
            count: 1,
            title: product.title,
            price: product.price,
            color:product.color,
            size:product.size,
            oldPrice: product.oldPrice || null,
            itemsInStock: product.itemsInStock-1,
            img: product.img
        });
    }

    document.querySelectorAll(`[data-id="${product.id}"]`).forEach(btn => {
        const data = JSON.parse(btn.dataset.product);
        data.itemsInStock = Math.max(0, data.itemsInStock - 1);
        btn.dataset.product = JSON.stringify(data);
    });

    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));

    renderCart();
    syncCartIcons();
    updateShopCount();
}

function upDateImg(img){
    const imageScale= 0.7;
    const BASE_IMAGE_Width = 172;
    const BASE_IMAGE_Height = 136;
    if (!img) return;
    if (window.innerWidth<=mobileWindowWidth ){
        img.width = BASE_IMAGE_Width * imageScale;
        img.height= BASE_IMAGE_Height*imageScale;
    }
    else{
        img.width = BASE_IMAGE_Width;
        img.height = BASE_IMAGE_Height;
    }
}

function updateShopCount() {
    const shopCount = document.querySelector('.header__shop-count');
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
    if (shopCount) shopCount.textContent = totalCount;
}

function upDateCountCart(){
    const counterItems = document.querySelector('.header__basket-count');
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
    if(counterItems) counterItems.textContent = `${totalCount} items`;
}
        
function upDateSubTotal(){
    const subTotal = document.querySelector('.header__basket-totalCount')
    const subTotalItems= cart.reduce((sum,item)=>sum+item.count,0);
    if (subTotal) subTotal.textContent= `Subtotal (${subTotalItems} items)`;
}
function upDateCost(){
    const subCost = document.querySelector('.header__basket-totalCost')
    const subTotalCost= cart.reduce((sum,item)=>sum+item.price*item.count,0 )
    if (subCost) subCost.textContent= `$ ${subTotalCost}.00 `;
}

function renderCart() {
    const itemsContainer = document.querySelector('.header__basket-items'); 
    itemsContainer.innerHTML = ''; 
    syncCartIcons()
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p class="empty-cart">Oops, your cart is empty.<a href="/" class="empty-link">Click here</a> to refill.</p>';
        updateShopCount()
        return;
    }
    const maxCharacterlength = 15;
    cart.forEach(item => {
        const newCard = basketTemplate.cloneNode(true); 
        newCard.classList.remove('template'); 
        newCard.style.display = 'flex'; 

        let title = item.title;
        
        if (title.length > maxCharacterlength ) {
            title = title.slice(0, maxCharacterlength ) + '...';
        }

        newCard.querySelector('.header__basket-title').textContent = title;
        const costElement = newCard.querySelector('.header__basket-cost');
        if (item.oldPrice && item.oldPrice > item.price) {
            costElement.innerHTML = `<s class="old-price">$${item.oldPrice.toFixed(2)}</s> $${item.price.toFixed(2)}`;
        } else {
            costElement.textContent = `$${item.price.toFixed(2)}`;
        }
        
        newCard.querySelector('.header__backet-cart').src = item.img;
        newCard.querySelector('.header__basket-color').textContent = `${item.color} / ${item.size}`;
        newCard.querySelector('.header__basket-counter-name-count').textContent = item.count;
        const img = newCard.querySelector('.header__backet-cart');
        upDateImg(img);
        img.style.objectFit = 'cover';
        updateShopCount()

        const countE = newCard.querySelector('.header__basket-counter-name-count')
        countE.textContent=item.count
        const removeBtn = newCard.querySelector('.header__basket-close img');

        const plusBtn = newCard.querySelector('.header__basket-counter-name-plus');
        plusBtn.addEventListener('click', () => {
            if (+(item.itemsInStock)>0){
                item.itemsInStock-=1;
                item.count += 1;

                if (item.itemsInStock<0){
                    showBanner(errorToBag , typeShowBannerEr)
                }
            }
            else{
                showBanner(errorToBag  , typeShowBannerEr)
            }

            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
            countE.textContent = item.count;
            updateShopCount();
            upDateCountCart();
            upDateSubTotal();
            upDateCost();
        });

        const minusBtn = newCard.querySelector('.header__basket-counter-name-minus');
        minusBtn.addEventListener('click', () => {
            if (item.count>1){
                item.itemsInStock+=1
                item.count -= 1;
            }else{
                const updatedStock = item.itemsInStock + 1;
                cart = cart.filter(c => c.id !== item.id);
                item.itemsInStock = updatedStock;
                document.querySelectorAll(`[data-id="${item.id}"]`).forEach(btn => {
                    const data = JSON.parse(btn.dataset.product);
                    data.itemsInStock = updatedStock;
                    btn.dataset.product = JSON.stringify(data);
                });
            }
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
            countE.textContent = item.count;
            renderCart();
            upDateCountCart();
            upDateSubTotal();
            upDateCost();
            syncCartIcons()
        });

        const counterItems = document.querySelector('.header__basket-count');
        const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
        if(counterItems) counterItems.textContent = `${totalCount} items`;

        const subTotal = document.querySelector('.header__basket-totalCount')
        const subTotalItems= cart.reduce((sum,item)=>sum+item.count,0);
        if (subTotal) subTotal.textContent= `Subtotal (${subTotalItems} items)`;

        const subCost = document.querySelector('.header__basket-totalCost')
        const subTotalCost= cart.reduce((sum,item)=>sum+item.price*item.count,0 )
        if (subCost) subCost.textContent= `$ ${subTotalCost}.00 `;

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                const updatedStock = item.itemsInStock + item.count;
                item.itemsInStock = updatedStock;
                cart = cart.filter(c => c.id !== item.id);
                localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
                renderCart();
                upDateCountCart();
                updateShopCount()
                upDateSubTotal();
                upDateCost();
                syncCartIcons()
                document.querySelectorAll(`[data-id="${item.id}"]`).forEach(btn => {
                    const data = JSON.parse(btn.dataset.product);
                    data.itemsInStock = updatedStock;
                    btn.dataset.product = JSON.stringify(data);
                });
            });
        }
       
        itemsContainer.appendChild(newCard);
        syncCartIcons()
    });
}

window.addEventListener('resize', () => {
    const allImages = document.querySelectorAll('.header__backet-cart');
    allImages.forEach(img => upDateImg(img));
});

function setupAddToCart(containerSelector, buttonSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.addEventListener('click', (event) => {
        const addButton = event.target.closest(buttonSelector);
        if (!addButton) return;

        event.preventDefault();
        const isActive = addButton.classList.contains(active);

        if (!isActive) {
            addButton.classList.add(active);
            const productData = addButton.dataset.product;
            if (!productData) return;

            const product = JSON.parse(productData);

            if ( +(product.itemsInStock) > 0) {
                showBanner(addToBag ,typeShowBannerSuc);
                addToCart(product);

                product.itemsInStock -= 1;
                localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart)); 
                syncCartIcons();
            } else {
                syncCartIcons()
                showBanner(errorToBag , typeShowBannerEr);
                syncCartIcons()
                return;
            }
        }else{
            basket.classList.add(active);
            overlay.classList.toggle(active);
        }
    });
}

basket.addEventListener('click', (e) => e.stopPropagation());
document.addEventListener('click', (e) => {
    const isClickInsideBasket = basket.contains(e.target);
    const isClickOnCartButton = cartBasket.contains(e.target);
    const isClickOnAddButton = !e.target.closest('.goods__link-icons-first, .goods-catalog__mobile-button, .goods-catalog__link-icons-catalog-1');
  if (!isClickInsideBasket && !isClickOnCartButton &  isClickOnAddButton ) {

    basket.classList.remove(active);
    overlay.classList.remove(active);
    document.body.classList.remove('body--no-scroll');
  }
});

function syncCartIcons() {
  const cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]');
  const buttons = [
    ...document.querySelectorAll('.goods__link-icons-first'),
    ...document.querySelectorAll('.goods-catalog__link-icons-catalog-1')
  ];

  buttons.forEach(btn => {
    const id = btn.dataset.id;
    const inCart = cart.some(item => String(item.id) === String(id));
    btn.classList.toggle(active, inCart);
  });
}

function observeCartButtons() {
    const observer = new MutationObserver((mutations) => {
        let needSync = false;
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { 
                    if (node.matches('.goods__link-icons-first, .goods-catalog__link-icons-catalog-1') ||
                        node.querySelector('.goods__link-icons-first, .goods-catalog__link-icons-catalog-1')) {
                        needSync = true;
                    }
                }
            });
        });
        if (needSync) {
            syncCartIcons();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

window.addEventListener('DOMContentLoaded', () => {
    syncCartIcons(); 
    observeCartButtons(); 
});

setupAddToCart('.goods-catalog', '.goods-catalog__link-icons-catalog-1');
setupAddToCart('.goods', '.goods-catalog__mobile-button'); 
setupAddToCart('.goods-catalog', '.goods-catalog__mobile-button');
setupAddToCart('.goods', '.goods__link-icons-first'); 
updateShopCount();

renderCart(); 
syncCartIcons();
