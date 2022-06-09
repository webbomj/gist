import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AppMain from './components/AppMain/AppMain'
import { initData} from './features/counter/coreSlice';
import { useAppDispatch} from './app/hooks';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initData('https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62'))
  },[])
  
  return (
    <div className="App">
      <Header/>
      <AppMain/>
    </div>
  );
}

export default App;
