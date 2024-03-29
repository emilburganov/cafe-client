import {createContext, useEffect, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddEmployeePage from "./pages/AddEmployeePage";
import AddOrderPage from "./pages/AddOrderPage";
import AddWorkShiftPage from "./pages/AddWorkShiftPage";
import EmployeesPage from "./pages/EmployeesPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import WorkShiftsOrdersPage from "./pages/WorkShiftOrdersPage";
import WorkShiftsPage from "./pages/WorkShiftsPage";

export const AuthContext = createContext(null);
export const RoleContext = createContext(null);

/**
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (isAuth) {
            (async () => {
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
            })()
        }
    }, [])

    return (
        <HashRouter>
            <div className="wrapper">
                <RoleContext.Provider value={{role, setRole}}>
                    <AuthContext.Provider value={{isAuth, setAuth}}>
                        <Header/>
                        <main>
                            {isAuth ?
                                <Routes>
                                    {role === 'admin' &&
                                        <>
                                            <Route path="/add-employee" element={<AddEmployeePage/>}/>
                                            <Route path="/add-workshift" element={<AddWorkShiftPage/>}/>
                                            <Route path="/employees" element={<EmployeesPage/>}/>
                                            <Route path="/workshifts/:id/orders" element={<WorkShiftsOrdersPage/>}/>
                                            <Route path="/workshifts" element={<WorkShiftsPage/>}/>
                                            <Route path="/" element={<EmployeesPage/>}/>
                                        </>
                                    }
                                    {role === 'waiter' &&
                                        <>
                                            <Route path="/workshifts" element={<WorkShiftsPage/>}/>
                                            <Route path="/workshifts/:id/orders" element={<WorkShiftsOrdersPage/>}/>
                                            <Route path="/add-order" element={<AddOrderPage/>}/>
                                            <Route path="/" element={<WorkShiftsPage/>}/>
                                        </>
                                    }
                                    {role === 'cook' &&
                                        <>
                                            <Route path="/orders" element={<OrdersPage/>}/>
                                            <Route path="/" element={<OrdersPage/>}/>
                                        </>
                                    }
                                </Routes>
                                :
                                <Routes>
                                    <Route path="/login" element={<LoginPage/>}/>
                                    <Route path="*" element={<LoginPage/>}/>
                                </Routes>
                            }
                        </main>
                        <Footer/>
                    </AuthContext.Provider>
                </RoleContext.Provider>
            </div>
        </HashRouter>
    );
}

export default App;
