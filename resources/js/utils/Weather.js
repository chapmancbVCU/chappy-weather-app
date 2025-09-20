export class Weather {
    
    constructor() {
        let geoLocationInfo = this.getLocationInformation();
        this.latitude = this.setLatitude(geoLocationInfo);
        this.longitude = this.setLongitude(geoLocationInfo);
        this.city = this.getLocalityInfo(geoLocationInfo);
        this.units = this.setUnits(geoLocationInfo);
    }

    getCityInfo() {
        return this.city;
    }

    getLatitude() {
        return this.latitude;
    }

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

    getLocationInformation() {
        let _this = this;
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

    getUnits() {
        return this.units;
    }

    async setLatitude(geoLocationInfo) {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.latitude;
        } catch (error) {
            console.log(error);
        }
    }

    async setLongitude(geoLocationInfo) {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.longitude;
        } catch (error) {
            console.log(error);
        }
    }

    async setUnits(geoLocationInfo) {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            const countryName = data.countryName;
            if (countryName.includes('United States of America') ||
                countryName.includes('Myanmar') ||
                countryName.includes('Liberia')) {
                return 'IMPERIAL'
            } else {
                return 'METRIC';
            }
        } catch (error) {
            console.log(error);
        }
    }

}