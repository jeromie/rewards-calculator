import React, { useMemo, useState } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import AddCard from './AddCard';
import Filters from './Filters';
import ViewControls from './ViewControls';
import useFetchCards from '../hooks/useFetchCards';

const CardsView = ({ value }) => {
    const [isListView, setIsListView] = useState(false)

    const {
        defaultCards,
        customCards,
        filters,
        customCardData,
        showAddCard,
        handleFilterChange,
        onSaveCard,
        onEdit,
        onDelete,
        onAddCard,
        setShowAddCard
    } = useFetchCards();

    const sortCards = (a, b) => {
        if (a.bank && b.bank) {
            const bankComparison = a.bank.localeCompare(b.bank);
            return bankComparison !== 0 ? bankComparison : a.name.localeCompare(b.name);
        }
        return a.name.localeCompare(b.name);
    };

    const sortedCards = useMemo(() => defaultCards.sort(sortCards), [defaultCards]);

    const allCards = useMemo(() => [...customCards, ...sortedCards], [customCards, sortedCards]);

    const filteredCards = useMemo(() => allCards.filter(item => filters[item.id]), [allCards, filters]);

    return (
        <>
            <ViewControls isListView={isListView} setIsListView={setIsListView} onAddCard={onAddCard} />

            <div className={`flex flex-wrap justify-center ${isListView ? 'gap-2 sm:gap-1' : 'gap-6'}`}>
                {filteredCards.map(item => (
                    <React.Fragment key={item.id}>
                        <Card
                            info={item}
                            value={value}
                            isListView={isListView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </React.Fragment>
                )
                )}
            </div>

            {showAddCard.show && (
                <AddCard onSave={onSaveCard} data={customCardData} showAddCard={showAddCard} setShowAddCard={setShowAddCard} />
            )}

            <Filters cards={allCards} onFilterChange={handleFilterChange} filters={filters} />
        </>
    )
}

CardsView.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string
}

export default CardsView