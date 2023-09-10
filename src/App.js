import React, {useEffect} from "react";
import "./style/style.css";
import "./style/reset.css";
import "./style/font.css";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import {useSelector} from "react-redux";

function App() {

    const userStore = useSelector((state) => state.userStore);

    return (
        <div className="App">
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerStyle={{ top: 40 }}
                toastOptions={{ duration: 2000 }}
            />
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
