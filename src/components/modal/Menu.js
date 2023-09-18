import React, {useState} from "react";
import styled from "styled-components";
import {blackBg, gray02, primary, whiteBg} from "../../constants/color";
import {MdOutlineCancel} from "react-icons/md";
import {PiFinnTheHumanFill} from "react-icons/pi";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../store/reducers/userSlice";
import {useDispatch} from "react-redux";
import NicknameChange from "./NicknameChange";
import WithdrawalModal from "./WithdrawalModal";

const Menu = ({
    nickname,
    setNickRefresh,
    setIsOpen
}) => {

    const navigate = useNavigate();
    const [isNickOpen, setIsNickOpen] = useState(false);
    const [isOutOpen, setIsOutOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("access-token");
        dispatch(setToken(""));
        navigate("/login");
    }
    const handleWithdrawal = () => {
        setIsOutOpen(true);
    }

    return (
        <StyledMenu>
            <div className="menu-inner">
                <div className="cancel-btn">
                    <MdOutlineCancel onClick={() => setIsOpen(false)} />
                </div>
                <div className="nick-wrap">
                    <PiFinnTheHumanFill className="nick-icon" />
                    <span className="nick-user">{nickname} 님</span>
                </div>
                <ul>
                    <li>
                        <button className="nickname-btn" type="button" onClick={() => {
                            setIsNickOpen(true);
                            setNickRefresh(false);
                        }}>닉네임 변경</button>
                    </li>
                    <li>
                        <button type="button">메뉴 준비중입니다.</button>
                    </li>
                    <li>
                        <button type="button">메뉴 준비중입니다.</button>
                    </li>
                    <li className="mt">
                        <button className="sm-btn" type="button" onClick={handleLogout}>로그아웃</button>
                        &nbsp;|&nbsp;
                        <button className="sm-btn" onClick={handleWithdrawal}>회원탈퇴</button>
                    </li>
                </ul>
            </div>

            {/*닉네임 변경*/}
            {isNickOpen &&
                <NicknameChange
                    nick={nickname}
                    setIsNickOpen={setIsNickOpen}
                    setNickRefresh={setNickRefresh}
                    setIsOpen={setIsOpen}
                />
            }
            {/*회원 탈퇴*/}
            {isOutOpen &&
                <WithdrawalModal
                    setIsOutOpen={setIsOutOpen}
                    setIsOpen={setIsOpen}
                />
            }
        </StyledMenu>
    )
}

const StyledMenu = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  .menu-inner {
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.85);
    width: 400px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px;
    .cancel-btn{
      font-size: 32px;
      text-align: right;
      svg{
        cursor: pointer;
      }
    }
    .nick-wrap{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid ${primary};
      .nick-icon{
        font-size: 30px;
        margin-right: 6px;
        color: ${primary};
      }
      .nick-user{
        font-weight: bold;
      }
    }
    ul{
      margin-top: 50px;
      li{
        margin-bottom: 30px;
        &.mt{margin-top: 50px;}
        button{
          font-size: 20px;
          cursor: pointer;
          &:hover{
            font-weight: bold;
          }
          &.sm-btn{
            font-size: 16px;
          }
        }
      }
    }
  }
`;

export default Menu;
