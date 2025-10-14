import { useEffect, useState } from "react";
import { apiGet, useAsync } from '@chappy/utils/api';

/**
 * Manages actions associated with fetching weather data and ensures 
 * consistency between views.
 * @param {Weather} weather Object responsible for tracking information about 
 * currently selected location.
 * @param {boolean} fetch Boolean flag to determine if we will fetch data.
 * @returns 
 */
const useWeather = (weather, fetch) => {
    /**
     * The name of the city.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [city, setCity] = useState("");

    /**
     * Manages checked status for units toggle switch.
     * @type {[boolean, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [isToggled, setToggled] = useState(false);

    /**
     * Keeps track of units being used.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [units, setUnits] = useState("")

    /**
     * Manages state of units label.
     * @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [unitsLabel, setUnitsLabel] = useState("");

    /**
     * Updates label for units system.
     */
    const updateUnitsLabel = () => {
        (weather.getUnits() === 'imperial') ? setUnitsLabel('F') : setUnitsLabel('C');
        setUnits(weather.getUnits());
    }

    /**
     * Event handler for setting units when toggle switch is set by user.
     */
    const handleToggleChange = () => {
        weather.toggleUnits();
        setToggledCheckedState();
    }

    /**
     * Set state for toggle switch when it is selected.
     */
    const setToggledCheckedState = () => {
        (weather.getUnits() === 'imperial') ? setToggled(false) : setToggled(true);
    }

    /**
     * Updates units and checked state when value for isToggled is changed.
     */
    useEffect(() => {
        updateUnitsLabel();
        setToggledCheckedState();
    }, [isToggled])
    
    /**
     * Sets state of city and units variable based on updates to weather 
     * object.
     */
    useEffect(() => {
        (async () => {
        if (weather.locationDataExists()) {
            setCity(weather.getCityInfo());
            setUnits(weather.getUnits());
        } else {
            setCity(await weather.getCityInfo());
            setUnits(await weather.getUnits());
        }
        })();
    }, [weather]);

    /**
     * Sets name of city to value of query string on submit.
     * @param {string} q The query string.
     */
    const onSubmit = (q) => {
        setCity(q);
        weather.setLocation(q);
    }

    /**
     * Fetches data for current conditions using free tier api.
     */
    const { 
        data: currentData, 
        loading: currentLoading, 
        error: currentError} = useAsync(({ signal }) => {
            if(fetch == false) return Promise.resolve(null);
            if (!city) return Promise.resolve(null);
            const u = units || "imperial";
            return apiGet("/weather/currentConditions", { query: { q: city, units: u }, signal });
    }, [city, units]);

    const current = currentData?.data || {};
    const coords = current?.coord;
    if(fetch == true) {
        console.log("Fetch (current): true")
        console.log(current)
    } else {
        console.log("Fetch (current): false")
        console.log(current)
    }
    
    /**
     * Fetches data using oneCall api.
     */
    const {
        data: oneCallData,
        loading: oneCallLoading,
        error: oneCallError,
    } = useAsync(({ signal }) => {
        if(fetch == false) return Promise.resolve(null);
        if (!coords || typeof coords.lat !== "number" || typeof coords.lon !== "number") {
            return Promise.resolve(null);
        }
        const u = units || "imperial";
        return apiGet("/weather/oneCall", { query: { lat: coords.lat, lon: coords.lon, units: u }, signal });
    }, [coords?.lat, coords?.lon, units]);
    
    const oneCall = oneCallData?.data || {};
    //console.log(oneCall)

    if(fetch == true) {
        console.log("Fetch (oneCall): true")
        console.log(oneCall)
    } else {
        console.log("Fetch (oneCall): false")
        console.log(oneCall)
    }
    /**
     * Updates storage when there are updates to city, units,
     * coordinates, and weather object.
     */
    useEffect(() => {
        if(city && units && coords) {
            weather.updateStorage(current, units, city);
        }
    }, [city, units, coords?.lat, coords?.lon, weather]);

    return { 
        city, 
        current, 
        currentError, 
        currentLoading,
        handleToggleChange, 
        isToggled, 
        oneCall,
        oneCallError,
        oneCallLoading,
        onSubmit, 
        units,
        unitsLabel,
    };
}

export default useWeather;