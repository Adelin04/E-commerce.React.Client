import React from "react";
import styledComponents from "styled-components";

//  Button component
const Button = ({
  textBtn,
  onClick = null,
  onChange = null,
  style = null,
  key = null,
  id = null,
}) => {
  return (
    <Wrapper>
      <button
        key={key}
        id={id}
        style={style}
        onClick={onClick}
        onChange={onChange}
        className="prjectsApp-btn"
      >
        {textBtn}
      </button>
    </Wrapper>
  );
};

export default Button;

const Wrapper = styledComponents.div`
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      
      .prjectsApp-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--buttonColor);
        width: 60%;
        min-height: 25px;
        margin: auto;
        border-radius: 5px;
        border: none;
        color: white;
        text-align: center;
        cursor: pointer;
        outline: none;
      }
      
      @media only screen and (max-width: 420px) {
        .prjectsApp-btn {
          max-width: 60%;
          // width: auto;
          height: auto;
          margin: 0px;
          font-size: 10px;
          text-align: center;
        }
  }
  
  @media only screen and (max-width: 320px) {
    .prjectsApp-btn {
      font-size: 8px;
    }
  }
    
  
`;
