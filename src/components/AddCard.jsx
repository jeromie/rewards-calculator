import { useEffect, useReducer, useState } from "react"
import { FlexDiv, generateRandomColor } from "../utils/helpers"
import PropTypes from "prop-types"
import styled from "styled-components";
import Dialog from "./Dialog";

function getCardColor(state, action) {
    if (action.type === 'generate_color') {
        return {
            color1: generateRandomColor(),
            color2: generateRandomColor()
        };
    }
    throw Error('Unknown action.');
}

const AddCard = ({ onSave, data, showAddCard, setShowAddCard }) => {

    const { isEdit } = showAddCard;

    const [formData, setFormData] = useState(data);

    const [color, dispatch] = useReducer(getCardColor, { color1: '', color2: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            onSave(formData)
        } else {
            dispatch({ type: 'generate_color' })
        }
    }

    useEffect(() => {
        if (color.color1 && color.color2) {
            setFormData((prevData) => ({
                ...prevData,
                color,
            }));
        }
    }, [color]);

    useEffect(() => {
        if (formData.color && !isEdit) {
            onSave(formData);
        }
    }, [formData, onSave, isEdit]);

    return (
        <Dialog
            title={`${isEdit ? 'Edit' : 'Add'} Card`}
            desc='Enter your reward earning rate and redemption rate below'
            maxWidth='500px'
            onClose={() => setShowAddCard({ show: false, isEdit: false })}
        >
            <FormWrapper>
                <form onSubmit={onSubmit} id='cardForm'>
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
                            Example: If your bonus reward rate is 5x, enter 5<br />
                            Note: This is not for milestone rewards.
                        </small>
                    </FlexDiv>

                    <button type="submit" className="py-2 px-6 mt-8 rounded-md btn">
                        Save
                    </button>
                </form>
            </FormWrapper>
        </Dialog>
    )
}

AddCard.propTypes = {
    onSave: PropTypes.func,
    setShowAddCard: PropTypes.func,
    data: PropTypes.object,
    showAddCard: PropTypes.object
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
    border-radius: 4px;
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
    border-radius: 0;
`