import React, {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {$fetch} from "../api";
import {RoleContext} from "../App";

const WorkShiftsOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const form = useRef(null);

    const getOrders = async () => {
        const result = await $fetch("/order/taken");

        if (result) {
            setOrders(result.data);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

    const changeStatus = async (event, order) => {
        event.preventDefault();

        const result = await $fetch(`/order/${order.id}/change-status`, new FormData(form.current), "patch");

        if (result) {
            getOrders();
        }
    }


    return (
        <section className="orders">
            {orders.map(order =>
                <article>
                    <h2>{order.table}</h2>
                    <p>Официант: {order.shift_workers}</p>
                    <p className="fired">Статус: {order.status}</p>
                    <p>Цена: Хуй знает (В REST`е не было)</p>

                    <form ref={form} onSubmit={(event) => changeStatus(event, order)}>
                        <div>
                            <select name="status" id="status_id">
                                <option value="nothing" selected disabled>Выберите статус:</option>
                                <option value="Готовится">Готовится</option>
                                <option value="Готов">Готов</option>
                            </select>
                        </div>
                        <button className="approve_button">Обновить статус</button>
                    </form>
                </article>
            )}
        </section>
    );
};

export default WorkShiftsOrdersPage;