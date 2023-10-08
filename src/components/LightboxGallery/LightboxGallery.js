import './LightboxGallery.scss';
import urlApi from '../../Constants';
import { useState, useEffect } from "react";
import { IoCloseSharp, IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import useImageLoaded from '../../hooks/useImageLoaded'
import Loader from '../Loader/Loader'

const LightboxGallery = ({ setLightbox, data, clickedImg }) => {
  const urlImages = `${urlApi}images`;
  const width = 1212;
  const height = 909;
  let [categoryUrls, setCategoryUrls] = useState([]);
  let [clickedImgIndex, setClickedIndex] = useState(null);

  const loadedImages = useImageLoaded(categoryUrls);
 
  useEffect(() => {
    let result = [];
    let urlsResult = [];

    data.images.forEach(element => {
      const { fullpath } = element;
      const imgUrl = `${urlImages}/${width}x${height}/${fullpath}`;

      result.push(fullpath);
      urlsResult.push(imgUrl);
    });

    let clickedImgIndex = result.indexOf(clickedImg);

    setCategoryUrls(urlsResult);
    setClickedIndex(clickedImgIndex);

    // eslint-disable-next-line
  }, [data, urlImages, clickedImg]);

  const rigthArrowhandler = () => {
    if (clickedImgIndex < categoryUrls.length - 1) {
      setClickedIndex(clickedImgIndex + 1);
    } else {
      setClickedIndex(0);
    }
  }

  const lefthArrowhandler = () => {
    if (clickedImgIndex > 0) {
      setClickedIndex(clickedImgIndex - 1);
    } else {
      setClickedIndex(categoryUrls.length - 1);
    }
  }

  const handleKeydown = (evt) => {
    if (evt.key === 'Escape') {
      setLightbox(false);
    }
    if (evt.key === 'ArrowRight') {
      rigthArrowhandler();
    }
    if (evt.key === 'ArrowLeft') {
      lefthArrowhandler();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    
    // clean up function
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
    // eslint-disable-next-line
  }, [setLightbox, rigthArrowhandler, lefthArrowhandler]);

  return (
    <div className='lightbox-wrap'>
      <div className="lightbox-backdrop" onClick={() => setLightbox(false)}></div>
      <div className='lightbox'>    
        {loadedImages[categoryUrls[clickedImgIndex]] ? (
          <>
            <div className="lightbox-header">
              <div onClick={() => { setLightbox(false) }}>
                <IoCloseSharp className="lightbox-closer" />
              </div>
            </div>
            <div className="lightbox-gallery">
              <img
                src={categoryUrls[clickedImgIndex]}
                alt="lightboximg"
                className='lightbox-gallery-image'
                id='lightbox-img'
              />
            </div>
            <div className='lightbox-arrows-row'>
              <IoArrowBackOutline
                className="lightbox-arrows left"
                onClick={() => { lefthArrowhandler() }} />
              <IoArrowForwardOutline
                className="lightbox-arrows right"
                onClick={() => { rigthArrowhandler() }} />
            </div>
          </>
        ) : (
          <div className='lightbox-loader-wrapper'>
            <Loader/>
          </div>
        )}
      </div>
    </div>
  )
}

export default LightboxGallery;

