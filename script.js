const search = document.querySelector('.searchbar');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const settingsIcon = document.querySelector('.settings-icon');
const settingsPanel = document.querySelector('.settings');
const preSearch = '> ';
const searchUrl = 'https://www.google.com.ph/search?q='

const typeHandler = () => search.value = search.value.includes(preSearch) ? search.value : `${preSearch}`;

const searchHandler = () => {
  const query = search.value.split(preSearch)[1].replace(' ', '+');
  window.location.replace(`${searchUrl + query}`);
};

const searchInit = () => {
  search.value = preSearch;
  search.focus();
  search.addEventListener('input', typeHandler);
  search.addEventListener('change', searchHandler);
};

const dateTimeInit = () => {
  const now = new Date();
  date.innerText = now.toJSON().slice(0,10);
  time.innerText = `${now.getHours()}:${now.getMinutes()}`
};

const settingsIconInit = () => {
  settingsIcon.addEventListener('click', () => {
    settingsPanel.classList.toggle('visible');
    settingsIcon.classList.toggle('visible');
    searchInit();
  })
}

(() => {
  searchInit();
  dateTimeInit();
  settingsIconInit();
})()
