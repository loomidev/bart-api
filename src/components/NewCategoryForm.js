import './NewCategoryForm.scss'
//import { projectFirestore } from '../firebase/config'
import useFetch from '../hooks/useFetch'
import { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

const NewCategoryForm = ({setForm}) => {
    const [error, setError] = useState(false)
    const [categoryTitle, setCategoryTitle] = useState('')

    const submitForm =  (event) => {
        event.preventDefault()
        console.log('submitol si ');

        /*
        if (categoryTitle) {
            let newCategory = {title: categoryTitle}

            try {
                await projectFirestore.collection('categories').add(newCategory)
                setCategoryTitle('')
                setError(false)
                setForm(false)
            }
            catch (err) {
                setError('Kategória nebola pridaná' + err.message)
            }
        }
        */
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
                <button 
                    className='newcategoryform-button'
                >Pridať</button>
            </form>
        </div>
        {error && <p>{error}</p>}
    </div>
  )
}

export default NewCategoryForm