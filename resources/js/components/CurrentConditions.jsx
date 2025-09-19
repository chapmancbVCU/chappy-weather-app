import React from "react";
import { apiGet, useAsync } from '@chappy/utils/api';
function CurrentConditions({ city = 'Newport News, Virginia', units = 'imperial'}) {
    const { data, loading, error} = useAsync(({ signal}) => 
        apiGet('/weather/currentConditions', { query: {q: city, units}, signal}),
    [city, units]);

    const d = data?.data || {};
    console.log(d);
    return (
        <>
        
        </>
    );
}        
export default CurrentConditions;