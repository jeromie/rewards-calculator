import PropTypes from "prop-types"
import styled from "styled-components"
import ReactGA from 'react-ga4';

const Header = ({ value, setValue }) => {

    const onChange = (e) => {
        setValue(e.target.value)
        if (e.target.value === '') {
            setValue('0')
        }
        ReactGA.event({
            category: 'input',
            action: 'amount_update',
            value: Number(e.target.value),
        });
    }
    return (
        <HeaderWrapper>
            <div className='flex flex-col sm:flex-row justify-between items-center w-full'>
                <h1 className="">Reward Points Calculator</h1>
                <div className='flex flex-col items-center sm:items-end pt-5 sm:pr-4'>
                    <label htmlFor='transAmnt'>
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
                            className=' text-white bg-transparent'
                            id="transAmnt"
                        />
                    </div>
                </div>
            </div>
        </HeaderWrapper>
    )
}

Header.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func
}

export default Header

const HeaderWrapper = styled.header`
    color: white;
    background: linear-gradient(120deg, var(--brand-3) 0%, var(--brand-2) 50%, var(--brand) 100%);
    background-size: 400% 400%;

    animation: GradientMove 15s ease infinite;
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
        max-width: 650px;
        text-shadow: 0 5px 10px var(--border-1);
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
            appearance: textfield;
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

    @media (max-width: 767px) {
        height: 140px;
        h1 {
            font-size: 30px;
            line-height: 1.2;
            width: 100%;
            letter-spacing: -2px;
            text-align: center;
            max-width: none;
        }

        label {
            font-size: 16px;
            line-height: 1;
        }

        input {
            font-size: 60px;
        }
        .amount-input span{
            font-size: 60px;
        }
        .curr-symbl{
            font-size: 38px;
        }
    }
`