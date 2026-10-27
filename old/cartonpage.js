const noName = 'Без названия'
const commodity = 'Товар'
const defaultImg = '../images/goods1.png';
const soldOutCart= 'Sold out'
function renderProducts(containerSelector,templateSelector,products,limit=products.length){
    const container = document.querySelector(containerSelector);
    const template = document.querySelector(templateSelector)

    if (!container || !template) return;
    template.style.display='none';
    products.slice(0,limit).forEach(product=>{


        const newCard = template.cloneNode(true);
        newCard.classList.remove(templateSelector.replace('.', ''));
        newCard.style.display=''


        const imgElement = newCard.querySelector('img');
        const titleElement = newCard.querySelector('.goods__title, .goods-catalog__title ');
        const priceElement = newCard.querySelector('.goods__price, .goods-catalog__price');
        const discountWrapper = newCard.querySelector('.goods__sale');
        const discountElement = newCard.querySelector('.goods__discount');
        const oldPriceElement = newCard.querySelector('.goods__sale-price, .goods-catalog__sale-price');
        let oldPrice = null;
        if (product.discountPercent > 0) {
            oldPrice = +(product.price / (1 - product.discountPercent / 100)).toFixed(2);
        }
        if (product.itemsInStock === 0) {
            discountElement.textContent = soldOutCart;
            discountWrapper.style.display = 'block';
            discountWrapper.style.width = '63px';
            discountWrapper.style.height = '24px';
            oldPriceElement.style.display = 'none';
        } else if (oldPrice) {
            discountElement.textContent = `- ${product.discountPercent}%`;
            discountWrapper.style.display = 'block';
            oldPriceElement.style.display = 'inline';
            priceElement.innerHTML = `<s class="goods__sale-price">$${oldPrice}</s> $${product.price.toFixed(2)}`;
        } else {
            discountWrapper.style.display = 'none';
            oldPriceElement.style.display = 'none';
            priceElement.textContent = `$${product.price.toFixed(2)}`;
        }
       
        const buttons = newCard.querySelectorAll('.goods__link-icons-first , .goods-catalog__link-icons-catalog-1, .goods-catalog__mobile-button');
        buttons.forEach(btn=>{
            btn.dataset.id = product.id;
            btn.dataset.product=JSON.stringify({
            id: product.id,
            title: product.title,
            price: product.price,
            oldPrice: oldPrice,
            color: product.color,
            size: product.size,
            itemsInStock: product.itemsInStock,
            img: product.cover?.data?.attributes?.url || product.image || defaultImg
            });
        });

        titleElement.textContent = product.title || noName;
        imgElement.src = product.cover?.data?.attributes?.url || product.image || defaultImg;
        imgElement.alt = product.title || commodity;
        
        container.appendChild(newCard);
    });
}
// fetch('https://api.dev.cwe.su/api/products/?populate=*&pagination[limit]=6')
//   .then(res => res.json())
//   .then(data => {
//     const products = data.data;
//     if (document.querySelector('.goods') && document.querySelector('.goods-template')) {
//       renderProducts('.goods', '.goods-template', products);
//     }
//     if (document.querySelector('.goods-catalog') && document.querySelector('.card-template')) {
//       renderProducts('.goods-catalog', '.card-template', products);
//     }

// })
// .catch(err => console.error('fetch error', err));
const API_URL = 'https://api.dev.cwe.su/api/products/?populate=*&pagination[limit]=6';
async function fetchProducts() {
    try{
        const res = await fetch(API_URL)
        const data = await res.json();
        const products = data.data;
        if (document.querySelector('.goods') && document.querySelector('.goods-template')) {
            renderProducts('.goods', '.goods-template', products);
        }
        if (document.querySelector('.goods-catalog') && document.querySelector('.card-template')) {
            renderProducts('.goods-catalog', '.card-template', products);
        }

    }catch(err){
        console.error('fetch error',err);

    }
    
}
fetchProducts()