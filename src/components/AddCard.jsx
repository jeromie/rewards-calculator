import { useState } from "react"
import { FlexDiv } from "../utils/helpers"
import PropTypes from "prop-types"

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
        <div>
            <form onSubmit={onSubmit}>
                <FlexDiv className="flex-col">
                    <label htmlFor="cardName">
                        Card Name
                    </label>
                    <input
                        id='cardName' 
                        name='cardName' 
                        type="text" 
                        value={formData.cardName} 
                        onChange={handleInputChange} 
                        autoFocus
                        placeholder="Enter Card Name"
                        className="bg-transparent border rounded-md p-2 border-slate-500 "
                    />
                </FlexDiv>
                <FlexDiv className="gap-2">
                    <input
                        id='points' 
                        name='points' 
                        type="number" 
                        value={formData.points} 
                        onChange={handleInputChange} 
                        className="bg-transparent border rounded-md p-2 border-slate-500 " 
                    />
                    <label htmlFor="points">
                        points
                    </label>
                    per
                    <div className='curr-symbl'>₹</div>
                    <input
                        id='spent' 
                        name='spent' 
                        type="number" 
                        value={formData.spent} 
                        onChange={handleInputChange} 
                        className="bg-transparent border rounded-md p-2 border-slate-500 " 
                    />
                    <label htmlFor="spent">
                        spent
                    </label>
                </FlexDiv>
                <FlexDiv className="gap-2">
                    <input
                        id='reward' 
                        name='reward' 
                        type="number" 
                        value={formData.reward} 
                        onChange={handleInputChange} 
                        className="bg-transparent border rounded-md p-2 border-slate-500 " 
                    />
                    <label htmlFor="points">
                        miles
                    </label>
                    per
                    <input
                        id='rewardPoint' 
                        name='rewardPoint' 
                        type="number" 
                        value={formData.rewardPoint} 
                        onChange={handleInputChange} 
                        className="bg-transparent border rounded-md p-2 border-slate-500 " 
                    />
                    point
                </FlexDiv>

                <FlexDiv className="gap-2">
                    <input
                        id='accelerator' 
                        name='accelerator' 
                        type="number" 
                        value={formData.accelerator} 
                        onChange={handleInputChange} 
                        className="bg-transparent border rounded-md p-2 border-slate-500 " 
                    />
                    <label htmlFor="points">
                        x
                    </label>
                    <input
                        id='acceleratedType' 
                        name='acceleratedType' 
                        type="text" 
                        value={formData.acceleratedType} 
                        onChange={handleInputChange} 
                        className="bg-transparent border rounded-md p-2 border-slate-500 " 
                    />
                    Bonus type
                </FlexDiv>

                <button type="submit" className="p-2 border">
                    Save
                </button>
            </form>
        </div>
    )
}

AddCard.propTypes = {
    onSave: PropTypes.func,
    data: PropTypes.object
}

export default AddCard
