import styleButton from '@/styles/button.module.css';
import React from "react";

interface PropsButton {
  className?: string | '',
  textBtn?: string | '',
  onClick?: () => void,
  onChange?: () => void,
  onMouseOver: () => void,
  onMouseOut: () => void,
  disabled?: boolean | true,
  style?: any,
  key?: number | undefined,
  id?: string | undefined,
  children?: React.ReactNode;
  hover?: []
}

interface IButtonProps {
  children?: React.ReactNode,
  props?: any,
  onClick?: any,
  onMouseOver?: any,
  onMouseOut?: any,
  className?: string
  textButton?: string
  style?: any,
  hover?: {},
  disabled?: boolean,
  id?: string
}

//  Button component
const Button: React.FC<IButtonProps> = ({ onClick, onMouseOver, onMouseOut, children, className, textButton, style, disabled, id, hover, ...props }) => {
  return (

    <React.Fragment>
      <style jsx>{`

.customButton {
  display:flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  min-height: 30px;
  padding: 10px;
  margin: 0.50rem;
  padding: 0.25rem;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  color: black;
  background-color: var(--buttonColor);
  border: 1px solid transparent;
}

.customButton:hover {
  color: white;
  background-color: var(--baseColor);
  border: solid 1px var(--buttonColor);
  ${hover}
}

.customButton:active {
  background-color: var(--buttonColor);
}
`}</style>

      <button
        className={`${className} customButton`}
        style={style}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
        disabled={disabled}
        id={id}
        {...props}
      >

        {textButton}
        {children}
      </button>


    </React.Fragment>

  );
};

export default Button;