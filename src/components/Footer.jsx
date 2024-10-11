import styled from "styled-components";
import ReactGA from 'react-ga4';

const Footer = () => {

    const onDonateClick = () => {
        ReactGA.event({
            category: 'click',
            action: 'donate_click',
        });
    }
    return(
        <Wrapper className="text-xs text-center text-slate-500">
            <div className="p-3">
                Disclaimer: The calculations provided are estimates of potential rewards and may not reflect the exact points you will earn. 
                <br />Data is as of October 1, 2024. Please note that reward rates and card features are subject to change by financial institutions, and some information may become outdated. 
                <br />We recommend verifying details directly with your card issuer for the most accurate and up-to-date information.
            </div>
            <BottomFooter className="border-t border-t-slate-700 text-slate-400 p-4 mt-2">
                All Rights Reserved 2024

                <div className="my-2">
                <a href='https://buymeacoffee.com/cluelesscoder' onClick={onDonateClick} target="_blank" className="underline text-slate-400">
                    Buy me a Coffee ☕️ / Beer 🍺
                </a>
                </div>
            </BottomFooter>
        </Wrapper>
    )
}

export default Footer;

const Wrapper = styled.footer`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const BottomFooter = styled.div`
    width: 100%;
    background-color: var(--grey-2);
`;