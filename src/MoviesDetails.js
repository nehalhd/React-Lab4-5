import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import {useParams} from "react-router-dom";

export default function MoviesDetails(props) {
  const params=useParams();
  // let id = props.match.params.id

  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=8f8651655f78c47056460d8762481908`)
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
        <div>
          <h1> Movie Details</h1>
          <h2 className="text-secondary"> Movie Name: {details.title}</h2>
          <h2 className="text-secondary"> Description: {details.overview}</h2>
          <img src={`https://image.tmdb.org/t/p/w500/${details.poster.path}`} style={{width:250}} className="card-img-top" alt="movie_poster"></img>
        </div>
      );
    }
      

