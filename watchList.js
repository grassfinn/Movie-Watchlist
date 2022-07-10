const main = document.querySelector('main');
let favoriteMovies = [];

// parse converts string to obj stringify turns into a string
// turn local storage into obj

// check if readLaterLocalStorage is truthy on site load/refresh
function displayStorage() {
  let readLaterLocalStorage = JSON.parse(
    localStorage.getItem('Favorite Movies')
  );
  if (readLaterLocalStorage) {
    // set readLater to its value and call renderList()
    favoriteMovies = readLaterLocalStorage;
    // render the items based upon the array
    renderLocalStorage(favoriteMovies);
  }
}

displayStorage()

function renderLocalStorage(arr) {
  arr.map((movie, index) => {
    const movieIndex = favoriteMovies.indexOf(movie);
    const article = document.createElement('article');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const img = document.createElement('img');
    const button = document.createElement('button');
    const hr = document.createElement('hr');
    
    main.append(article);
    article.append(div);
    article.append(hr)
    article.setAttribute('id', index);
    div.append(img);
    div.append(div2);
    div.append(div3);
    div3.append(h3);
    div3.append(p);
    div2.append(img)
    div3.setAttribute('class', 'movie-info');
    h3.innerHTML = `${movie.Title} <span>${movie.Ratings[0].Value}</span>`;
    img.setAttribute('class', 'movie-poster')
    img.setAttribute('src', `${movie.Poster}`);
    p.textContent = movie.Plot;
    article.append(button);
    button.textContent = 'Remove Movie';
    button.setAttribute('class', ('remove'))
    article.append(hr);
    button.addEventListener('click', () => {
      document.getElementById(index).remove();
      favoriteMovies.splice(movieIndex, 1);
      console.log(movieIndex, movie);
      localStorage.setItem('Favorite Movies', JSON.stringify(favoriteMovies));
      console.log(favoriteMovies);
    });
  });
}

// User clicks the remove button
// filter through the array and delete the item that is === to the clicked it
// remove the that item from the local storage
// remove item and render the local storage array

