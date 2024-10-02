import { options } from './config';
import CardsView from './components/CardsView';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [value, setValue] = useState('1000')

  return (
    <>
      <Header setValue={setValue} value={value} />

      <div className='container mx-auto p-8'>
        <CardsView results={options} value={value} />
      </div>

      <Footer />
    </>
  )
}

export default App
