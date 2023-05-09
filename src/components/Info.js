import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Info(props){
    const location = useLocation();
    const {movies} = props;
    const [characters, setCharacters] = useState([])
    const [planets, setPlanets] = useState([])
    const [species, setSpecies] = useState([])
    const [starships, setStarships] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({});
    
    const characterFunction = async () => {
       const characterresults = await Promise.all(selectedMovie?.characters?.map((character) => axios.get(character)))
        console.log(characterresults,"one");
        setCharacters(characterresults)
        return characterresults.map(characterresult => characterresult.data);
    }
    
    const planetFunction = async () => {
        const planetresults = await Promise.all(selectedMovie?.planets?.map((planet) => axios.get(planet)))
         console.log(planetresults,"two");
         setPlanets(planetresults)
         return planetresults.map(planetresult => planetresult.data);
     }

     const speciesFunction = async () => {
        const speciesresults = await Promise.all(selectedMovie?.species?.map((specie) => axios.get(specie)))
         console.log(speciesresults,"three");
         setSpecies(speciesresults)
         return speciesresults.map(speciesresult => speciesresult.data);
     }

     const starshipsFunction = async () => {
        const starshipsresults = await Promise.all(selectedMovie?.starships?.map((starship) => axios.get(starship)))
         console.log(starshipsresults,"three");
         setStarships(starshipsresults)
         return starshipsresults.map(starshipsresult => starshipsresult.data);
     }

     const vehiclesFunction = async () => {
        const vehiclesresults = await Promise.all(selectedMovie?.vehicles?.map((vehicle) => axios.get(vehicle)))
         console.log(vehiclesresults,"three");
         setVehicles(vehiclesresults)
         return vehiclesresults.map(vehiclesresult => vehiclesresult.data);
     }
     useEffect(() =>{
        characterFunction()
        planetFunction()
        speciesFunction()
        starshipsFunction()
        vehiclesFunction()
     }, [selectedMovie]);

    useEffect(() =>{
        const param = new URLSearchParams(location.search)
        const id = param.get("id")
        const filteredMovie = movies.filter(movie => movie.episode_id === Number(id));
        setSelectedMovie(filteredMovie[0])
    }, [location])

    return(
        <div className="info">
            <Link to="/" className="link">{'\u2190'} Back to list</Link>
            {movies.length > 0 && movies.filter(movie => movie.episode_id === Number(new URLSearchParams(location.search).get("id"))).map(movie =>{
                return (
                    <div key={movie.episode_id} className="info-container">
                        <h1>{movie.title}</h1>
                        <p>Director : {movie.director}</p>
                        <p>Producer : {movie.producer}</p>
                        <div>
                            <h3>Description</h3>
                            <p>{movie.opening_crawl}</p>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>Characters</h3>
                            <ul className="grid-container">
                            {characters && (characters.length > 0) && characters.map(character => {
                                 return <li>{character.data.name}</li>
                             })}
                            </ul>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>Planets</h3>
                            <ul className="grid-container">
                                {planets && (planets.length > 0) && planets.map(planet => {
                                    return(
                                        <li>{planet.data.name}</li>
                                    )
                                })} 
                            </ul>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>Species</h3>
                            <ul className="grid-container">
                                {species && (species.length > 0) && species.map(specie => {
                                    return(
                                        <li>{specie.data.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>Starships</h3>
                            <ul className="grid-container">
                                {starships && (starships.length > 0) && starships.map(starship => {
                                    return(
                                        <li>{starship.data.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>vehicles</h3>
                            <ul className="grid-container">
                                {vehicles && (vehicles.length > 0) && vehicles.map(vehicle => {
                                    return(
                                        <li>{vehicle.data.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}