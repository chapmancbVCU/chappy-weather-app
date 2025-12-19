import React, { useEffect, useState } from "react";
import Forms from "@chappy/components/Forms";
import { apiPost, apiError } from "@chappy/utils/api";

function HomeCheck({ weather, favorites }) {
    /**
     * Sets value of error if exists.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [error, setError] = useState(null);

    const [isHome, setIsHome] = useState(false);

    const isHomeCity = () => {
        const weatherCity = weather.city.toLowerCase();
        for(let i = 0; i < favorites?.length; i++) {
            let homeCity = favorites[i].name.toLowerCase();

            if((homeCity.includes(weatherCity) || weatherCity.includes(homeCity)) && favorites[i].is_home == 1) {
                console.log("home");
                setIsHome(true);
                break;
            }
        }
    }

    useEffect(() => {
        isHomeCity();
    })
    return (
        <>

        </>
    );
}        
export default HomeCheck;