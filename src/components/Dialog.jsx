import * as D from '@radix-ui/react-dialog';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlexDiv } from '../utils/helpers';
import { FaTimes } from 'react-icons/fa';
import parse from 'html-react-parser';
import ReactGA from 'react-ga4';

export default function Dialog({
    title = '',
    onClose = undefined,
    children = null,
    width = '90vw',
    maxWidth = '850px',
    maxHeight = '85vh',
    imgAlt = '',
    imgWidth = '160',
    imgHeight = 'auto',
    top = '50%',
    contentStyle = {},
    info,
}) {

    ReactGA.event({
        category: "Card view",
        action: "Dialog opened",
        label: title,
    });

    return (
        <D.Root open={true} className='DialogRoot'>
            <D.Portal className='DialogPortal'>
                    <div>
                        <Overlay
                            className='DialogOverlay'
                            onClick={onClose}
                        />
                        <Content
                            className='DialogContent bg-slate-800 border border-slate-700 rounded-xl'
                            width={width}
                            $maxWidth={maxWidth}
                            $maxHeight={maxHeight}
                            style={contentStyle}
                            top={top}
                        >
                            <FlexDiv className='gap-5 flex-col sm:flex-row items-start overflow-auto'>
                                {info.img ? (
                                    <ImgWrapper className='DialogImgWrapper rounded-lg items-start sm:items-center'>
                                        <img
                                            className='DialogImg rounded-lg'
                                            src={info.img}
                                            alt={imgAlt || title}
                                            width={imgWidth}
                                            height={imgHeight}
                                        />

                                        {info.referralLink ? (
                                            <a href={info.referralLink} target='blank' className='text-blue-400 underline hover:text-teal-600'>Apply now</a>
                                        ): null}
                                    </ImgWrapper>
                                ) : null}

                                <div className='flex-1'>
                                    {title ? (
                                        <Title className='DialogTitle'>{title}</Title>
                                    ) : null}
                                    {info.desc ? (
                                        <Description
                                            className='DialogDescription text-slate-300'
                                        >
                                            {parse(info.desc)}
                                        </Description>
                                    ) : null}
                                    {info.fee ? (
                                        <div className='mb-4'>
                                            <h5 className='text-sm font-bold'>
                                                Fee:
                                            </h5>
                                            <p className='text-slate-300'>
                                                {parse(info.fee)}
                                            </p>
                                        </div>
                                    ) : null}
                                    {info.rewardInfo ? (
                                        <div className='mb-4'>
                                            <h5 className='text-sm font-bold'>
                                                Reward details:
                                            </h5>
                                            <ul className='text-slate-300 pl-5'>
                                                {info.rewardInfo.map((i, index)=>{
                                                    return(
                                                        <li key={index} className='list-disc'>{i}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    ) : null}
                                    {info.milestoneInfo.length ? (
                                        <div className='mb-4'>
                                            <h5 className='text-sm font-bold'>
                                                Milestone details:
                                            </h5>
                                            <ul className='text-slate-300 pl-5'>
                                                {info.milestoneInfo.map((i, index)=>{
                                                    return(
                                                        <li key={index} className='list-disc'>{i}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    ) : null}
                                    {info.siteLink ? (
                                        <a href={info.siteLink} target='blank' className='text-blue-400 underline hover:text-teal-600'>View more details</a>
                                    ): null}
                                </div>
                            </FlexDiv>
                            {(
                                <D.Close asChild className='DialogClose'>
                                    <Close
                                        className='DialogCloseButton'
                                        aria-label='Close dialog'
                                        onClick={onClose}
                                    >
                                        <FaTimes
                                            height='1.5rem'
                                            width='1.5rem'
                                            color='white'
                                        />
                                    </Close>
                                </D.Close>
                            )}
                            {children ? children : null}
                        </Content>
                    </div>
            </D.Portal>
        </D.Root>
    );
}

Dialog.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.any,
    width: PropTypes.string,
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string,
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    imgWidth: PropTypes.number,
    imgHeight: PropTypes.number,
    top: PropTypes.string,
    contentStyle: PropTypes.object,
    info: PropTypes.object
}

const Overlay = styled(D.Overlay)`
    background-color: hsl(217.5deg 46.15% 10.2% / 60%);
    position: fixed;
    inset: 0;
    animation: overlayShow 300ms cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 999;
    backdrop-filter: blur(5px);

    @keyframes overlayShow {
        from {
            backdrop-filter: blur(0);
        }
        to {
            backdrop-filter: blur(5px);
        }
    }
`;

const Content = styled(D.Content)`
    padding: 1.5rem;
    position: fixed;
    top: ${({ top }) => top};
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ width }) => width};
    max-width: ${({ $maxWidth }) => $maxWidth};
    max-height: ${({ $maxHeight }) => $maxHeight};
    animation: contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    color: white;
    &:focus {
        outline: none;
    }
    z-index: 1001;

    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

const Title = styled(D.Title)`
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
`;

const Description = styled(D.Description)`
    font-size: 16px;
    line-height: 1.4;
    padding-top: 0.75rem;
    padding-bottom: 1rem;
`;

const ImgWrapper = styled(FlexDiv)`
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`;

const Close = styled.button`
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1rem;
`;
