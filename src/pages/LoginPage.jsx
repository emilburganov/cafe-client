import React, {useContext, useRef} from "react";
import {$fetch} from "../api";
import {useNavigate} from "react-router-dom";
import {AuthContext, RoleContext} from "../App";

const LoginPage = () => {
    const form = useRef(null);
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext);
    const {setRole} = useContext(RoleContext);

    const login = async (event) => {
        event.preventDefault();

        const result = await $fetch("/login", new FormData(form.current), "post");

        if (result) {
            localStorage.setItem("token", result.data.user_token)

            await getRole()
            await setAuth(true);
            await navigate("/");
        }
    }

    const getRole = async () => {
        const adminResult = await fetch("http://cafe-server/api-cafe/user", {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (adminResult.status === 200) {
            return setRole('admin');
        }

        const cookResult = await fetch("http://cafe-server/api-cafe/order/taken", {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (cookResult.status === 200) {
            return setRole('cook');
        }

        return setRole('waiter')
    }

    return (
        <article className="modal">
            <form ref={form} onSubmit={login}>
                <h2>Авторизация</h2>
                <div>
                    <label htmlFor="login_enter">Логин</label>
                    <input type="text" name="login" id="login_enter"/>
                </div>
                <div>
                    <label htmlFor="password_enter">Пароль</label>
                    <input type="password" name="password" id="password_enter"/>
                </div>
                <div>
                    <button className="approve_button">Логин</button>
                </div>
            </form>
        </article>
    );
};

export default LoginPage;