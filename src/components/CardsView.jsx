import React, { useEffect, useState } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import AddCard from './AddCard';
import { v4 as uuidv4 } from 'uuid';
import { FlexDiv } from '../utils/helpers';

const defaultData = {
    cardName: 'My Awesome Card',
    points: '1',
    spent: '100',
    reward: '1',
    rewardPoint: '2',
    accelerator: '3',
    acceleratedType: 'Bonus',
}

// Toggle button for switching views
const ViewToggleButton = ({ active, onClick, label, classes }) => (
    <button
        className={` ${classes} ${!active ? 'bg-sky-700 text-white' : 'bg-sky-950 text-cyan-800'} p-1 px-3 rounded`}
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
    const [showAddCard, setShowAddCard] = useState({ show: false, isEdit: false })
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
    }, [items])

    const onAddCard = () => {
        setShowAddCard({ show: true, isEdit: false });
        setCustomCardData(defaultData);
    }

    const onSaveCard = (data) => {
        const { cardName: name, spent: per, isCustom = true, id, ...rest } = data;
        let updatedCards;

        if (id) {
            const localData = JSON.parse(localStorage.getItem('cardAdded')) || [];
            updatedCards = localData.map(x =>
                x.id === id ? { ...data, name, per } : x
            );
        } else {
            const id = uuidv4();
            const miles = data.reward / data.rewardPoint;
            const newCard = { id, name, per, miles, isCustom, ...rest };
            updatedCards = [newCard, ...cards];
        }

        setCards(updatedCards);
        localStorage.setItem("cardAdded", JSON.stringify(updatedCards));
        setShowAddCard({ show: false, isEdit: false });
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
            setShowAddCard({ show: true, isEdit: true });
        }
    }

    const onDelete = (id) => {
        const deleteCard = cards.filter((card) => card.id !== id);
        setCards(deleteCard)
        localStorage.setItem("cardAdded", JSON.stringify(deleteCard));
    }

    return (
        <>

            <FlexDiv className='justify-between items-center mb-6 sm:mb-10'>
                <button onClick={onAddCard} className='text-white bg-sky-700 rounded px-4 py-1 '>
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

            <div className={`flex flex-wrap justify-center ${isListView ? 'gap-2 sm:gap-1' : 'gap-6'}`}>
                {cards.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card info={data} value={value} isListView={isListView} onEdit={onEdit} onDelete={onDelete} />
                        </React.Fragment>
                    )
                })}
            </div>

            {showAddCard.show && (
                <Dialog title={`${showAddCard.isEdit ? 'Edit' : 'Add'} Card`} desc='Enter your reward earning rate and redemption rate below' maxWidth='500px' onClose={() => setShowAddCard({ show: false, isEdit: false })}>
                    <AddCard onSave={onSaveCard} data={customCardData} />
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