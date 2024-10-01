import React, { useState } from 'react';
import Card from './Card';

const CardsView = ({ results, value }) => {
    const [isListView, setIsListView] = useState(false)

    return (
        <>
            <div className='flex justify-center'>
                <button
                    className={`${!isListView ? 'bg-sky-700 text-white' : 'bg-sky-950  text-cyan-800'} p-1 px-3 mb-10 rounded rounded-tr-none rounded-br-none`}
                    onClick={() => setIsListView(true)}
                    disabled={isListView}
                >
                    List view
                </button>
                <button
                    className={`${isListView ? 'bg-sky-700 text-white' : 'bg-sky-950 text-cyan-800'} p-1 px-3 mb-10 rounded rounded-tl-none rounded-bl-none`}
                    onClick={() => setIsListView(false)}
                    disabled={!isListView}
                >
                    Grid view
                </button>
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

export default CardsView