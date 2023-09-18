import React, {useState} from "react";
import styled from "styled-components";
import {blackBg, eat, gray01, gray02, income, primary, whiteBg} from "../../constants/color";

const ThemeChange = ({
    setIsThemeOpen
}) => {

    const storageTheme = localStorage.getItem("primary");
    const [theme, setTheme] = useState(storageTheme);

    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        localStorage.setItem("primary", selectedTheme);
        setIsThemeOpen(false);
        window.location.reload();
    };

    return(
        <StyledModal>
            <div className="modal-inner">
                <h3>테마 변경</h3>
                <ul>
                    <li>
                        <input
                            type="radio"
                            name="theme"
                            id="color1"
                            value="#6a7ddf"
                            checked={theme === "#6a7ddf"}
                            onChange={handleThemeChange}
                        />
                        <label htmlFor="color1" className="theme-btn color1"></label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="theme"
                            id="color2"
                            value="#FF7B54"
                            checked={theme === "#FF7B54"}
                            onChange={handleThemeChange}
                        />
                        <label htmlFor="color2" className="theme-btn color2"></label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="theme"
                            id="color3"
                            value="#FFB26B"
                            checked={theme === "#FFB26B"}
                            onChange={handleThemeChange}
                        />
                        <label htmlFor="color3" className="theme-btn color3"></label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="theme"
                            id="color4"
                            value="#f677f3"
                            checked={theme === "#f677f3"}
                            onChange={handleThemeChange}
                        />
                        <label htmlFor="color4" className="theme-btn color4"></label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="theme"
                            id="color5"
                            value="#939B62"
                            checked={theme === "#939B62"}
                            onChange={handleThemeChange}
                        />
                        <label htmlFor="color5" className="theme-btn color5"></label>
                    </li>
                </ul>
                <button type="button" className="cancel-btn" onClick={() => setIsThemeOpen(false)}>취소</button>
            </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;

  .modal-inner {
    z-index: 9;
    background-color: ${whiteBg};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 325px;
    text-align: center;
    padding: 40px 20px 30px;
    border-radius: 20px;

    h3 {
      font-size: 18px;
      margin-bottom: 25px;
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;

      li {
        input {
          display: none;
        }

        label {
          display: block;
          width: 50px;
          height: 50px;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          cursor: pointer;

          &.color1 {
            background-color: #6a7ddf;
          }

          &.color2 {
            background-color: #FF7B54;
          }

          &.color3 {
            background-color: #FFB26B;
          }

          &.color4 {
            background-color: #f677f3;
          }

          &.color5 {
            background-color: #939B62;
          }
        }

        input:checked + label {
          border: 3px solid #e72b2b;
        }
      }
    }
    .cancel-btn{
        display: block;
        width: 100%;
        border-radius: 8px;
        padding: 8px 0;
        margin-top: 16px;
        cursor: pointer;
        background-color: ${whiteBg};
        color: ${gray01};
        border: 1px solid ${gray01};
      }
  }
`;

export default ThemeChange;
