import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

const Home = () => {

    const [data, setData] = useState();
    const [dataTwo, setDataTwo] = useState();
    const navigate = useNavigate()
    const getdata = async (uri, setValue) => {
        await axios('http://localhost:3000' + uri, { withCredentials: true })
            .then(({ data }) => { console.log({ data }) })
            .catch(({status})=> status === 403 && navigate('/login') )
    }

    useEffect(() => {
        getdata('/');
        getdata('/dummy');

    }, [])

    return (
        <div style={{ display: "flex", justifyContent: "center", minWidth: "100vw" }}>
            <h1>Wellcome to your Home...</h1>
        </div>
    )
}

export default Home