const userInput = document.getElementById('user-input');
const searchButton = document.getElementById('search');
const main = document.querySelector('main');
const favoriteMovies = []


// send API call
async function fetchData(userSearch) {
  let searchOutput = [];
  const movieId = [];
  const movieInfo = [];
  const response = await fetch(
    `http://www.omdbapi.com/?s=${userSearch}&type=movie&plot=full&apikey=d63e1fcd`
  );
  const data = await response.json();
  searchOutput = data.Search;
  // console.log(searchOutput);
  searchOutput.forEach((item) => movieId.push(item.imdbID));
  // console.log(movieId)

  // use await and promise.all to loop over all the promises and what ever is needed
  await Promise.all(
    movieId.map(async (item) => {
      const response = await fetch(
        `http://www.omdbapi.com/?i=${item}&type=movie&plot=short&apikey=d63e1fcd`
      );
      const data = await response.json();
      if (data.Poster !== 'N/A' && data.Plot !== 'N/A') {
        movieInfo.push(await data);
      }
    })
  );
  // console.log('Complete Movie info!', movieInfo);
  return movieInfo;
}

// display the info on the dom
function renderData(arr) {
  arr.map((movie) => {
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const img = document.createElement('img')
    const button = document.createElement('button')
    main.append(div)
    div.append(h3)
    h3.textContent = movie.Title
    div.append(img)
    img.setAttribute("src", `${movie.Poster}`)
    div.append(p)
    p.textContent = movie.Plot
    div.append(button)
    button.textContent = 'Add to Favorites!'

    button.addEventListener('click', () => {
      // console.log(movie)
      favoriteMovies.push(movie)
      // console.log(favoriteMovies)
    })
    })

  }


// user searches movie
searchButton.addEventListener('click', async () => {
  main.innerHTML = ''
  // needs await
  renderData(await fetchData(userInput.value));
});

//   todo
// allow users to save the info
// watchlist page
// append the movies from the localstorage and dispaly to them dom
// allow users to remove the list from the item array
