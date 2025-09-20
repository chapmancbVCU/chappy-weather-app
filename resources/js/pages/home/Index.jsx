import React, { useEffect, useState } from "react";
import CurrentConditions from "@/components/CurrentConditions";
import geoLoc from "@/utils/geoLocation";

function Index({ user }) {
    const welcomeMessage = () => {
        
    }
    
    const [data, setData] = useState(null);
    useEffect(() =>{
        // const result = await geoLoc();
        // setData(result);
        geoLoc()
            .then(d => {
                setData(d)
            })
    }, []) 

    console.log(data);
    return (
        <div>
            <h2 className="text-center">{welcomeMessage()}</h2>
            <CurrentConditions />
        </div>
    );
}        
export default Index;