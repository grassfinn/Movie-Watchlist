import favoriteMovies from './app.js'
// send API call
async function fetchData(userSearch) {
  let searchOutput = [];
  const movieId = [];
  const movieInfo = [];
  const response = await fetch(
    `https://www.omdbapi.com/?s=${userSearch}&type=movie&plot=full&apikey=d63e1fcd`
  );
  const data = await response.json();
  searchOutput = data.Search;
  searchOutput.forEach((item) => movieId.push(item.imdbID));

  // use await and promise.all to loop over all the promises and what ever is needed
  await Promise.all(
    movieId.map(async (item) => {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${item}&type=movie&plot=short&apikey=d63e1fcd`
      );
      const data = await response.json();
      if (
        data.Poster !== 'N/A' &&
        data.Plot !== 'N/A' &&
        data.Ratings.length !== 0
      ) {
        movieInfo.push(await data);
      }
    })
  );
  console.log(movieInfo);
  return movieInfo;
}




export {fetchData}