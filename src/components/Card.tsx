import PropTypes from 'prop-types';
import styled from 'styled-components'
import React from 'react';

const Card = ({ info, value, isListView }) => {
    const { img, cat, name, per, points, miles, accelerator, isMiles, isCashback, isHotel, acceleratedType } = info;

    const earnedPoints = Math.floor(value / per * points)
    const acceleratedPoints = Math.floor(value / per * points * accelerator)
    const earnedRewards = Math.floor(earnedPoints * miles)
    const acceleratedRewards = Math.floor(acceleratedPoints * miles)
    const earnedRate = ((earnedRewards / value || 0) * 100).toFixed(2)
    const acceleratedRate = ((acceleratedRewards / value) * 100 || 0).toFixed(2)

    const rewardText = isMiles ? 'Miles' : isCashback ? 'Cashback' : isHotel ? 'Hotels' : 'Reward'

    return (
        <CardWrapper
            isListView={isListView}
            className={`card border border-neutral-700 flex items-center justify-center p-4 pb-1 w-full ${isListView ? 'flex-col sm:flex-row pt-0 pb-0' : 'max-w-sm flex-col pt-0'}`}
        >
            <div className={`flex ${isListView ? 'w-60 items-center' : ' flex-col items-center'}`}>
                <div className='img-wrapper'>
                    <img src={img} alt='card image' className='rounded border-neutral-700 border' />
                </div>
                <h5 className='text-lg font-bold mt-2 text-white flex-1'>
                    {cat} {name}
                </h5>
            </div>

            {isListView ?
                (
                    <table className='reward-table m-2 table-fixed'>
                        <tbody className='text-slate-300'>
                            <tr className='border-b border-neutral-700'>
                                <td className='text-left text-slate-400'>Regular</td>
                                <td >{earnedPoints} points</td>
                                <td >{isCashback && '₹'}{earnedRewards} {rewardText}</td>
                                <td >{earnedRate}%</td>
                            </tr>
                            <tr>
                                <td className='text-left text-slate-400'> {acceleratedType}</td>
                                <td>{acceleratedPoints} points</td>
                                <td>{isCashback && '₹'}{acceleratedRewards} {rewardText}</td>
                                <td>{acceleratedRate}%</td>
                            </tr>
                        </tbody>
                    </table>
                )
                : (
                    <table className='text-center reward-table m-2'>
                        <thead className='border-b border-neutral-700'>
                            <tr className='text-slate-400  text-xs'>
                                <th></th>
                                <th>Regular</th>
                                <th>{acceleratedType}</th>
                            </tr>
                        </thead>
                        <tbody className='text-slate-300'>
                            <tr className='border-b border-neutral-700'>
                                <td className='text-left text-slate-400'>Points</td>
                                <td>{earnedPoints}</td>
                                <td>{acceleratedPoints}</td>
                            </tr>
                            <tr className='border-b border-neutral-700'>
                                <td className='text-left text-slate-400'>{rewardText}</td>
                                <td >{earnedRewards}</td>
                                <td >{acceleratedRewards}</td>
                            </tr>
                            <tr>
                                <td className='text-left text-slate-400'>Reward rate</td>
                                <td>{earnedRate}%</td>
                                <td>{acceleratedRate}%</td>
                            </tr>
                        </tbody>
                    </table>
                )
            }

        </CardWrapper>
    )
}

Card.propTypes = {
    info: PropTypes.object,
    value: PropTypes.string,
    isListView: PropTypes.bool
}

export default Card

const CardWrapper = styled.div<{ isListView: boolean }>`
    background-color: var(--dark-2);
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    .reward-table {
        font-size: 14px;
        width: 100%;
    }

    .img-wrapper {
        transform: perspective(400px) rotateY(30deg);
        transform-style: preserve-3d;
        transition: transform 0.3s ease-in-out;
        img {
            transition: transform 0.3s ease-in-out;
            transform: rotateX(10deg) translateZ(30px) translateX(-20px);
            transform-origin: 0 0;
            max-height: 70px;
            /* box-shadow: -5px 5px 5px 0px hsl(0deg 0% 22.32% / 50%); */
        }
    }

    &:hover .img-wrapper {
        transform: perspective(350px) rotateY(0deg);
        img {
            transform: rotateX(0deg) translateZ(60px) translateX(0px) translateY(-5px);
            box-shadow: 0 5px 10px 0px hsl(0deg 0% 22.32% / 50%);
        }
    }

    ${({ isListView }) => isListView && `
        border: none;
        border-radius: 0;
        .img-wrapper {
            transform: none;
            img {
                max-height: 30px;
                transform: none;
                // min-width: 50px;
                // object-fit: contain;
            }
        }
        h5{
            font-size: 14px;    
            line-height: 1;
            margin: 0;
            padding-left: 8px;
        }
        &:hover .img-wrapper {
        img {
            transform: rotateX(0deg) translateZ(80px) translateX(0px) translateY(0px);
            box-shadow: none;
        }
    }
    `}

`