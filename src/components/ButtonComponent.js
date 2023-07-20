import React from 'react';
import styled from 'styled-components';

//type에 따라서 초록 버튼인지 회색 테두리 버튼인지 결정하게 수정하면 편함

const Button = styled.div`
    width: 80%;
    height: 50px;

    border-radius: 1.5rem;
    background-color: ${props =>
        props.type === true ? '#00462A'
            : props.type === 'result' ? '#00462A'
                : props.theme.white};
    cursor:pointer;
    margin: auto;
    margin-bottom:1.5rem;
    /* display: inline-flex; */

    color:${props =>
        props.type === 'result' ? 'white'
            : 'black'};

    display:flex;
    justify-content:center;
    align-items:center;
    font-weight: 400;
    font-size:1.3rem;
    border:${props => props.type === 'result' ? '1px solid #00462A' : '1px solid lightgray'};

    /* :hover{
        background-color: ${props => '#00462A'};
        border:3px solid #00462A;
        color:white;
    } */

`

function ButtonComponent({ idx, type, text, onclick }) {

    const onClickBtn = () => {
        onclick(idx);
    }

    return (
        <Button onClick={onClickBtn}>{text}</Button>
    );

}

export default ButtonComponent;