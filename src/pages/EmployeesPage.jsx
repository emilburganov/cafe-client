import React, {useEffect, useRef, useState} from "react";
import {$fetch} from "../api";
import {Link} from "react-router-dom";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [workShifts, setWorkShifts] = useState([]);
    const form = useRef(null);

    const getEmployees = async () => {
        const result = await $fetch("/user");

        if (result) {
            setEmployees(result.data);
        }
    }

    const getWorkShifts = async () => {
        const result = await $fetch("/work-shift");

        if (result) {
            setWorkShifts(result.data);
        }
    }

    useEffect(() => {
        getEmployees();
        getWorkShifts();
    }, []);

    const showEmployee = (employee) => {
        alert(JSON.stringify(employee, null, 4));
    }

    const addUserToWorkShift = async (event) => {
        event.preventDefault();

        const formData = new FormData(form.current);

        const result = await $fetch(`/work-shift/${formData.get("work_shift_id")}/user`, formData, "post");

        if (result) {
            getEmployees()
        }
    }

    return (
        <section className="modal">
            <section className="employees">
                <article>
                    <span>Имя</span>
                    <span>Статус</span>
                    <span>Должность</span>
                    <button>
                        <Link to="/add-employee">+</Link>
                    </button>
                </article>
                {employees.map(employee =>
                    <article key={employee.id}>
                        <span>{employee.name}</span>
                        <span className="working">{employee.status}</span>
                        <span>{employee.group}</span>
                        <button onClick={() => showEmployee(employee)}>Подробнее</button>
                    </article>
                )}
            </section>
            <section className="employees">
                <form ref={form} onSubmit={addUserToWorkShift}>
                    <h2>Добавление сотрудника на смену</h2>
                    <div>
                        <label htmlFor="user_id">Сотрудник</label>
                        <select name="user_id" id="user_id" defaultValue="nothing">
                            <option value="nothing" disabled>Выберите сотрудника:</option>
                            {employees.map(employee =>
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="role">Смена</label>
                        <select name="work_shift_id" defaultValue="nothing" id="work_shift_id">
                            <option value="nothing" disabled>Выберите смену:</option>
                            {workShifts.map(workShift =>
                                <option key={workShift.id} value={workShift.id}>{workShift.start} - {workShift.end}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <button className="approve_button">Добавить</button>
                    </div>
                </form>
            </section>
        </section>
    );
};

export default EmployeesPage;