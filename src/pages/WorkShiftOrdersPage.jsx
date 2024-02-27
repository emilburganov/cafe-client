import React, {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {$fetch} from "../api";
import {RoleContext} from "../App";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const WorkShiftsOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const {role} = useContext(RoleContext);
    const {id} = useParams();
    const form = useRef(null);

    const getOrders = async () => {
        let result;
        if (role === 'admin') {
            result = await $fetch(`/work-shift/${id}/order`);
        } else {
            result = await $fetch(`/work-shift/${id}/orders`);
        }

        if (result) {
            setOrders(result.data.orders);
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
                                {role === 'waiter' &&
                                    <>
                                        <option value="Отменен">Отменен</option>
                                        <option value="Оплачен">Оплачен</option>
                                    </>
                                }
                                {role === 'cook' &&
                                    <>
                                        <option value="Готовится">Готовится</option>
                                        <option value="Готов">Готов</option>
                                    </>
                                }
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