const content = document.getElementsByClassName('grid__row-wrap')[0];
const categoryItems = document.getElementsByClassName('category-item');
const favourites = localStorage.getItem('favourites') ? localStorage.getItem('favourites').split(',') : [];

const insertItem = (element) => {
    const item = document.createElement('div');
    item.classList.add('grid__colum-2-4');

    const product = document.createElement('div');
    product.classList.add('home-product-item');

    const productImage = document.createElement('div');
    productImage.classList.add('home-product-item__img');
    productImage.style.backgroundImage = `url(${element.backgroundImage})`;

    const productName = document.createElement('h4');
    productName.classList.add('home-product-item__name');
    productName.innerText = element.name;

    const productPrice = document.createElement('div');
    productPrice.classList.add('home-product-item__price');

    const productPriceOld = document.createElement('span');
    productPriceOld.classList.add('home-product-item__price-old');
    productPriceOld.innerText = `${element.priceOld} ₽`;

    const productPriceCurrent = document.createElement('span');
    productPriceCurrent.classList.add('home-product-item__price-current');
    productPriceCurrent.innerText = `${Math.floor(element.priceOld - element.priceOld * element.saleOffPercent / 100)} ₽`;

    productPrice.appendChild(productPriceOld);
    productPrice.appendChild(productPriceCurrent);

    const productAction = document.createElement('div');
    productAction.classList.add('home-product-item__action');

    const productLike = document.createElement('span');
    productLike.classList.add('home-product-item__like');
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('fa-heart');
    productLike.appendChild(likeIcon);

    if (favourites.includes(element.name)) {
        likeIcon.classList.add('home-product-item__like-liked');
        likeIcon.classList.add('fa-solid');
        likeIcon.classList.add('fa-beat');
    }
    else {
        likeIcon.classList.add('fa-regular');
        likeIcon.classList.add('fa-beat-fade');
    }

    productLike.onclick = () => {
        if (favourites.includes(element.name)) favourites.splice(favourites.indexOf(element.name), 1);
        else favourites.push(element.name);
        localStorage.setItem('favourites', favourites);
        likeIcon.classList.toggle('home-product-item__like-liked');
        likeIcon.classList.toggle('fa-regular');
        likeIcon.classList.toggle('fa-solid');
    }

    const productRating = document.createElement('div');
    productRating.classList.add('home-product-item__rating');
    for (let i = 0; i < 5; ++i) {
        const starIcon = document.createElement('i');
        if (i < element.stars) {
            starIcon.classList.add('fa-solid');
            starIcon.classList.add('fa-shake');
            starIcon.classList.add('home-product-item__rating-filled');
        }
        else starIcon.classList.add('fa-regular');
        starIcon.classList.add('fa-star');
        productRating.appendChild(starIcon);
    }
    productAction.appendChild(productLike);
    productAction.appendChild(productRating);

    const productOrigin = document.createElement('div');
    productOrigin.classList.add('home-product-item__origin');

    const productBrand = document.createElement('span');
    productBrand.classList.add('home-product-item__brand');
    productBrand.innerText = `${element.brand}`;

    const productOriginName = document.createElement('span');
    productOriginName.classList.add('home-product-item__origin-name');
    productOriginName.innerText = `${element.originName}`;

    productOrigin.appendChild(productBrand);
    productOrigin.appendChild(productOriginName);

    const productFavourite = document.createElement('div');
    productFavourite.classList.add('home-product-item__favourite');
    productFavourite.innerText = 'like';
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa-solid');
    checkIcon.classList.add('fa-check');
    productFavourite.appendChild(checkIcon);

    const productSaleOff = document.createElement('div');
    productSaleOff.classList.add('home-product-item__sale-off');

    const productSaleOffPercent = document.createElement('span');
    productSaleOffPercent.classList.add('home-product-item__sale-off-percent');
    productSaleOffPercent.innerHTML = `${element.saleOffPercent}%`;

    const productSaleOffLabel = document.createElement('span');
    productSaleOffLabel.classList.add('home-product-item__sale-off-label');
    productSaleOffLabel.innerHTML = 'скидка';

    productSaleOff.appendChild(productSaleOffPercent);
    productSaleOff.appendChild(productSaleOffLabel);

    product.appendChild(productImage);
    product.appendChild(productName);
    product.appendChild(productPrice);
    product.appendChild(productAction);
    product.appendChild(productOrigin);
    product.appendChild(productFavourite);
    if (element.saleOffPercent) product.appendChild(productSaleOff);

    item.appendChild(product);
    content.appendChild(item);

    const modal = document.getElementById("item-modal");
    const image = document.getElementById("item-modal-content");
    const captionText = document.getElementById("item-modal-caption");
    image.onclick = (event) => {
        event.stopPropagation();
    }
    modal.onclick = () => {
        modal.style.display = "none";
    }

    item.onclick = () => {
        modal.style.display = "block";
        image.src = element.backgroundImage;
        captionText.innerHTML = element.name;
    }
}
for (let i = 0; i < categoryItems.length; ++i) {
    const item = categoryItems[i];
    item.onclick = () => {
        localStorage.setItem('category', item.innerText.toLowerCase());
    }
}

window.onload = () => {
    items.filter(element => !localStorage.getItem('category') 
                            || localStorage.getItem('category') === 'всем'
                            || element.tags.includes(localStorage.getItem('category')))
        .filter(element => !localStorage.getItem('is-favourite') || favourites.includes(element.name))
        .filter(element => !localStorage.getItem('is-five-stars') || element.stars === 5)
        .toSorted((a, b) => {
            switch (localStorage.getItem('sort')) {
                case 'star-sort-desc':
                    return b.stars - a.stars;
                case 'star-sort-asc':
                    return a.stars - b.stars;
                case 'price-sort-desc':
                    return b.priceCurrent - a.priceCurrent;
                case 'price-sort-asc':
                    return a.priceCurrent - b.priceCurrent;
                default:    
                    return b.stars - a.stars;
            }
        }) 
        .forEach(element => insertItem(element));
    for (let i = 0; i < categoryItems.length; ++i) {
        const item = categoryItems[i];
        if (item.innerText.toLowerCase() === localStorage.getItem('category')) {
            item.style.fontWeight = 'bold';
        }
    }
    if (!localStorage.getItem('category')) {
        categoryItems[0].style.fontWeight = 'bold';
    }
}   

