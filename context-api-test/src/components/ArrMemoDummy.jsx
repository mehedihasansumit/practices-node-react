import { useContext } from "react";
import { CountContext } from "../contexts/CountContext";
import { useMemo } from "react";
import { memo } from "react";

const ArrMemoDummy = ({ arrCount }) => {

    // const { count } = useContext(CountContext);

    // const countMemo = useMemo(() => count, [count])
    console.log("arr dummy memo", arrCount)

    return (
        <>
            <button>
                Arr Memo Dummy Button
            </button>

        </>
    )

}

export default memo(ArrMemoDummy);