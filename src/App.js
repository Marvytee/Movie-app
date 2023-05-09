import React, { useEffect, useState } from "react";
import axios from 'axios'
import Header from "./components/Header";
import Main from "./components/Main";
import Info from "./components/Info";
import { TraceSpinner } from "react-spinners-kit"
import { Routes, Route} from "react-router-dom"
import "./styles.css"

export default function App(){
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [error, setError] = useState('')

    function fetchUserData(){
        axios.get('https://swapi.dev/api/films')
        .then(response => {
            setMovies(response.data.results);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false)
            setError(error)
        })
        
      }
      useEffect(() => {
        fetchUserData()
      }, [])
    
    return(
        <div className="container">
            <Header />
            {loading ? <div className="spinner"> <TraceSpinner size={150} frontColor="yellow" backColor="black"/> </div> :
            <Routes>
                    <Route path="/" element={<Main movies={movies}/>}/>
                    <Route path="/movies" element={<Info movies={movies}/>}/>
            </Routes>
            }
            {error && <h1>{error.message}</h1>}
        </div>
    )
}

