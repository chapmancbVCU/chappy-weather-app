import React from "react";
import { apiGet, useAsync } from '@chappy/utils/api';
function CurrentConditions({ city, units = 'imperial'}) {
    const { data, loading, error} = useAsync(({ signal}) => 
        apiGet('/weather/currentConditions', { query: {q: city, units}, signal}),
    [city, units]);

    const conditions = data?.data || {};

    if(loading) return <div>Loading...</div>
    if(error) return <div className="text-danger">{error.message}</div>
    return (
        <div className="card p-3">
      <h5 className="mb-2">{conditions.name}</h5>
      <div>
        {Math.round(conditions.main?.temp)}°{units === 'metric' ? 'C' : 'F'} — {conditions.weather?.[0]?.description}
      </div>
    </div>
    );
}        
export default CurrentConditions;