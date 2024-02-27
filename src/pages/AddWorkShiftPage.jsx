import React, {useRef} from "react";
import {$fetch} from "../api";
import {useNavigate} from "react-router-dom";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const AddWorkShiftPage = () => {
    const form = useRef(null);
    const navigate = useNavigate();
    
    const addWorkShift = async (event) => {
        event.preventDefault();

        const formData = new FormData(form.current);
        formData.set("start", formData.get("start").replace("T", " "));
        formData.set("end", formData.get("end").replace("T", " "));

        const result = await $fetch("/work-shift", formData, "post");

        if (result) {
            navigate('/workshifts');
        }
    }
    
    return (
        <article className="modal">
            <form ref={form} onSubmit={addWorkShift}>
                <h2>Добавление смены</h2>
                <div>
                    <label htmlFor="start">Начало</label>
                    <input type="datetime-local" name="start" id="start"/>
                </div>
                <div>
                    <label htmlFor="end">Конец</label>
                    <input type="datetime-local" name="end" id="end"/>
                </div>
                <div>
                    <button className="approve_button">Отправить</button>
                </div>
            </form>
        </article>
    );
};

export default AddWorkShiftPage;