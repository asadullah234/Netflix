import React, { useState, useEffect, useRef } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import Player  from "../../pages/Player/Player";
const TitleCards = ({ title, category }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTRiZWFhNmQ3ZmZmMGUzZTQ2MmE5M2E1MjkwMzNjNiIsIm5iZiI6MTc1MzUxNTE1MS42MzgsInN1YiI6IjY4ODQ4NDhmMjU2ZTYwYWEzYzUyYWIzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKw4u1lMDc8ANox54W7MkxxqryfWIDeC6svDYSk8MZs'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    };

    useEffect(() => {
        // Fetch movies from TMDB API
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        // Add wheel event listener
        const currentRef = cardsRef.current;
        if (currentRef) {
            currentRef.addEventListener("wheel", handleWheel);
        }

        // Cleanup function to remove event listener
        return () => {
            if (currentRef) {
                currentRef.removeEventListener("wheel", handleWheel);
            }
        };
    }, [category]); // Added category to dependency array

    return (
        <div className="title-cards">
            <h2>{title ? title : 'Popular on Netflix'}</h2>
            <div className="titlecards">
                <div className="card-list" ref={cardsRef}>
                    {apiData.map((card, index) => {
                        return (
                            <Link to={`/player/${card.id}`} className="card" key={index}>
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} 
                                    alt={card.original_title} 
                                />
                                <p>{card.original_title}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TitleCards;