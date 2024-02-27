import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {$fetch} from "../api";

const AddOrderPage = () => {
    const [workShifts, setWorkShifts] = useState([]);
    const form = useRef(null);
    const navigate = useNavigate();

    const addOrder = async (event) => {
        event.preventDefault();

        const result = await $fetch("/order", new FormData(form.current), "post");

        if (result) {
            navigate('/workshifts');
        }
    }

    const getWorkShifts = async () => {
        const result = await $fetch("/work-shift");

        if (result) {
            setWorkShifts(result.data);
        }
    }

    useEffect(() => {
        getWorkShifts();
    }, []);

    return (
        <article className="modal">
            <form ref={form} onSubmit={addOrder}>
                <h2>Добавление заказа</h2>
                <div>
                    <label htmlFor="role">Смена</label>
                    <select name="work_shift_id" id="work_shift_id">
                        <option value="nothing" selected disabled>Выберите смену:</option>
                        {workShifts.map(workShift =>
                            <option value={workShift.id}>{workShift.start} - {workShift.end}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="table_id">Номер столика</label>
                    <input type="number" name="table_id" id="table_id"/>
                </div>
                <div>
                    <label htmlFor="number_of_person">Количество персон</label>
                    <input type="number" name="password" id="number_of_person"/>
                </div>
                <div>
                    <button className="approve_button">Добавить</button>
                </div>
            </form>
        </article>
    );
};

export default AddOrderPage;