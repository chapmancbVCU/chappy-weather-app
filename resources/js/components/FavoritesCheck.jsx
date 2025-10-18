import React, { useEffect, useState } from "react";
import Forms from "@chappy/components/Forms";
import route from "@chappy/utils/route";
import { apiPost } from "@chappy/utils/api";
function FavoritesCheck({ weather, favorites }) {

    const [isFavorite, setIsFavorite] = useState(false);

    const [form, setForm] = useState({
        
    });

    console.log("********************");
    console.log("Favorites Check");
    console.log(weather)
    console.log(favorites)
    console.log("********************");
    const isFavoriteCity = () => {
        const weatherCity = weather.city.toLowerCase();
        for(let i = 0; i < favorites.length; i++) {
            let favCity = favorites[i].name.toLowerCase();
            if(favCity.includes(weatherCity) || weatherCity.includes(favCity)) {
                setIsFavorite(true);
                break;
            }
        }
    }

    async function handleSubmit(e) {
        console.log("test")
        e.preventDefault();
        
        try {
            const payload = {
                test: "tester"
            }
            const json = await apiPost("/favorites/store", payload);
        } catch (error) {

        }
      
    }

    useEffect(() => {
        isFavoriteCity();
    });

    return (
        <>
            {!isFavorite && (
            <form method="POST" onSubmit={handleSubmit}>
                <Forms.CSRF />
                    <Forms.Hidden name="test" value="test" />
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-sm">
                        <i className="fa fa-plus"></i>Add
                    </button>
                </form>
            )}
        </>
    );
}        
export default FavoritesCheck;