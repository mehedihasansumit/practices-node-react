import { Link, Outlet } from "react-router";

const Menus = () => {
    return (
        <>
            <div style={{ display: "flex", gap: "5px", background: "lightgray" }}>
                <Link to="/home"> Home </Link>
                <Link to="/login"> Login </Link>
            </div>
            <Outlet />
        </>
    )
}

export default Menus;
