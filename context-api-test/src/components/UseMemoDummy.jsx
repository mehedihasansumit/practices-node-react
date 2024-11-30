import { useContext } from "react";
import { memo } from "react";
import { CountContext } from "../contexts/CountContext";
import { useMemo } from "react";

const UseMemoDummy = () => {

    const { count } = useContext(CountContext);

    const countMemo = useMemo(() => count, [count])
    console.log("dummy use memo", countMemo)
    return (
        <>
            <button>
                Use Memo Dummy Button
            </button>

        </>
    )

}

export default UseMemoDummy;