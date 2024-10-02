import styled from "styled-components";

const Footer = () => {
    return(
        <Wrapper className="border-t border-t-slate-700 text-slate-400 p-4 text-xs">
            All Rights Reserved 2024
        </Wrapper>
    )
}

export default Footer;

const Wrapper = styled.footer`
    display: flex;
    width: 100%;
    background-color: var(--grey-2);
    align-items: center;
    justify-content: center;
`;