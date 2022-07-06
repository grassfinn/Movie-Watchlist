// https://stackoverflow.com/questions/69346491/how-do-i-use-array-each-with-async-await
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
  searchOutput.forEach((item) => movieId.push(item.imdbID));

  // use await and promise.all to loop over all the promises and what ever is needed
  await Promise.all(
    movieId.map(async (item) => {
      const response = await fetch(
        `http://www.omdbapi.com/?i=${item}&type=movie&plot=short&apikey=d63e1fcd`
      );
      const data = await response.json();
      if (data.Poster !== 'N/A' && data.Plot !== 'N/A' && data.Ratings.length !== 0) {
        movieInfo.push(await data);
      }
    })
  );
  console.log(movieInfo)
  return movieInfo;
}

// display the info on the dom
function renderData(arr) {
  arr.map((movie) => {
    const article = document.createElement('article')
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const p2 = document.createElement('p')
    const span = document.createElement('span')
    const img = document.createElement('img')
    const button = document.createElement('button')
    main.append(article)
    article.appendChild(div)
    article.setAttribute("class", "movie-card")
    article.append(img)
    div.append(h3)
    div.append(p2)
    // div.append(span)
    div.append(p)
    div.setAttribute('class', 'movie-info')
    h3.textContent = movie.Title
    img.setAttribute("src", `${movie.Poster}`)
    p2.innerHTML = `${movie.Runtime} <span>${movie.Ratings[0].Value}</span>`
    p.textContent = movie.Plot
    // span.textContent = movie.Ratings[0].Value
    div.append(button)
    button.textContent = 'Add to Favorites!'

    button.addEventListener('click', () => {
      favoriteMovies.push(movie)
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
