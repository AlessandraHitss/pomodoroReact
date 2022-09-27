import styled from "styled-components";

export const Button = styled.button `
font-family: 'Poppins', sans-serif;
border: 2px solid #ff193d;
border-radius: 10px;
color: #fff;
width: 10rem;
background-color: transparent;
display: flex;
justify-content: center;
align-items: center;
padding: 0.7rem 1rem;
cursor: pointer;

&:hover {
    background-color: #ff193d;
    border:none;
    font-weight: 500;
}

`