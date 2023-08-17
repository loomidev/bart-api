import './ImageCounter.scss'
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

const ImageCounter = ({path}) => {

    let [urls, setUrls] = useState('')
    let [count, setCount] = useState()

    const url = 'https://api.programator.sk/gallery'
    const {data} = useFetch(urls)
  
    useEffect(() => {
        setUrls(url + '/' + path); 
        if(data){
            setCount(data.images.length)}     
    },[path, data])

    let formatWord = ''

    if (count===0 || count > 4) {
        formatWord = 'fotiek'
    }
    else if (count === 1) {
        formatWord = 'fotka'
    }
    else {
        formatWord = 'fotky'
    }

  return (
            <>
                {count && <div className="images-counter">{count} {formatWord}</div>} 
            </>
        )
}

export default ImageCounter