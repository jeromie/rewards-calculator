import * as TTip from '@radix-ui/react-tooltip';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Tooltip = ({
    children,
    content,
    side = 'top',
    sideOffset = 5,
    align = 'center',
    alignOffset = 0,
    hasWrapper = false,
    containerId,
    maxWidth = '100%',
    disableHoverableContent = false,
    disableScreenReader = false,
    delayDuration = 0,
    isOpen = undefined,
    onOpenChange,
    ...rest
}) => {
    const tooltipBlock = () => (
        <TooltipContent
            className='Content text-gray-300'
            sideOffset={sideOffset}
            side={side}
            align={align}
            alignOffset={alignOffset}
            {...rest}
        >
            <ContentWrapper $maxWidth={maxWidth} aria-hidden={disableScreenReader}>
                {content}
            </ContentWrapper>
            {<TTip.Arrow className='TooltipArrow' />}
        </TooltipContent>
    );

    const portalElement = document.getElementById(containerId);

    return (
        <TTip.Provider>
            <TTip.Root
                delayDuration={delayDuration}
                disableHoverableContent={disableHoverableContent}
                onOpenChange={onOpenChange}
                open={isOpen}
            >
                <TTip.Trigger asChild>
                    {hasWrapper ? (
                        <span role='button' tabIndex={0}>
                            {children}
                        </span>
                    ) : (
                        children
                    )}
                </TTip.Trigger>
                    <TTip.Portal
                        className='Portal'
                        container={portalElement ?? undefined}
                    >
                        {tooltipBlock()}
                    </TTip.Portal>
            </TTip.Root>
        </TTip.Provider>
    );
};

export default Tooltip;

Tooltip.propTypes = {
    value: PropTypes.string,
    side: PropTypes.string,
    sideOffset: PropTypes.number,
    align: PropTypes.string,
    alignOffset: PropTypes.number,
    hasWrapper: PropTypes.bool,
    containerId: PropTypes.string,
    maxWidth: PropTypes.string,
    disableHoverableContent: PropTypes.bool,
    disableScreenReader: PropTypes.bool,
    delayDuration: PropTypes.number,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
    children: PropTypes.any,
    content: PropTypes.string,
}

const ContentWrapper = styled.div`
    max-width: ${({$maxWidth}) => $maxWidth ? $maxWidth : 'none'};
`;

const TooltipContent = styled(TTip.Content)`
    border-radius: 0.75rem;
    padding: 0.25rem 0.5rem;
    background-color: var(--grey-1);
    border: 1px solid var(--border-1);
    word-wrap: break-word;
    font-size: 0.75rem;


    user-select: none;
    animation-duration: 300ms;
    animation-timing-function: ease-out;
    will-change: opacity;
    animation-name: fade;
    z-index: 999;

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .TooltipArrow {
        content: ' ';
        display: block;
        height: 8px;
        width: 8px;
        position: absolute;
        background-color: var(--grey-1);
        polygon {
            display: none;
        }
    }

    &[data-side='top'] {      
        margin-bottom: 4px;
        .TooltipArrow {
            border-bottom-right-radius: 0.25rem;
            border-bottom: 1px solid var(--border-1);
            border-right: 1px solid var(--border-1);
            bottom: 0;
            left: ${({ alignOffset }) => `calc(50% + ${alignOffset}px)`};
            transform: translateX(-50%) rotate(45deg);
        }
    }
    &[data-side='right'] {          
        margin-left: 6px;
        .TooltipArrow {
            border-top-left-radius: 0.25rem;
            border-top: 1px solid var(--border-1);
            border-left: 1px solid var(--border-1);
            left: -6px;
            top: ${({ alignOffset }) => `calc(50% + ${alignOffset}px)`};
            transform: translateY(-100%) rotate(225deg);
        }
    }
    &[data-side='bottom'] {          
        margin-top: 6px;
        .TooltipArrow {
            border-top-left-radius: 0.25rem;
            border-top: 1px solid var(--border-1);
            border-left: 1px solid var(--border-1);
            top: -12px;
            left: ${({ alignOffset }) => `calc(50% +  ${alignOffset}px)`};
            transform: translateX(-50%) rotate(225deg);
        }
    }
    &[data-side='left'] {
        margin-right: 6px;
        .TooltipArrow {
            border-top-right-radius: 0.25rem;
            border-top: 1px solid var(--border-1);
            border-right: 1px solid var(--border-1);
            right: -6px;
            top: ${({ alignOffset }) => `calc(50% + ${alignOffset}px)`};
            transform: translateY(-100%) rotate(135deg);
        }
    }
`;