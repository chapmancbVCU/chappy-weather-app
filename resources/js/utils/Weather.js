/**
 * Helper class that assists in retrieving data.
 */
export class Weather {
    
    /**
     * Creates instance of weather class.  Variables are set 
     * either by using geo location API or local storage.
     */
    constructor() {
        const data = this.readStorage();
        if(data) {
            console.log(data)
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            this.city = data.location;
            this.units = data.units;
        } else {
            let geoLocationInfo = this.getLocationInformation();
            this.latitude = this.setLatitude(geoLocationInfo);
            this.longitude = this.setLongitude(geoLocationInfo);
            this.city = this.getLocalityInfo(geoLocationInfo);
            this.units = this.setUnits(geoLocationInfo);
        }
        
    }

    /**
     * Get the name of city that is detected using geolocation based on 
     * localhost's location.
     * @returns The name of the city when using geolocation to detect location.
     */
    getCityInfo() {
        return this.city;
    }

    /**
     * Getter function for the latitude.
     * @returns The latitude of the user or search query
     */
    getLatitude() {
        return this.latitude;
    }

    /**
     * Retrieves locality information of user upon initialization of page.
     * @param {String} geoLocationInfo JSON string that contains information 
     * about user's current location.
     * @returns The locality of where the user resides.
     */
    async getLocalityInfo(geoLocationInfo) {   
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            const country = data.countryName;
            if(country.includes('United States of America')) {
                return data.locality + ", " + data.principalSubdivision;
            } else {
                return data.city + ", " + data.countryName;
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Detect location of localhost so we can get local weather on page load.
     * @returns The JSON representation of locality information.
     */
    getLocationInformation() {
        let bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

        //check if geolocation is available
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(function(position) {
                // _this.setLatitude(position.coords.latitude);
                // _this.setLongitude(position.coords.longitude);
                bdcApi = bdcApi
                    + "?latitude=" + position.coords.latitude
                    + "&longitude=" + position.coords.longitude
                    + "&localityLanguage=en";         
            });   
        }
        return bdcApi;
    }

    /**
     * Getter function that retrieves the units.  This value can be metric or 
     * imperial.
     * @returns The units name that the user as selected or detected based on 
     * the user's location.
     */
    getUnits() {
        return this.units;
    }

    locationDataExists() {
        const data = localStorage.getItem('locationData');
        return (data) ? true : false;
    }

    setLocation(city) {
        this.city = city;
    }
    /**
     * Setter function for the latitude of the user's location or search query.
     * @param {Number} latitude The latitude of the user's location or search 
     * query.
     */
    async setLatitude(geoLocationInfo) {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.latitude;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Setter function for the longitude of the user's location or search 
     * query.
     * @param {Number} longitude The longitude of the user's location or search 
     * query.
     */
    async setLongitude(geoLocationInfo) {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.longitude;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Sets the value of the units to be used based on user's location.
     * @param {String} countryName The name of the user's nation based on 
     * location detection.
     */
    async setUnits(geoLocationInfo) {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            const countryName = data.countryName;
            if (countryName.includes('United States of America') ||
                countryName.includes('Myanmar') ||
                countryName.includes('Liberia')) {
                return 'imperial'
            } else {
                return 'metric';
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Sets or updates local storage with information needed to instantiate 
     * instance of Weather class using local storage.
     * 
     * @param {array} data Weather data used to set latitude and longitude.
     * @param {string} units The units to be used.
     * @param {string} city The name of the city.
     */
    updateStorage(data, units, city) {
        let lat = data.coord?.lat;
        let lon = data.coord?.lon;

        const locationData = {
            location: city,
            units: units,
            latitude: lat,
            longitude: lon
        }

        localStorage.setItem('locationData', JSON.stringify(locationData));
    }

    readStorage() {
        const locationData = localStorage.getItem('locationData');
        if(locationData) {
            const data = JSON.parse(locationData);
            return data;
        }
        return null;
    }
}