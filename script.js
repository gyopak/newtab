const search = document.querySelector('.searchbar')
const preSearch = '$ ';

const typeHandler = (event) => {
    console.log(event);
    search.value = search.value.includes(preSearch) ? search.value : `${preSearch}`;
}

(() => {
  search.value = preSearch;
  search.focus();
  search.addEventListener('input', typeHandler);
})()
