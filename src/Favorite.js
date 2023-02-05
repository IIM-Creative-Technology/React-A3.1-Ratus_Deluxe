import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
    // Etat pour stocker les informations du film
    const [favorites, setFavorites] = useState([]);

    // Effet qui charge les informations du film à partir de l'API
    useEffect(() => {
        // Fonction qui récupère les images sauvegardées dans le local storage
        const fetchFavorites = () => {
            let favoritesArray = [];
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).includes("film_")) {
                    let film = localStorage.getItem(localStorage.key(i));
                    favoritesArray.push(film);
                }
            }
            setFavorites(favoritesArray);
        }
        fetchFavorites();
    }, []);

    return (
        <div>
            <h1>My Favorite Images</h1>
            <button onClick={() => window.history.back()}>Go Back</button>
            {/* Affiche les images sauvegardées dans le local storage */}
            {favorites.map(film => (
                <div key={film}>
                    <img src={film} alt={film} />
                </div>
            ))}
        </div>
    );
};

export default FavoritesPage;

