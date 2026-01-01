import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IconArrowUpRight } from '@tabler/icons-react';

interface ButtonProps {
    text?: string;
    color?: string;
    to?: string; // Add "to" prop for navigation
}

const StyledWrapper = styled.div<{ $clr: string }>`
  .button {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    border: none;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    background-color: ${(props) => props.$clr};
    color: #000;
    border-radius: 10rem;
    padding: 0.75rem 1.5rem;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s;
  }

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: ${(props) => props.$clr};
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button:hover {
    background-color: #ffff;
    color: #000;
  }

  .button:hover .button__icon-wrapper {
    color: #ffffff;
    background-color: #3B82F6;
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }
`;

const Button: React.FC<ButtonProps> = ({
    text = "Explore All",
    color = "#3B82F6",
    to = "/",
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <StyledWrapper $clr={color}>
            <button className="button" onClick={handleClick}>
                <span className="button__icon-wrapper">
                    <IconArrowUpRight size={20} className="button__icon-svg" />
                    <IconArrowUpRight size={20} className="button__icon-svg button__icon-svg--copy" />
                </span>
                {text}
            </button>
        </StyledWrapper>
    );
};

export default Button;
