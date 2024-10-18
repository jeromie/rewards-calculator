import PropTypes from "prop-types";
import { FlexDiv } from "../utils/helpers"

// Toggle button for switching views
const ViewToggleButton = ({ active, onClick, label, classes }) => (
    <button
        className={` ${classes} ${!active ? 'btn' : 'bg-sky-950 text-cyan-800'} p-1 px-3 rounded`}
        onClick={onClick}
        disabled={active}
    >
        {label}
    </button>
);

ViewToggleButton.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
    label: PropTypes.string,
    classes: PropTypes.string,
};

const ViewControls = ({ isListView, setIsListView, onAddCard }) => {
    return (
        <FlexDiv className='justify-between items-center mb-6 sm:mb-10'>
            <button onClick={onAddCard} className='btn rounded px-4 py-1'>
                + Add card
            </button>

            <FlexDiv className='justify-center'>
                <ViewToggleButton
                    active={isListView}
                    onClick={() => setIsListView(true)}
                    label="List view"
                    classes='rounded-tr-none rounded-br-none'
                />
                <ViewToggleButton
                    active={!isListView}
                    onClick={() => setIsListView(false)}
                    label="Grid view"
                    classes='rounded-tl-none rounded-bl-none'
                />
            </FlexDiv>
        </FlexDiv>
    )
}

ViewControls.propTypes = {
    isListView: PropTypes.bool,
    setIsListView: PropTypes.func,
    onAddCard: PropTypes.func,
};

export default ViewControls
