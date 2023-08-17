import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TitleContext from './components/TitleContext'
import useFetch from './hooks/useFetch'
import HomePage from './pages/HomePage'
import PageLayout from './pages/PageLayout'
import './App.scss'

const App = () => {

  const url = 'http://api.programator.sk/gallery'
  const {data} = useFetch(url)

  return (
    <div className ='app'>
      <h1 className='app-header'>Fotogaléria</h1>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element={<HomePage/>}
          />
          {data && data.galleries.map((oneElement) => {
            const {path,image} = oneElement
            return(
                <Route 
                  key={image.modified} 
                  path={path} 
                  element={
                  <TitleContext.Provider value={path}>
                    <PageLayout title={path}/>
                  </TitleContext.Provider>
                  }
                />
            )
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App