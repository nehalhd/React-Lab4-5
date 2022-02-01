import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState , useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {getMovies} from "./actions";
import { LanguageContext } from "./languageContext";



// function

export default function Movies() {
  // let id = props.match.params.id;

  const { contextLanguage, setContextLanguage } = useContext(LanguageContext);

  const {params} = useParams();
  const [movies, setMovies] = useState([]);

  const favoriteId = useSelector((state) => state.movie.favoriteId);
  const dispatch = useDispatch();

  let isFav = (id) => {
    return favoriteId.find((element) => element === id);
  };

  let toggle = (id) => {
    isFav(id)
      ? dispatch({ type: "REMOVE", payload: id })
      : dispatch({ type: "ADD", payload: id });
  };

  useEffect(() => {
    dispatch(getMovies());
    // axiosInstance
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=8f8651655f78c47056460d8762481908"
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);
  return (
    
    <div className="container ">
      <h1>Context language : {contextLanguage}</h1>
      <button className="btn-danger" onClick={() => setContextLanguage("ar")}>
        Context lang
      </button>
      <h1>Movies</h1>
      <div className="row">
        {movies.map((movie) => {
          return (
            <div
              className="card col-3 offset-1"
              style={{ width: "10 rem" }}
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
                <span>
                  <Link
                    style={{ width: "100px" }}
                    to={`/watchMovie/${movie.id}`}
                    className="btn btn-primary"
                  >
                    Watch Movie
                  </Link>
                </span>
                <span>
                  <button
                    style={{ width: "100px" }}
                    className={`btn btn-success ${
                      isFav(movie.id) ? "active" : ""
                    }`}
                    onClick={() => toggle(movie.id)}
                  >
                    {" "}
                    Add to Favorites
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}