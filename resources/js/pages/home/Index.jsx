import React from "react";
import CurrentConditions from "@/components/CurrentConditions";
function Index({ user }) {

    const welcomeMessage = () => {

    }

    return (
        <div>
            <h2 className="text-center">{welcomeMessage()}</h2>
            <CurrentConditions />
        </div>
    );
}        
export default Index;