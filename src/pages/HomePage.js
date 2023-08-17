import './HomePage.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineFolderOff } from "react-icons/md";
import NewCategoryForm from "../components/NewCategoryForm"
import NewCategoryIco from '../components/NewCategoryIco'
import useFetch from '../hooks/useFetch';

import Loader from '../components/Loader';
import ImageCounter from '../components/ImageCounter';

const HomePage = () => {
  const [form, setForm] = useState(false)

  
  const url = 'https://api.programator.sk/gallery'
  const urlImages = 'http://api.programator.sk/images'
  const {data, loading,  error} = useFetch(url)
   

  return (
      <>
            {loading && <Loader/>}
            {data && <div>
                <h3 className='homepage-postheader'>
                    Kategórie
                </h3>
                <div className='homepage-content'>
                    {data.galleries.map((oneElement) => {
                        const{path,image} = oneElement

                        const width = 304;
                        const height = 228;

                        const imgUrl = urlImages+'/'+width+'x'+height+'/'+image.fullpath

                        // format url 
                        let url = path.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
                        

                        return(
                            <Link key={path+'-'+image.modified} to={url} className='homepage-img-wrap'>
                                <div className='homepage-count-images'>
                                    <ImageCounter path={path}/>
                                </div>
                                <img src={imgUrl} alt='folder'/>
                                <div className='homepage-folder-title'>{path}</div>
                            </Link>
                        )
                    })}
                    {error && 
                        <div className='homepage-error-wrap'>
                            <MdOutlineFolderOff className='homepage-error-ico'/>
                            <div>{error}</div>
                        </div>
                    }
                <NewCategoryIco setForm={setForm}/>
                {form && <NewCategoryForm setForm={setForm}/>}
                </div>
            </div>}
        </>
  )
}

export default HomePage