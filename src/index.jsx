import { render, Component } from 'preact';
import { useState } from 'preact/hooks';

import './style.css';

import deleteIcon from './assets/delete.png';
import starIcon from './assets/star.png';

export function App() {
	return (
        <MovieApplication />
	);
}

function MovieApplication() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', grade: '' });

    const addMovie = (title, grade) => {
        const newMovie = { title, grade };
        setMovies([...movies, newMovie]);
    };

    const deleteMovie = (title) => {
        setMovies(movies.filter(movie => movie.title !== title));
    };

    const sortByAlphabetic = () => {
        // We cannot mutate an array first so we need to duplicate it first
        // to trigger a re-render
        let sortedMovies = [...movies];

        // sort by name taken from example at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        sortedMovies.sort((a, b) => {
          const titleA = a.title.toUpperCase(); // ignore upper and lowercase
          const titleB = b.title.toUpperCase(); // ignore upper and lowercase

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }

          return 0;
        });
        
        setMovies(sortedMovies);
    };

    const sortByGrade = () => {
        let sortedMovies = [...movies];

        sortedMovies.sort((a, b) => a.grade - b.grade);
        setMovies(sortedMovies);
    };

    return (
        <div class="container">
            <h1>Min filmlista</h1>

            <AddMovieForm addMovie={addMovie} />

            <hr />

            <h2>Filmer</h2>

            <Movies movies={movies} deleteMovie={deleteMovie} />

            <OrderByAlphaButton sortByAlphabetic={sortByAlphabetic} />
            <OrderByGradeButton sortByGrade={sortByGrade} />
        </div>
    );
}

function AddMovieForm({ addMovie }) {
    const [title, setTitle] = useState("");
    const [grade, setGrade] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");
        const grade = formData.get("grade");

        if(typeof title === "string" && title !== "" && grade !== "0") {
            addMovie(title, grade);
            e.currentTarget.reset();
        } 
        else if (title === "") {
            alert("Du måste ange en titel för att kunna spara filmen");
        } 
        else if(grade === "0") {
            alert("Du måste ange ett betyg för att kunna spara filmen");
        } 
    };

    return (
        <form onSubmit={onSubmit} id="add-movie-form">
            <fieldset>
                <legend>Lägg till en film</legend>

                <label for="title-field">Titel:</label>
                <input type="text" id="title-field" name="title" class="form-control">
                </input>
            </fieldset>

            <label for="rating-field">Betyg:</label>

            <select onChange={(e) => setGrade(e.currentTarget.value)} type="text" name="grade" id="rating-field" class="form-control">
                <option value="0">Välj betyg här...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <input type="submit" class="btn btn-success mt-3" value="Spara film">
            </input>
        </form>
    );
}

function Movies( { movies, deleteMovie } ) {
    return (
        <ul id="movies">
            {movies.map((movie) => (
              <Movie title={movie.title} grade={movie.grade} deleteMovie={deleteMovie} />
            ))}
        </ul>
    );
}

function Movie( { title, grade, deleteMovie }) {
    const images = [];

    for(let i = 0; i < grade; i++) {
        images.push(<img src={starIcon} alt='Star'/>);
    }

    return(
        <li data-grade={grade} data-title={title}>
            {title}
            <span class="movie-stars-and-delete-icon">
                {images}
                <img src={deleteIcon} onClick={() => deleteMovie(title)} alt="Delete movie" class="delete-movie-icon">
                </img>
            </span>
        </li>
    );
};

function OrderByAlphaButton({ sortByAlphabetic }) {
    return (
        <button id="order-alphabetic" onClick={() => sortByAlphabetic()} class="btn btn-primary">
            Alfabetisk ordning
        </button>
    );
}

function OrderByGradeButton({ sortByGrade }) {
    return (
        <button id="order-grade" onClick={() => sortByGrade()} class="btn btn-primary">
            Betygsordning
        </button>
    );
}

render(<App />, document.getElementById('app'));
