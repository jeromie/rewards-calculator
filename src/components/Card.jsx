import PropTypes from 'prop-types';
import styled from 'styled-components'
import Tooltip from './Tooltip';
import { FlexDiv } from '../utils/helpers';
import { LiaInfoCircleSolid, LiaPencilAltSolid, LiaTrashAlt } from 'react-icons/lia';
import { useState } from 'react';
import Dialog from './Dialog';
import ReactGA from 'react-ga4';
import CustomCard from './CustomCard';

const Card = ({ info, value, isListView, onEdit, onDelete }) => {
    const {
        id,
        img,
        cat,
        name,
        per,
        points,
        miles,
        accelerator,
        isMiles,
        isCashback,
        isHotel,
        acceleratedType,
        additionalInfo,
        isCustom
    } = info;

    const [isDialogVisible, setIsDialogVisible] = useState(false)

    const earnedPoints = Math.floor(value / per * points)
    const acceleratedPoints = Math.floor(value / per * points * accelerator)
    const earnedRewards = Math.floor(earnedPoints * miles)
    const acceleratedRewards = Math.floor(acceleratedPoints * miles)
    const earnedRate = ((earnedRewards / value || 0) * 100).toFixed(2)
    const acceleratedRate = ((acceleratedRewards / value) * 100 || 0).toFixed(2)

    const rewardText = isMiles ? 'Miles' : isCashback ? 'Cashback' : isHotel ? 'Hotels' : 'Reward'

    const onCardClick = () => {
        setIsDialogVisible(true)
        ReactGA.event({
            category: 'navigation',
            action: 'card_click',
            label: cat + '_' + name,
        });
    }

    return (
        <>
            <CardWrapper
                as={isCustom && 'div'}
                onClick={isCustom ? () => { } : onCardClick}
                $isListView={isListView}
                $isCustom={isCustom}
                className={`card border border-slate-700 flex justify-center w-full ${isListView ? 'flex-col sm:flex-row px-3 pt-3 sm:pt-0 pb-0 items-start sm:items-center' : 'max-w-sm flex-col pt-0 items-start sm:items-center p-4 pb-1'}`}
            >
                <div className={`flex ${isListView ? 'sm:w-60 items-end justify-start sm:items-center ' : ' sm:flex-col items-center'}`}>
                    <div className='img-wrapper'>
                        {isCustom ?
                            <CustomCard name={name} isListView={isListView} />
                            : (
                                <img src={img} alt='card image' className='card-img rounded border-neutral-700 border' aria-hidden />
                            )}
                    </div>
                    <h2 className={`card-name text-md sm:text-lg ml-2 sm:ml-0 font-bold mt-2 text-white flex-1 text-left  ${!isListView ? 'sm:text-center' : ''}`}>
                        {cat} {name}
                    </h2>
                </div>

                {isCustom && (
                    <FlexDiv className={`${isListView ? 'sm:flex-col top-2 right-3 gap-3 sm:bottom-auto sm:top-3 sm:right-6 sm:gap-3' : 'flex-row top-3 right-3 gap-2'} absolute`}>
                        <button onClick={() => onEdit(id)} className='text-slate-600 hover:text-slate-300 transition'><LiaPencilAltSolid size='1.25rem' /></button>
                        <button onClick={() => onDelete(id)} className='text-slate-600 hover:text-red-600 transition'><LiaTrashAlt size='1.25rem' /></button>
                    </FlexDiv>
                )}

                {isListView ?
                    (
                        <table className='reward-table mx-0 sm:mx-2 my-2 table-fixed text-center'>
                            <tbody className='text-slate-300'>
                                <tr className='border-b border-neutral-700'>
                                    <td className='text-left text-slate-400 pb-2'>Regular Spends</td>
                                    <td >{earnedPoints} points</td>
                                    <td >{isCashback && '₹'}{earnedRewards} {rewardText}</td>
                                    <td >{earnedRate}%</td>
                                </tr>
                                <tr>
                                    <td className='text-left text-slate-400 pt-2'> {acceleratedType}</td>
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
                                <tr className='text-slate-400 text-xs'>
                                    <th></th>
                                    <th>Regular Spends</th>
                                    <th>
                                        <FlexDiv className='items-center justify-center gap-1'>
                                            {acceleratedType}
                                            {additionalInfo && (
                                                <Tooltip content={additionalInfo} maxWidth='200px'>
                                                    <span className='relative bottom-0.5'>
                                                        <LiaInfoCircleSolid size='1.35em' />
                                                    </span>
                                                </Tooltip>
                                            )}
                                        </FlexDiv>
                                    </th>
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

            {isDialogVisible && (
                <Dialog
                    title={cat + ' ' + name}
                    onClose={() => setIsDialogVisible(false)}
                    info={info}
                />
            )}
        </>
    )
}

Card.propTypes = {
    info: PropTypes.object,
    value: PropTypes.string,
    isListView: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
}

export default Card

const CardWrapper = styled.button`
    background-color: var(--grey-2);
    cursor: ${({ $isCustom }) => $isCustom ? 'default' : 'pointer'};
    position: relative;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    .reward-table {
        font-size: 14px;
        width: 100%;
        @media (max-width: 767px){
            font-size: 12px;
        }
    }

    .img-wrapper {
        transform: perspective(400px) rotateY(30deg);
        transform-style: preserve-3d;
        transition: transform 0.3s ease-in-out;
        pointer-events: none;
        .card-img{
            transition: transform 0.3s ease-in-out;
            transform: rotateX(10deg) translateZ(30px) translateX(-20px);
            transform-origin: 0 0;
            max-height: 70px;
            @media (max-width: 767px){
                max-height: 50px;
            }
        }
    }

    &:hover .img-wrapper {
        transform: perspective(350px) rotateY(0deg);
        .card-img {
            transform: rotateX(0deg) translateZ(60px) translateX(0px) translateY(-5px);
            box-shadow: 0 5px 10px 0px hsl(0deg 0% 22.32% / 50%);
        }
    }

    ${({ $isListView }) => $isListView && `
        border: none;
        border-radius: 0;
        .img-wrapper {
            transform: none;
            .card-img {
                max-height: 30px;
                transform: none;
            }

            .custom-card{

            }
        }
        .card-name{
            font-size: 14px;    
            line-height: 1;
            margin: 0;
            padding-left: 8px;
        }
        &:hover .img-wrapper {
            .card-img {
                transform: rotateX(0deg) translateZ(80px) translateX(0px) translateY(0px);
                box-shadow: none;
            }
        }

        @media (max-width: 767px){
            .img-wrapper {
                display: none;    
            }
            .card-name {
                padding: 0;
            }
        }
    `}

`