const favouriteButton = document.getElementById('favourite');
if (localStorage.getItem('is-favourite') === 'true') favouriteButton.classList.add('btn--selected');
favouriteButton.onclick = () => {
    if (localStorage.getItem('is-favourite') === 'true') localStorage.removeItem('is-favourite');
    else localStorage.setItem('is-favourite', true);
    window.location.reload();
}

const fiveStarsButton = document.getElementById('five-stars');
if (localStorage.getItem('is-five-stars') === 'true') fiveStarsButton.classList.add('btn--selected');
fiveStarsButton.onclick = () => {
    if (localStorage.getItem('is-five-stars') === 'true') localStorage.removeItem('is-five-stars');
    else localStorage.setItem('is-five-stars', true);
    window.location.reload();
}

const starsDescButton = document.getElementById('star-sort-desc');
if (!localStorage.getItem('sort') || localStorage.getItem('sort') === 'star-sort-desc') starsDescButton.classList.add('btn--selected');
starsDescButton.onclick = () => {
    localStorage.setItem('sort', 'star-sort-desc');
    window.location.reload();
}
const starsAscButton = document.getElementById('star-sort-asc');
if (localStorage.getItem('sort') === 'star-sort-asc') starsAscButton.classList.add('btn--selected');
starsAscButton.onclick = () => {
    localStorage.setItem('sort', 'star-sort-asc');
    window.location.reload();
}
const priceDescButton = document.getElementById('price-sort-desc');
if (localStorage.getItem('sort') === 'price-sort-desc') priceDescButton.classList.add('btn--selected');
priceDescButton.onclick = () => {
    localStorage.setItem('sort', 'price-sort-desc');
    window.location.reload();
}
const priceAscButton = document.getElementById('price-sort-asc');
if (localStorage.getItem('sort') === 'price-sort-asc') priceAscButton.classList.add('btn--selected');
priceAscButton.onclick = () => {
    localStorage.setItem('sort', 'price-sort-asc');
    window.location.reload();
}