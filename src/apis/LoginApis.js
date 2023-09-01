import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = "https://port-0-savings-book-backend-eu1k2llladze0x.sel3.cloudtype.app";


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
