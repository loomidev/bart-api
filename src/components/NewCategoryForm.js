import './NewCategoryForm.scss'
import { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import urlApi from '../Constants';

const NewCategoryForm = ({setForm}) => {
    const [error, setError] = useState(false)
    const [categoryTitle, setCategoryTitle] = useState('')
    const url = urlApi+'gallery/'

    const submitForm = async (event) => {
        event.preventDefault()     

        let uploaded = {
            "path": categoryTitle,
            "name": categoryTitle,
          }
        
        if (categoryTitle){
            try {
                const response =  fetch(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(uploaded)
                })

                if(response.ok) {
                  console.log('Data boli pridané');
                  setCategoryTitle('')
                  setError(false)
                  setForm(false)
                } else {
                  console.log(error);
                  setError('Kategória nebola pridaná - došlo k chybe')
                }
            } 
            catch (error) {
                console.log(error);
                setError('Kategória nebola pridaná - došlo k chybe')
            }
        }
    }

    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            setForm(false);
        }
    });

  return (
    <div className='newcategoryform-wrap'>
        <div className="newcategoryform-backdrop" onClick={() => setForm(false)}></div>
        <div className='newcategoryform-bcg'>
            <form 
                onSubmit={submitForm}
                className='newcategoryform'
                >
                <div className='newcategoryform-header-row'>
                    <div className='newcategoryform-header'>Pridať kategóriu</div>
                    <div 
                        className='newcategoryform-closer'
                        onClick={() => setForm(false)}
                        >
                        <IoCloseOutline />
                    </div>
                </div>
                <div className='newcategoryform-input-header'>Názov kategórie *</div>
                <input
                    type='text'
                    onChange={(event) => setCategoryTitle(event.target.value)}
                    className='newcategoryform-input'
                    value={categoryTitle}
                /><br/>
                <div>{error && <div className="newcategoryform-wrapper-error">{error}</div> }</div>
                <button 
                    className='newcategoryform-button'
                >Pridať</button>
            </form>
        </div> 
    </div>
  )
}

export default NewCategoryForm