const search = document.querySelector('.searchbar')
const preSearch = '$ ';
const searchUrl = 'https://www.google.com.ph/search?q='

const typeHandler = () => search.value = search.value.includes(preSearch) ? search.value : `${preSearch}`;

const searchHandler = () => {
    const query = search.value.split(preSearch)[1].replace(' ', '+');
    window.location.replace(`${searchUrl + query}`);
}

(() => {
  search.value = preSearch;
  search.focus();
  search.addEventListener('input', typeHandler);
  search.addEventListener('change', searchHandler);
})()
