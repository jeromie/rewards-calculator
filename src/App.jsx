import { options } from './config';
import CardsView from './components/CardsView';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';
import ReactGA from 'react-ga4';

function App() {

  ReactGA.initialize("G-E7XXFKEYHG");
  ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });

  const [value, setValue] = useState('1000')

  return (
    <>
      <Header setValue={setValue} value={value} />

      <ContentWrapper className='container mx-auto p-5 sm:p-8'>
        <CardsView results={options} value={value} />
      </ContentWrapper>

      <Footer />
    </>
  )
}

export default App

const ContentWrapper = styled.div`
  min-height: calc(100vh - 160px - 50px);
`;
