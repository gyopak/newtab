const search = document.querySelector('.searchbar');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const settingsIcon = document.querySelector('.settings-icon');
const settingsPanel = document.querySelector('.settings');
const preSearch = '> ';
const links = {};

const db = () => JSON.parse(localStorage.getItem('links'));
const getLink = (key) => db()[key];

const setLink = (key, value) => {
  links[key] = value;
  localStorage.setItem('links', JSON.stringify(links));
  updateQuickLinks();
}

const typeHandler = () => search.value = search.value.includes(preSearch) ? search.value : `${preSearch}`;

const searchHandler = () => {
  let rawSearchValue = search.value.split(preSearch)[1];
  const searchUrl = getLink(rawSearchValue.split(' ')[0])
  if (searchUrl) {
    rawSearchValue = rawSearchValue.replace(rawSearchValue.split(' ')[0], '').trim();
    window.location.replace(`${searchUrl + rawSearchValue.replace(' ', '+')}`);
  } else {
    window.location.replace(`${getLink('go') + rawSearchValue}`);
  }
};

const searchInit = () => {
  search.value = preSearch;
  search.focus();
  search.addEventListener('input', typeHandler);
  search.addEventListener('change', searchHandler);
};

const dateTimeInit = () => {
  const now = new Date();
  const hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
  const minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
  date.innerText = now.toJSON().slice(0,10);
  time.innerText = `${hours} : ${minutes}`
};

const settingsInit = () => {
  settingsIcon.addEventListener('click', () => {
    settingsPanel.classList.toggle('visible');
    settingsIcon.classList.toggle('visible');
    searchInit();
  })
}

const storageInit = (forced=false) => {
  const links = JSON.parse(localStorage.getItem('links'));
  if (!links || forced) {
    localStorage.clear();
    localStorage.setItem('links', {});
    setLink('go', 'https://www.google.com.ph/search?q=');
    setLink('gh', 'https://github.com/search?q=');
    setLink('yt', 'https://www.youtube.com/results?search_query=');
    setLink('mdn', 'https://developer.mozilla.org/hu/search?q=');
  }
}

const updateQuickLinks = () => {
  while(settingsPanel.firstChild){
      settingsPanel.removeChild(settingsPanel.firstChild)
  }
  const title = document.createElement('p');
  title.innerText = 'quick links';
  title.classList = 'tagname';
  settingsPanel.appendChild(title);
  Object.entries(db()).forEach(link => {
    const tempLink = document.createElement('div');
    tempLink.classList = 'quicklink';
    const key = document.createElement('input');
    key.classList = 'key';
    key.value = link[0];
    const value = document.createElement('input');
    value.classList = 'value'
    value.value = link[1];
    tempLink.appendChild(key);
    tempLink.appendChild(value);
    settingsPanel.appendChild(tempLink);
  })
}

(() => {
  searchInit();
  dateTimeInit();
  settingsInit();
  storageInit();
  updateQuickLinks();
})()
