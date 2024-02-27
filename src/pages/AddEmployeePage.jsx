import React, {useRef} from "react";
import {$fetch} from "../api";
import {useNavigate} from "react-router-dom";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const AddEmployeePage = () => {
    const form = useRef(null);
    const navigate = useNavigate();

    const addEmployee = async (event) => {
        event.preventDefault();

        for (const pair of (new FormData(form.current)).entries()) {
            console.log(pair[0], pair[1]);
        }
        const result = await $fetch("/user", new FormData(form.current), "post");

        if (result) {
            navigate("/employees");
        }
    }

    return (
        <article className="modal">
            <form ref={form} onSubmit={addEmployee}>
                <h2>Добавление нового сотрудника</h2>
                <div>
                    <label htmlFor="name">Имя</label>
                    <input type="text" name="name" id="name"/>
                </div>
                <div>
                    <label htmlFor="login">Логин</label>
                    <input type="text" name="login" id="login"/>
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <div>
                    <label htmlFor="photo_file" className="photo_input">Фото</label>
                    <input type="file" name="photo_file" id="photo_file"/>
                </div>
                <div>
                    <label htmlFor="role">Роль</label>
                    <select name="role_id" id="role" defaultValue="nothing">
                        <option value="nothing" disabled>Выберите роль:</option>
                        <option value="1">Администратор</option>
                        <option value="2">Официант</option>
                        <option value="3">Повар</option>
                    </select>
                </div>
                <div>
                    <button className="approve_button">Отправить</button>
                </div>
            </form>
        </article>
    );
};

export default AddEmployeePage;