import './ImagesGrid.scss'
import { useState, useContext } from 'react'
import { MdOutlineFolderOff } from "react-icons/md";
import useFetch from '../hooks/useFetch'
import TitleContext from '../components/TitleContext'
import LightboxGallery from './LightboxGallery'
import AddPhotoIco from './AddPhotoIco'
import Loader from './Loader';
 
const ImagesGrid = ({setForm}) => {
  const currentCategory = useContext(TitleContext)
  const [lightbox, setLightBox] = useState(false)
  const [clickedImg, setClickedImg] = useState(null)
  const url = 'http://api.programator.sk/gallery/'+currentCategory
  const urlImages = 'http://api.programator.sk/images'
  const {data, loading,  error} = useFetch(url)

  const handelClick = (fullpath) => {
    setClickedImg(fullpath)
    setLightBox(true)
  }

  return (
        <>
          {loading && <Loader/>}
          {data && <div className='imagesgrid'>
              {data.images.map((element) => {
                  const {fullpath,modified} = element
            
                  const width = 304;
                  const height = 295;
                  
                  const imgUrl = urlImages+'/'+width+'x'+height+'/'+fullpath
                  
                  return(
                      <div key={fullpath+'-'+modified} 
                          className='imagesgrid-img-wrap' >
                          <img 
                            src={imgUrl} 
                            alt='pics'
                            onClick={() => {handelClick(fullpath)}}
                          />
                      </div>
                  )
              })}
            {error && 
              <div className='imagesgrid-error-wrap'>
                <MdOutlineFolderOff className='imagesgrid-error-ico'/>
                <div className='imagesgrid-error-text'>{error}</div>
              </div>
            }
              <AddPhotoIco setForm={setForm}/>
              {lightbox && <LightboxGallery 
                  setLightbox={setLightBox}
                  clickedImg={clickedImg}
                  data={data}
                  loading={loading}
                />
              }
          </div>}
        </>
  )
}

export default ImagesGrid