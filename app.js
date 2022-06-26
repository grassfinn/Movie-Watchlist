const userInput = document.getElementById('user-input');
const searchButton = document.getElementById('search');
const apiCall = fetch(
  'http://www.omdbapi.com/?s=Blade+Runner&type=movie&plot=full&apikey=d63e1fcd'
);

function fetchData(userSearch) {
  const movieId = [];
  const movieData = [];
  const apiCall = fetch(
    `http://www.omdbapi.com/?s=${userSearch}&type=movie&plot=full&apikey=d63e1fcd`
  );
  // fetch the info that the user searches with the API search query
  apiCall
    // turn into json
    .then((res) => res.json())
    .then((data) => {
      // push the ID of the item into the movieId Array
      data.Search.forEach((item) => {
        movieId.push(item.imdbID);
      });
      // then for each id call the api again so you can access more info on the film
      movieId.forEach((id) => {
        fetch(
          `http://www.omdbapi.com/?i=${id}&type=movie&plot=full&r=json&apikey=d63e1fcd`
        )
          .then((res) => res.json())
          .then((data) => {
            movieData.push(data);
            if (movieData.length >= 10) {
              console.log(movieData);
            }
          });
      });
    });
}

function renderData() {
  const main = document.querySelector('main');

  // main.innerHTML += `<h3>${item.Title}</h3>
  // <img class="poster" src="${item.Poster}">
  // <button>Add to Favorites</button>
  // `
}

searchButton.addEventListener('click', () => {
  fetchData(userInput.value);
});


//   todo
// user searches movie or show
// send API call
// display the info on the dom
// allow users to save the info
// watchlist page
// append the movies from the localstorage and dispaly to them dom
// allow users to remove the list from the item array
