import './ImagesGrid.scss';
import { useState, useContext } from 'react';
import { MdOutlineFolderOff } from "react-icons/md";
import useFetchGet from '../../hooks/useFetchGet';
import TitleContext from '../TitleContext/TitleContext';
import LightboxGallery from '../LightboxGallery/LightboxGallery';
import AddPhotoIco from '../AddPhotoIco/AddPhotoIco';
import Loader from '../Loader/Loader';
import urlApi from '../../Constants';
 
const ImagesGrid = ({ setForm, dataChange }) => {
  const currentCategory = useContext(TitleContext);
  const url = `${urlApi}gallery/${currentCategory}`;
  const urlImages = `${urlApi}images`;
  const {data, loading, error} = useFetchGet(url, dataChange);
  const [clickedImg, setClickedImg] = useState(null);
  const [lightbox, setLightBox] = useState(false);

  const handelClick = (fullpath) => {
    setClickedImg(fullpath);
    setLightBox(true);
  }
 
  return (
        <>
          {loading && <Loader/>}
          {data && <div className='imagesgrid'>
              {data.images.map((element) => {
                  const {fullpath} = element
            
                  const width = 304;
                  const height = 295;
                  
                  const imgUrl = `${urlImages}/${width}x${height}/${fullpath}`;
                  
                  return(
                      <div key={fullpath} 
                           className='imagesgrid-img-wrap'>
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
            <AddPhotoIco 
              setForm={setForm}
            />
            {lightbox && <LightboxGallery 
                            setLightbox={setLightBox}
                            clickedImg={clickedImg}
                            data={data}
                            loading='lazy'
                          />
            }
          </div>}
        </>
  )
}

export default ImagesGrid