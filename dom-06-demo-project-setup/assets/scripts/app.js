const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];

const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text')

const movie = []

const updateUI = () => {
  if (movie.length === 0 ) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
}

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for ( const movieItem of movie ) {
    if ( movieItem.id === movieId ){
      break;
    }
    movieIndex++;
  }
  movie.splice(movieIndex, 1)
  const listRoot = document.getElementById('movie-list')
  listRoot.children[movieIndex].remove();
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = 'movie-element'
  newMovieElement.innerHTML = `
    <div class='movie-element__image'>
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div>
      <h2>${title}</h2>
      <p>${rating}/5</p>
    </div>
  `
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
  const listRoot = document.getElementById('movie-list')
  listRoot.append(newMovieElement)
}

const clearMovieInput = () => {
  for (const userInput of userInputs){
    userInput.value = ''
  }
}

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
  // addMovieModal.className = 'modal visible'
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
      titleValue.trim() === "" ||
      imageUrlValue.trim() === "" ||
      ratingValue.trim() === "" ||
      +ratingValue < 1 ||
      +ratingValue > 5
    ) {
        alert('Please enter valid value (rating is must more than 1 less than 5.)')
        return
    }

    const newMovie = {
      id: Math.random().toString(),
      title: titleValue,
      image: imageUrlValue,
      rating: ratingValue
    }
    movie.push(newMovie)
    console.log(movie)
    toggleMovieModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
