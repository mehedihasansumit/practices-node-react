import { useState } from "react";
import { createContext } from "react";

export const CountContext = createContext();

const CountContextProvider = ({ children }) => {
    const [intialCount, setIntialCount] = useState(0);
    const [count, setCount] = useState(0);
    const [arrCount, setArrCount] = useState([0]);

    const onAddCount = () => { setCount(count => count + 1) };
    const onAddInitialCount = () => { setIntialCount(count => count + 1) }
    const onAddArrCount = () => { setArrCount(count => [...count, count.length]) }

    return <CountContext.Provider value={{ intialCount, onAddInitialCount, count, onAddCount, arrCount, onAddArrCount }}>
        {children}
    </CountContext.Provider>
};

export default CountContextProvider 