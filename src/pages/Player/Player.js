import React, { useState, useEffect } from "react";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";
import back_arrow from "../../assets/back_arrow_icon.png";

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTRiZWFhNmQ3ZmZmMGUzZTQ2MmE5M2E1MjkwMzNjNiIsIm5iZiI6MTc1MzUxNTE1MS42MzgsInN1YiI6IjY4ODQ4NDhmMjU2ZTYwYWEzYzUyYWIzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKw4u1lMDc8ANox54W7MkxxqryfWIDeC6svDYSk8MZs'
        }
    };

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                    options
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    // Find the first trailer or teaser
                    const trailer = data.results.find(video => 
                        video.type === "Trailer" || video.type === "Teaser"
                    ) || data.results[0];
                    
                    setApiData({
                        name: trailer.name,
                        key: trailer.key,
                        published_at: trailer.published_at,
                        type: trailer.type
                    });
                } else {
                    setError("No video found for this movie");
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchVideoData();
        }
    }, [id]); // Added id to dependency array

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!apiData.key) return <div className="no-video">No video available</div>;

    return (
        <div className="player">
            <img 
                src={back_arrow}
                alt="Go back"
                className="back-button"
                onClick={() => navigate(-1)}
            />
            
            <iframe 
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title={apiData.name || "Movie Trailer"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            <div className="player-info">
                {apiData.published_at && (
                    <p>Published: {new Date(apiData.published_at).toLocaleDateString()}</p>
                )}
                <p>{apiData.name}</p>
                <p>Type: {apiData.type}</p>
            </div>
        </div>
    );
};

export default Player;