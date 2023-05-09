import React from "react";
import { Link } from "react-router-dom";

export default function Main(props){
    const {movies} = props;
    return(
        <main>
            {movies.length > 0 && movies.map(movie =>{
                return(
                    <div key={movie.episode_id}>
                        <h2>{movie.title}</h2>
                        <p><small>{new Date(movie.release_date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</small></p>
                        <p className="main-text">{movie.opening_crawl.substring(0, 260)}...</p>
                        <hr></hr>   
                        <Link to={`/movies?id=${movie.episode_id}`}>More Info</Link>
                    </div>
                ) 
            })}
        </main>
    )
}
