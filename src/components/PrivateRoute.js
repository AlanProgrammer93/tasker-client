import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LoadingToRedirect from "./LoadingToRedirect";

export default function PrivateRoute () {
    const [auth, setAuth] = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            const {data} = await axios.get(`/auth-check`);
            //console.log("AUTH CHECK RES.DATA ", data);
            if (!data.ok) {
                setLoading(true);
            } else {
                setLoading(false);
            }
        }
        if (auth) authCheck();
    }, [auth])

    return loading ? <LoadingToRedirect /> : <Outlet />
}