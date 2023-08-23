import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = "https://port-0-savings-book-backend-coyw652clln8210q.exp0.cloudtype.app";

export const loginApi = async (
    username,
    password,
    navigate
) => {
    const data = {
        username: username,
        password: password
    }
    try{
        const res = await axios.post(`${baseUrl}/api/user/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(res);
        if(res?.result === "Y"){
            toast.success("로그인 성공");
            setTimeout(() => {
                navigate("/home");
            }, 500);
        }else{
            toast.error("아이디 또는 비밀번호를 확인해주세요.");
        }
    }catch (err){
        console.log(err);
    }
}

export const signupApi = async (
    username,
    nickname,
    password,
    navigate
) => {
    const data = {
        username: username,
        password: password,
        nickname: nickname
    }
    try{
        const res = await axios.post(`${baseUrl}/api/user/signup`, data, {
            headers:{
                "Content-Type": "application/json"
            }
        });
        console.log(res)
        if(res?.result === "Y"){
            toast.success("회원가입 완료");
            navigate("/");
        }
    }catch (err){
        console.log(err);
    }
}
