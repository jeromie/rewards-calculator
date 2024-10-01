import React from "react"
import styled from "styled-components"

const Header = ({ value, setValue }) => {

    const onChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <HeaderWrapper>
            <div className='flex flex-col md:flex-row justify-between items-center w-full'>
                <h1 className="">Reward Points<br />Calculator</h1>
                <div className='flex flex-col items-end pr-4'>
                    <label>
                        Transaction Amount
                    </label>
                    <div className='flex amount-input gap-1 items-baseline'>
                        <div className='curr-symbl'>₹</div>
                        <span>
                            {value}
                        </span>
                        <input
                            value={value}
                            onChange={onChange}
                            min='0'
                            type='number'
                            placeholder='Enter amount'
                            className=' text-white bg-transparent'
                        />
                    </div>
                </div>
            </div>
        </HeaderWrapper>
    )
}

export default Header

const HeaderWrapper = styled.header`
    color: white;
    background: linear-gradient(135deg, #14b289, #1e2696);
    background-size: 400% 400%;

    animation: GradientMove 20s ease infinite;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 160px;
    overflow: hidden;

    h1{
        font-size: 120px;
        line-height: 92px;
        opacity: 0.5;
        letter-spacing: -14px;
        position: relative;
        top: 10px;
        width: 600px;
        flex: 1;
        @media (max-width: 767px) {
            font-size: 40px;
            line-height: 45px;
            width: 100%;
            letter-spacing: -2px;
            text-align: center;
        }
    }

    label {
        font-size: 18px;
        opacity: 0.7;
    }

    input {
        font-size: 80px;
        line-height: 1;
        text-align: right;
        width: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        &[type=number] {
            -moz-appearance: textfield;
        }
        &:focus {
            outline: none;
        }
    }

    .amount-input{
        position: relative;
    }
    .curr-symbl{
        font-size: 40px;
        opacity: 0.7;
        line-height: 1;
    }
    .amount-input span{
        font-size: 80px;
        line-height: 1;
        visibility: hidden;
    }

    @keyframes GradientMove {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
`