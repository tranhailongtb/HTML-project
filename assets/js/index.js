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

