import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import TitleContext from './components/TitleContext/TitleContext';
import useFetchGet from './hooks/useFetchGet';
import HomePage from './pages/HomePage/HomePage';
import PageLayout from './pages/PageLayout/PageLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.scss';
import urlApi from './Constants';

const App = () => {

  const url = `${urlApi}gallery`;
  const [dataChange, setDataChange] = useState(false);
  const {data} = useFetchGet(url, dataChange);

  return (
    <div className ='app'>
      <h1 className='app-header'>Fotogaléria</h1>
      <BrowserRouter>
        <Routes>
          <Route 
            element={<HomePage setDataChange={setDataChange} dataChange={dataChange}/>}
            path='/'
          />
          {data?.galleries.map((oneElement) => {
            const {path} = oneElement
            return(
              <Route 
                key={path} 
                path={path}
                element={
                  <TitleContext.Provider value={path}>
                    <PageLayout title={path}/>
                  </TitleContext.Provider>
                }
              />
            )
          })}
          <Route 
            path='*'
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

