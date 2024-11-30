import { useContext } from "react";
import { CountContext } from "../contexts/CountContext";
import Dummy from "./Dummy";
import UseMemoDummy from "./UseMemoDummy";

const Count = () => {

    const { intialCount, count, onAddCount, onAddInitialCount } = useContext(CountContext);
    console.log('rendered');

    return (
        <div style={{display:"flex",gap:"10px"}}>
            <button onClick={onAddCount}>
                count is {count}
            </button>
            <button onClick={onAddInitialCount}>
                intial count is {intialCount}
            </button>
            <Dummy intialCount={intialCount} />
            <UseMemoDummy />
        </div>
    )

}

export default Count;