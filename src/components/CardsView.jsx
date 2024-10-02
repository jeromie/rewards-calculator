import React, { useState } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

// Toggle button for switching views
const ViewToggleButton = ({ active, onClick, label, classes }) => (
    <button
        className={` ${classes} ${!active ? 'bg-sky-700 text-white' : 'bg-sky-950 text-cyan-800'} p-1 px-3 mb-10 rounded`}
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

const CardsView = ({ results, value }) => {
    const [isListView, setIsListView] = useState(false)

    return (
        <>
            <div className='flex justify-center'>
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
            </div>
            <div className={`flex flex-wrap justify-center ${isListView ? 'gap-1' : 'gap-6'}`}>
                {results.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card info={data} value={value} isListView={isListView} />
                        </React.Fragment>
                    )
                })}
            </div>
        </>
    )
}

CardsView.propTypes = {
    results: PropTypes.array,
    value: PropTypes.string
}

export default CardsView