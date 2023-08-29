import './AddPhotoForm.scss';
import { useState, useContext } from "react";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";
import TitleContext from '../components/TitleContext';
import urlApi from '../Constants';

const AddPhotoForm = ({ setForm, dataChange, setDataChange }) => {
  const currentCategory = useContext(TitleContext);
  const url = urlApi + "gallery/"+currentCategory+'/';
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
 
  const selecting = (event) => {
    let selectFile = event.target.files[0];

    if (selectFile && types.includes(selectFile.type)) {
      setSelected(selectFile);
      setError('');
    } else {
      setSelected(null);
      setError('Vyber obrázok vo formáte .jpeg alebo .png');
    }
  }

  const hidenButtonClick = (event) => {
    event.preventDefault();
    document.getElementById('fileselector').click();
  }

  const submitForm = async (event) => {
    event.preventDefault();

    if (!selected) {
      setError('Vyberte obrázok na odoslanie.');
      return
    }

    const formData = new FormData();
    formData.append('image', selected, selected.name);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('Data boli pridané');
        setDataChange(!dataChange);
        setError(false);
        setForm(false);
      } else {
        console.error(response.status);
        setError('Fotografia nebola pridaná');
      }
      
    } catch (error) {
        console.error(error);
        setError('Fotografia nebola pridaná');
    }
    setSelected('');
  }

  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      setForm(false);
    }
  });

  return (
    <div className='addphotoform-wrap'>
      <div className="addphotoform-backdrop" onClick={() => setForm(false)}></div>
      <div className='addphotoform-bcg'>
        <form className='addphotoform'>
          <div className='addphotoform-header-row'>
            <div className='addphotoform-header'>Pridať fotky</div>
            <div
              className='addphotoform-closer'
              onClick={() => setForm(false)}>
              <IoCloseOutline />
            </div>
          </div>
          <div className='addphotoform-input-wraper'>
            <IoImageOutline className='addphotoform-input-ico' />
            <div className='addphotoform-wrapper-header'>Sem presunte fotky</div>
            <div className='addphotoform-wrapper-postheader'>alebo</div>
            <input
              type="file"
              onChange={selecting}
              id='fileselector'
              hidden />
            <button
              className='addphotoform-wrapper-button'
              onClick={hidenButtonClick}>Vyberte súbory
            </button>
            {error && <div className="addphotoform-wrapper-error">{error}</div>}
            {selected && <div className='addphotoform-wrapper-selected-photo'>{selected.name}</div>}
          </div>
          <button className='addphotoform-button' onClick={submitForm}>Pridať</button>
        </form>
      </div>
    </div>
  )
}

export default AddPhotoForm