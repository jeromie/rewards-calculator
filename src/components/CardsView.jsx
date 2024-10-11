import React, { useEffect, useState } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import AddCard from './AddCard';
import { v4 as uuidv4 } from 'uuid';

const defaultData = {
    cardName: 'test',
    points: '1',
    spent: '100',
    reward: '1',
    rewardPoint: '1',
    accelerator: '5',
    acceleratedType: 'Bonus'
}

// Toggle button for switching views
const ViewToggleButton = ({ active, onClick, label, classes }) => (
    <button
        className={` ${classes} ${!active ? 'bg-sky-700 text-white' : 'bg-sky-950 text-cyan-800'} p-1 px-3 mb-6 sm:mb-10 rounded`}
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

const CardsView = ({ items, value }) => {
    const [isListView, setIsListView] = useState(false)
    const [showAddCard, setShowAddCard] = useState(false)
    const [cards, setCards] = useState(items)
    const [customCardData, setCustomCardData] = useState(defaultData)

    // Fetching from Local Storage
    const getCards = JSON.parse(localStorage.getItem("cardAdded"));
    useEffect(() => {
        if (getCards == null) {
            setCards(items)
        } else {
            setCards(getCards);
        }
    }, [getCards, items])

    const onAddCard = () => {
        setShowAddCard(true);
        setCustomCardData(defaultData);
    }

    const onSaveCard = (data) => {
        const { cardName: name, spent: per, isCustom = true, id, ...rest } = data;
        let updatedCards;
    
        if (id) {
            const localData = JSON.parse(localStorage.getItem('cardAdded')) || [];
            updatedCards = localData.map(x =>
                x.id === id ? { ...x, name, per } : x
            );
        } else {
            const id = uuidv4();
            const miles = data.reward / data.rewardPoint;
            const newCard = { id, name, per, miles, isCustom, ...rest };
            updatedCards = [newCard, ...cards];
        }
    
        setCards(updatedCards);
        localStorage.setItem("cardAdded", JSON.stringify(updatedCards));
        setShowAddCard(false);
    };

    const onEdit = (id) => {
        const singleCard = cards.find(item => item.id === id);

        if (singleCard) {
            const updatedCard = {
                ...singleCard,
                cardName: singleCard.name,
                spent: singleCard.per,
            };
            setCustomCardData(updatedCard);
            setShowAddCard(true);
        }
    }

    const onDelete = (id) => {
        const deleteCard = cards.filter((card)=>card.id !==id);
        setCards(deleteCard)
        localStorage.setItem("cardAdded", JSON.stringify(deleteCard));
    }

    return (
        <>
            <button onClick={onAddCard} className='text-white'>
                + Add card
            </button>

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

            <div className={`flex flex-wrap justify-center ${isListView ? 'gap-2 sm:gap-1' : 'gap-6'}`}>
                {cards.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card info={data} value={value} isListView={isListView} onEdit={onEdit} onDelete={onDelete} />
                        </React.Fragment>
                    )
                })}
            </div>

            {showAddCard && (
                <Dialog title='Add a Card' desc='Enter card details' onClose={()=>setShowAddCard(false)}>
                    <AddCard onSave={onSaveCard} data={customCardData}  />
                </Dialog>
            )}
        </>
    )
}

CardsView.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string
}

export default CardsView