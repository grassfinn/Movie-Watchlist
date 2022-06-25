
const userInput = document.getElementById('user-input')
const search = document.getElementById('search')
const apiCall = fetch('http://www.omdbapi.com/?s=Blade+Runner&type=movie&plot=full&apikey=d63e1fcd')

function renderSearch(data) {
  const main = document.querySelector('main')
      data.Search.forEach((item, index) => {
    
        main.innerHTML += `<h3>${item.Title}</h3>
        <img class="poster" src="${item.Poster}">
        <button>Add to Favorites</button>
        `
      })
    };


apiCall
  .then(res => res.json())
  .then(data => {
    console.log(data)
    renderSearch(data)
  })



//   todo
// user searches movie or show 
// send API call
// display the info on the dom
// allow users to save the info
// watchlist page
// append the movies from the localstorage and dispaly to them dom
// allow users to remove the list from the item array