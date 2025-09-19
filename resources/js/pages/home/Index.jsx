import React from "react";
import CurrentConditions from "@/components/CurrentConditions";
function Index({ user }) {

    const welcomeMessage = () => {
        const fname = user.fname ?? 'Guest';
        if(fname !== 'Guest') {
            return `Welcome ${fname}, here are the current conditions for this area`; 
        }
        return 'The current conditions for this area';
    }

    return (
        <div>
            <h2 className="text-center">{welcomeMessage()}</h2>
            <CurrentConditions />
        </div>
    );
}        
export default Index;