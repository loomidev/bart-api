import './LightboxGallery.scss'
import { useState, useEffect} from "react";
import { IoCloseSharp, IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const LightboxGallery = ({setLightbox, data, clickedImg}) => {

    let [clickedImgIndex, setClickedIndex] = useState()
    let [categoryUrls, setCategoryUrls] = useState([])
    const urlImages = 'http://api.programator.sk/images'
    const width = 1212;
    const height = 909;
  
    useEffect(() => {
        let result = []
        let urlsResult = []
        
        data.images.forEach(element => {
            const {fullpath} = element
            const imgUrl = urlImages+'/'+width+'x'+height+'/'+fullpath
      
            result.push(fullpath);
            urlsResult.push(imgUrl)
        });

        let clickedImgIndex = result.indexOf(clickedImg)

        setCategoryUrls(urlsResult)
        setClickedIndex(clickedImgIndex);

    }, [data, clickedImg])


    const rigthArrowhandler = () => {
        if (clickedImgIndex < categoryUrls.length-1) {
            setClickedIndex(
                clickedImgIndex + 1
            )
        }
        else {
            setClickedIndex(0)
        }
    }

    const lefthArrowhandler = () => {
        if (clickedImgIndex > 0 ) {
            setClickedIndex(clickedImgIndex - 1)
        }
        else {
            setClickedIndex(categoryUrls.length-1)
        }
    }

    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            setLightbox(false);
        }
        if(evt.key === 'ArrowRight'){
            rigthArrowhandler()
        }
        if(evt.key === 'ArrowLeft'){
            lefthArrowhandler()
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
                        src={categoryUrls[clickedImgIndex]} 
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