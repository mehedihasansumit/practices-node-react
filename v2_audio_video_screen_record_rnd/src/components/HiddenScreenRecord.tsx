

const HiddenScreenRecord = () => {

    const onClickStartRecord = () => {

    }

    const onClickStopRecord = () => {

    }

    return (
        <div style={{display: "flex",gap:"5px"}}>
            <button onClick={onClickStartRecord}>
                Start Recording
            </button>
            <button onClick={onClickStopRecord}>
                Stop Recording
            </button>
        </div>
    )
}

export default HiddenScreenRecord;