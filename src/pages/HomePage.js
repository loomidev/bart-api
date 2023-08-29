import './HomePage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineFolderOff, MdDeleteForever } from "react-icons/md";
import NewCategoryForm from "../components/NewCategoryForm";
import NewCategoryIco from '../components/NewCategoryIco';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';
import folder from '../img/folder.png';
import ImageCounter from '../components/ImageCounter';
import urlApi from '../Constants';
import DeleteForm from '../components/DeleteForm';

const HomePage = ({ dataChange, setDataChange }) => {
  const [form, setForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [deletePath, setDeletePath] = useState(null);
  const url = urlApi+"gallery";
  const urlImages = urlApi+"images";
  const {data, loading,  error} = useFetch(url, dataChange);

  const selectDeleteFolder = (path) => {
    const folderUrl = url+'/'+path;
    setDeleteForm(true);
    setDeletePath(folderUrl);
  }

  return (
        <div className='homepage'>
            {loading && <Loader/>}
            {data && <div>
                <h3 className='homepage-postheader'>
                    Kategórie
                </h3>
                <div className='homepage-content'>
                    {data.galleries.map((oneElement) => {
                        const{path,image} = oneElement;

                        const width = 304;
                        const height = 228;
                        let imgUrl = '';
                        
                        if(image){
                            imgUrl = urlImages+'/'+width+'x'+height+'/'+image.fullpath;
                        }
                        else{
                            imgUrl=folder;
                        }

                        return(
                            <div key={path} className='homepage-img-wrap'>
                                <div className='homepage-folder-delete' 
                                     onClick={() => selectDeleteFolder(path)}>
                                    <MdDeleteForever 
                                        title='Delete folder'
                                    />
                                </div>
                                <Link to={path}>
                                    <div className='homepage-count-images'>
                                        <ImageCounter path={path} />
                                    </div>    
                                    <img src={imgUrl} alt='folder'/>
                                    <div className='homepage-folder-title'>{path}</div>
                                </Link>
                            </div>
                        )
                    })}
                    {error && 
                        <div className='homepage-error-wrap'>
                            <MdOutlineFolderOff className='homepage-error-ico'/>
                            <div>{error}</div>
                        </div>
                    }
                <NewCategoryIco setForm={setForm}/>
                {form && <NewCategoryForm 
                            setForm={setForm}
                            dataChange = {dataChange}
                            setDataChange={setDataChange}
                        />
                }
                {deleteForm && <DeleteForm 
                                    setDeleteForm={setDeleteForm} 
                                    deletePath={deletePath} 
                                    dataChange = {dataChange}
                                    setDataChange={setDataChange}
                                />
                }
                </div>
            </div>}
        </div>
  )
}

export default HomePage