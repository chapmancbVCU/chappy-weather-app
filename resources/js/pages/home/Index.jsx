import React, { useEffect, useState } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import geoLoc from "@/utils/geoLocation";

function Index({ user }) {
    const welcomeMessage = () => {
        
    }
    
    const [data, setData] = useState(null);
    useEffect(() =>{

        geoLoc()
            .then(d => {
                setData(d)
            })
    }, []) 




    console.log(data);
    return (
        <div>
            <h2 className="text-center">Conditions in {data?.city}, {data?.principalSubdivision}</h2>
            <CurrentConditions city={`${data?.city}, ${data?.principalSubdivision}`} />
        </div>
    );
}        
export default Index;