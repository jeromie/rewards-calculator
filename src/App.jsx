import { options } from './config';
import CardsView from './components/CardsView';
import { useState } from 'react';
import Header from './components/Header';

function App() {

  const [value, setValue] = useState('1000')

  return (
    <>
      <Header setValue={setValue} value={value} />

      <div className='container mx-auto p-8'>
        <CardsView results={options} value={value} />
      </div>
    </>
  )
}

export default App
