import React, {useEffect} from "react";
import "./style/style.css";
import "./style/reset.css";
import "./style/font.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import { useMediaQuery } from "react-responsive"

function App() {

    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth() + 1;
    const formattedMonth = nowMonth < 10 ? `0${nowMonth}` : nowMonth.toString();
    const isNotPc = useMediaQuery({
        query : "(max-width:1200px)"
    });

    useEffect(() => {
        localStorage.setItem("nowYear", nowYear);
        localStorage.setItem("nowMonth", formattedMonth);
    }, []);

    return (
        <div className="App">
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerStyle={{ top: 40 }}
                toastOptions={{ duration: 2000 }}
            />
            {isNotPc ?
                <div className="no-pc-wrap">
                    <h2 className="no-pc">접속 환경이 올바르지 않습니다.</h2>
                    <p className="no-pc">PC(개인 컴퓨터)를 통해 접속해주세요.</p>
                    <span className="no-pc">
                        Certainly, if you could please access this from a PC environment, I would greatly appreciate it. You can access the desired information or perform the necessary tasks more effectively through a personal computer. If you could provide me with more details about what you need or the specific task you'd like to accomplish, I'll be happy to assist you further.
                    </span>
                </div> :
                <div className="container">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/" element={<Main />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            }
        </div>
    );
}

export default App;
