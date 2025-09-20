export class Weather {
    
    constructor() {
        let geoLocationInfo = this.getLocationInformation();
        this.latitude = 0;
        this.longitude = 0;
        this.city = this.getLocalityInfo(geoLocationInfo);
    }

    getCityInfo() {
        return this.city;
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
                _this.setLatitude(position.coords.latitude);
                _this.setLongitude(position.coords.longitude);
                bdcApi = bdcApi
                    + "?latitude=" + position.coords.latitude
                    + "&longitude=" + position.coords.longitude
                    + "&localityLanguage=en";         
            });   
        }
        return bdcApi;
    }

    getLatitude() {
        return this.latitude;
    }
    setLatitude(latitude) {
        this.latitude = latitude;
    }

    setLongitude(longitude) {
        this.longitude = longitude;
    }
}