import React, {useContext, useEffect, useState} from "react";
import {$fetch} from "../api";
import {useNavigate} from "react-router-dom";
import {RoleContext} from "../App";

const WorkShiftsPage = () => {
    const [workShifts, setWorkShifts] = useState([]);
    const navigate = useNavigate();
    const {role} = useContext(RoleContext);

    const getWorkShifts = async () => {
        const result = await $fetch("/work-shift");

        if (result) {
            setWorkShifts(result.data);
        }
    }

    const openWorkShift = async (workShift) => {
        const result = await $fetch(`/work-shift/${workShift.id}/open`);

        if (result) {
            getWorkShifts();
        }
    }

    const closeWorkShift = async (workShift) => {
        const result = await $fetch(`/work-shift/${workShift.id}/close`);

        if (result) {
            getWorkShifts();
        }
    }

    useEffect(() => {
        getWorkShifts();
    }, []);

    return (
        <section className="shift">
            {role === "admin" && <button onClick={() => navigate("/add-workshift")} className="approve_button">Добавить смену</button>}
            {workShifts.map(workShift =>
                <article key={workShift.id}>
                    <h2>Смена №{workShift.id}</h2>
                    <p>Начало смены в {workShift.start}</p>
                    <p>Конец смены в {workShift.end}</p>
                    <p className="fired">Статус: {workShift.active ? "Открытая" : "Закрытая"}</p>
                    {workShift.active ?
                        <button onClick={() => closeWorkShift(workShift)} className="approve_button">
                            Закрыть
                        </button>
                        :
                        <button onClick={() => openWorkShift(workShift)} className="approve_button">
                            Открыть
                        </button>
                    }
                    <button onClick={() => navigate(`/workshifts/${workShift.id}/orders`)} className="approve_button">
                        Заказы смены
                    </button>
                </article>
            )}
        </section>
    );
};

export default WorkShiftsPage;