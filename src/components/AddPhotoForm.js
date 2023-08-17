import './AddPhotoForm.scss'
import { useState, useContext  } from "react"
import { IoCloseOutline,IoImageOutline } from "react-icons/io5";
import TitleContext from '../components/TitleContext'
import moment from 'moment-timezone';

const AddPhotoForm = ({form,setForm}) => {
  const [selected, setSelected] = useState('')
  const [error, setError] = useState(null)
  const types = ['image/png', 'image/jpeg', 'image/jpg']
  const currentCategory = useContext(TitleContext)
  const url = 'https://api.programator.sk/gallery/'

  const selecting = (event) => {
    let selectFile = event.target.files[0]
    if (selectFile && types.includes(selectFile.type)) {
      setSelected(selectFile)
      setError('')
    }
    else {
      setSelected('')
      setError('Vyber obrázok vo formáte .jpeg alebo .png')
    }
  }

  const hidenButtonClick = (event) =>{
    event.preventDefault()
    document.getElementById('fileselector').click()
  }

  const submitForm = async (event) => {
    event.preventDefault()

    const now = moment().tz("Europe/Berlin")
    const isoTime = now.format('YYYY-MM-DDTHH:mm:ss')+'+0200';

    let uploaded = {
        "uploaded": [{
        "path": selected.name,
        "fullpath": currentCategory+'/'+selected.name,
        "name": selected.name,
        "modified": isoTime
      }]
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploaded)
      });
  
      if (response.ok) {
        console.log('data boli pridané');
      } else {
        console.log(error);
      }
    } catch (error) {
        console.log(error);
    }
    setSelected('')
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
        <form 
          className='addphotoform'>
          <div className='addphotoform-header-row'>
            <div className='addphotoform-header'>Pridať fotky</div>
            <div 
              className='addphotoform-closer'
              onClick={() => setForm(false)}>
              <IoCloseOutline />
            </div>
          </div>
          <div className='addphotoform-input-wraper'>
            <IoImageOutline className='addphotoform-input-ico'/>
            <div className='addphotoform-wrapper-header'>Sem presunte fotky</div>
            <div className='addphotoform-wrapper-postheader'>alebo</div>
            <input
              type="file"
              onChange={selecting}
              id='fileselector'
              hidden/>
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