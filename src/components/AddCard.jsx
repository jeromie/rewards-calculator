import { useState } from "react"
import { FlexDiv } from "../utils/helpers"
import PropTypes from "prop-types"
import styled from "styled-components";

const AddCard = ({ onSave, data }) => {

    const [formData, setFormData] = useState(data);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSave(formData)
    }

    return (
        <FormWrapper>
            <form onSubmit={onSubmit}>
                <FlexDiv className="gap-2 items-end flex-wrap">
                    <label htmlFor="cardName">
                        Card Name:
                    </label>
                    <CardName
                        id='cardName'
                        name='cardName'
                        type="text"
                        autoComplete="off"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        autoFocus
                        placeholder="Enter Card Name"
                    />
                    <small>You can enter the name of your card here</small>
                </FlexDiv>

                <FlexDiv className="gap-2 mt-8 items-end flex-wrap">
                    Earn
                    <StyledInput
                        id='points'
                        name='points'
                        type="number"
                        value={formData.points}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="points">
                        point{formData.points > 1 ? 's' : ''}
                    </label>
                    for every
                    <div className='curr-symbl'>₹</div>
                    <StyledInput
                        id='spent'
                        name='spent'
                        type="number"
                        value={formData.spent}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="spent">
                        spent.
                    </label>
                    <small>How many reward points do you earn per `x` Rupees spent? <br />
                        Example: If your reward rate is 1%, enter 1 point for every ₹100 spent</small>
                </FlexDiv>

                <FlexDiv className="gap-2 mt-8 items-end flex-wrap">
                    Redeem
                    <StyledInput
                        id='rewardPoint'
                        name='rewardPoint'
                        type="number"
                        value={formData.rewardPoint}
                        onChange={handleInputChange}
                    />
                    point{formData.rewardPoint > 1 ? 's' : ''} to earn
                    <StyledInput
                        id='reward'
                        name='reward'
                        type="number"
                        value={formData.reward}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="points">
                        reward{formData.reward > 1 ? 's' : ''}.
                    </label>
                    <small>How many reward points are required to redeem for `x` amount of Cashback, Miles, or Hotel points?</small>
                </FlexDiv>

                <FlexDiv className="gap-2 mt-8 items-end flex-wrap">
                    Bonus:
                    <StyledInput
                        id='accelerator'
                        name='accelerator'
                        type="number"
                        value={formData.accelerator}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="points">
                        x
                    </label>
                    <small>Bonus rate if spends are on a specific category / merchant / portal. <br />
                        Example: If your bonus reward rate is 5%, enter 5<br />
                        Note: This is not for milestone rewards.
                    </small>
                </FlexDiv>

                <button type="submit" className="py-2 px-6 mt-8 rounded-md bg-sky-700">
                    Save
                </button>
            </form>
        </FormWrapper>
    )
}

AddCard.propTypes = {
    onSave: PropTypes.func,
    data: PropTypes.object
}

export default AddCard

const FormWrapper = styled.div`
    small {
        font-size: 13px;
        font-weight: 400;
        color: var(--grey-4);
    }
`;

const StyledInput = styled.input`
    background-color: transparent;
    padding: 6px 4px;
    border: 2px solid var(--border-1);
    width: 50px;
    font-size: 20px;
    line-height: 1;
    transition: all 0.3s ease-in-out;
    text-align: center;
    color: white;

    &:active, &:focus{
        outline: none;
        border-color: var(--brand);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type=number] {
        -moz-appearance: textfield;
        appearance: textfield;
    }
`

const CardName = styled(StyledInput)`
    width: 300px;
    text-align: left;
    border-top: none;
    border-left: none;
    border-right: none;
`