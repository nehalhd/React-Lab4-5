import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

function Favorites() {
  let favoriteId = useSelector((state) => state.movie.favoriteId);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);

  let removeFav = (id) => {
    setMovies(movies.filter((element) => element.id != id));
    dispatch({ type: "REMOVE", payload: id });
  };

  useEffect(() => {
    let urls = favoriteId.map(
      (id) =>
        `https://api.themoviedb.org/3/movie/${id}?api_key=8f8651655f78c47056460d8762481908`
    );
    axios
      .all(urls.map((url) => axios.get(url).then((res) => res.data)))
      .then((resArray) => setMovies([...movies, ...resArray]));
  }, []);

  useEffect(() => {}, [favoriteId]);

  return (
    <div class="row">
      {movies.map((movie) => {
        return (
          <div class="col-4">
            <div key={movie.id} >
              <img
                style={{ width: "40%" }}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <div>
                <p>{movie.title}</p>
                <button
                  className={"btn mb-3  col-6 btn-danger"}
                  onClick={() => removeFav(movie.id)}
                >
                  {" "}
                  Remove from Favorites
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
