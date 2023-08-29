import './LightboxGallery.scss';
import urlApi from '../Constants';
import { useState, useEffect} from "react";
import { IoCloseSharp, IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const LightboxGallery = ({ setLightbox, data, clickedImg }) => {

    const urlImages = urlApi+'images';
    const width = 1212;
    const height = 909;
    let [categoryUrls, setCategoryUrls] = useState([]); 
    let [clickedImgIndex, setClickedIndex] = useState(null);

    useEffect(() => {
        let result = []; //všetky fullpath
        let urlsResult = []; //všetky url 
        
        data.images.forEach(element => {
            const {fullpath} = element;
            const imgUrl = urlImages+'/'+width+'x'+height+'/'+fullpath;
      
            result.push(fullpath);
            urlsResult.push(imgUrl);
        });

        let clickedImgIndex = result.indexOf(clickedImg); // zistím ktorý v poradí je kliknutý obrázok 
                                                          //všetky fullpath porovnam s clickedImg(co je fullpath)

        setCategoryUrls(urlsResult); //všetky url dostavam von
        setClickedIndex(clickedImgIndex); //index kliknutého obrázka dostávam von

    }, [data, urlImages,clickedImg]);

    const rigthArrowhandler = () => {
        if (clickedImgIndex < categoryUrls.length-1) {
            setClickedIndex(
                clickedImgIndex + 1
            );
        }
        else {
            setClickedIndex(0);
        }
    }

    const lefthArrowhandler = () => {
        if (clickedImgIndex > 0 ) {
            setClickedIndex(clickedImgIndex - 1);
        }
        else {
            setClickedIndex(categoryUrls.length-1);
        }
    }

    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            setLightbox(false);
        }
        if(evt.key === 'ArrowRight'){
            rigthArrowhandler();
        }
        if(evt.key === 'ArrowLeft'){
            lefthArrowhandler();
        }
    }); 
    
    return (
        <div className='lightbox-wrap'>
            <div className="lightbox-backdrop" onClick={() => setLightbox(false)}></div>
            <div className='lightbox'>
                <div className="lightbox-header">
                    <div onClick={() => {setLightbox(false)}}>
                        <IoCloseSharp className="lightbox-closer" />
                    </div>
                </div>
                <div className="lightbox-gallery">
                    <img
                        src={categoryUrls[clickedImgIndex]} // cez index mi zobrazí daný obrázok z poľa
                        alt="lightboximg" 
                        className='lightbox-gallery-image'
                        id='lightbox-img'
                    />
                </div>
                <div className='lightbox-arrows-row'>
                    <IoArrowBackOutline
                        className="lightbox-arrows left" 
                        onClick={() => {lefthArrowhandler()}}/>
                    <IoArrowForwardOutline 
                        className="lightbox-arrows right"
                        onClick={() => {rigthArrowhandler()}}/>
                </div>
            </div>
        </div>
    )
}

export default LightboxGallery
