import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {$fetch} from "../api";
import {AuthContext, RoleContext} from "../App";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
    const {isAuth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const {role} = useContext(RoleContext);

    const logout = async () => {
        const result = await $fetch("/logout");

        if (result) {
            localStorage.removeItem("token")
            setAuth(false);
            navigate("/login");
        }
    }

    return (
        <header>
            <article>
                <img src="/images/logo.png" alt="logo"/>
            </article>
            {isAuth ?
                <nav>
                    {role === 'admin' &&
                        <>
                            <Link to="/employees">Сотрудники</Link>
                            <Link to="/workshifts">Смены</Link>
                        </>
                    }
                    {role === 'waiter' &&
                        <>
                            <Link to="/workshifts">Смены</Link>
                            <Link to="/add-order">Добавить заказ</Link>
                        </>
                    }
                    {role === 'cook' &&
                        <>
                            <Link to="/orders">Заказы</Link>
                        </>
                    }
                    <button onClick={logout} className="button cancel_button">Выход</button>
                </nav> :
                <nav>
                    <Link to="/login" className="button approve_button">Вход</Link>
                </nav>
            }
        </header>
    );
};

export default Header;