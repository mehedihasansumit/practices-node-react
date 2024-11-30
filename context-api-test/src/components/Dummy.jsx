import { useContext } from "react";
import { memo } from "react";
import { CountContext } from "../contexts/CountContext";
import { useMemo } from "react";

const Dummy = ({ intialCount }) => {
    // // const { intialCount: intialCount2 } = useContext(CountContext);
    // const { count } = useContext(CountContext);

    // const countMemo = useMemo(() => count, [count])

    console.log("dummy rendered", intialCount);
    return (
        <>
            <button>
                Dummy Button
            </button>

        </>
    )

}

export default memo(Dummy);