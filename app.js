import { fetchData } from './utils.js';

// https://stackoverflow.com/questions/69346491/how-do-i-use-array-each-with-async-await
const userInput = document.getElementById('user-input');
const searchButton = document.getElementById('search');
const main = document.querySelector('main');
let favoriteMovies = [];

// display the info on the dom
function renderData(arr) {
  arr.map((movie) => {
    const article = document.createElement('article');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    // const p2 = document.createElement('p')
    const span = document.createElement('span');
    const img = document.createElement('img');
    const button = document.createElement('button');
    const hr = document.createElement('hr');
    main.append(article);

    article.appendChild(div);
    article.setAttribute('class', 'movie-card');
    article.append(img);
    div.append(h3);
    // div.append(p2)
    // div.append(span)
    div.append(p);
    div.setAttribute('class', 'movie-info');
    h3.innerHTML = `${movie.Title} <span>${movie.Ratings[0].Value}</span>`;
    img.setAttribute('src', `${movie.Poster}`);
    // p2.innerHTML = `${movie.Runtime} <span>${movie.Ratings[0].Value}</span>`
    p.textContent = movie.Plot;
    // span.textContent = movie.Ratings[0].Value
    div.append(button);
    button.textContent = 'Add to Favorites!';
    button.setAttribute('class', 'add');
    main.append(hr);
    button.addEventListener('click', () => {
      favoriteMovies.push(movie);
      localStorage.setItem('Favorite Movies', JSON.stringify(favoriteMovies));
    });
  });
}

// User clicks the remove button
// filter through the array and delete the item that is === to the clicked it
// remove the that item from the local storage
// remove item and render the local storage array

// user searches movie
searchButton.addEventListener('click', async () => {
  main.innerHTML = '';
  // needs await
  renderData(await fetchData(userInput.value));
});

// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
userInput.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    main.innerHTML = '';
    renderData(await fetchData(userInput.value));
  }
});


//   todo
// allow users to save the info
// watchlist page
// append the movies from the localstorage and dispaly to them dom
// allow users to remove the list from the item array

export default favoriteMovies;
