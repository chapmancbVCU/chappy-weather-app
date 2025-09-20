function geoLocation() {
    let bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

    // return new Promise((resolve, reject) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                bdcApi = bdcApi
                    + '?latitude=' + position.coords.latitude
                    + '&longitude=' + position.coords.longitude
                    + '&localityLanguage=en';
                    // console.log(bdcApi)
                });
        }
    // })
    return bdcApi;
}


export default async function geoLoc() {
    try {
        const response = await fetch(geoLocation());
        const data = await response.json();
        return data;
    } catch(error) {}
}