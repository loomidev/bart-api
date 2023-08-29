import './PageLayout.scss';
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import ImagesGrid from "../components/ImagesGrid";
import AddPhotoForm from "../components/AddPhotoForm";

const PageLayout = ({ title }) => {

  let [form, setForm] = useState(false);
  let [dataChange, setDataChange] = useState(false);

  return (
    <>
      <h3 className="pagelayout-postheader">
        <Link to='/'>
          <IoArrowBackOutline className='pagelayout-arrowback'/>
          {title}
        </Link>
      </h3>
      <div>
        <ImagesGrid 
          setForm={setForm}
          dataChange={dataChange}
        />
      </div>
      {form && <AddPhotoForm 
                  form={form} 
                  setForm={setForm} 
                  title={title}
                  dataChange={dataChange}
                  setDataChange={setDataChange}
                />
      }
    </>
  )
}

export default PageLayout