import { useContext } from "react";
import { CountContext } from "../contexts/CountContext";
import Dummy from "./Dummy";
import UseMemoDummy from "./UseMemoDummy";
import ArrMemoDummy from "./ArrMemoDummy";

const Count = () => {

    const { intialCount, count, arrCount, onAddInitialCount, onAddCount, onAddArrCount } = useContext(CountContext);
    console.log('rendered');

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={onAddCount}>
                count is {count}
            </button>
            <button onClick={onAddInitialCount}>
                intial count is {intialCount}
            </button>
            <button onClick={onAddArrCount}>
                Arr count is {arrCount}
            </button>
            <Dummy intialCount={intialCount} />
            <UseMemoDummy />
            <ArrMemoDummy arrCount={arrCount} />
        </div>
    )

}

export default Count;