import './ImageCounter.scss'
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

const ImageCounter = ({path}) => {
    const url = 'https://api.programator.sk/gallery'
    let urls = url + '/' + path
    const {data} = useFetch(urls)
    const [count, setCount] = useState()

    useEffect(() => {
        if(data){
            setCount(data.images.length);
        }
    }, [urls, data])

    let formatWord = ''

    if (count===0 || count > 4) {
        formatWord = ' fotiek'
    }
    else if (count === 1) {
        formatWord = ' fotka'
    }
    else {
        formatWord = ' fotky'
    }

  return (
    <>
        {data && <div className='image-counter'>{count}{formatWord}</div>}
    </>
  )
}

export default ImageCounter