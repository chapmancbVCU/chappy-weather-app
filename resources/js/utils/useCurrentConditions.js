import React, { useEffect, useState } from "react";

const useCurrentConditions = (conditions, oneCall) => {
    const [summary, setSummary] =  useState("")

    const getSummary = () => {
        const summary = oneCall?.daily?.[0]?.summary ?? "";
        setSummary(summary);
    }

    useEffect(() => {
        getSummary();
    }, [oneCall]);

    return {
        summary
    }
}

export default useCurrentConditions;