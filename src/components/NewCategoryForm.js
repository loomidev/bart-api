import './NewCategoryForm.scss'
import { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

const NewCategoryForm = ({setForm}) => {
    const [error, setError] = useState(false)
    const [categoryTitle, setCategoryTitle] = useState('')
    const url = 'https://api.programator.sk/gallery/'

    const submitForm = async (event) => {
        event.preventDefault()
        
        if (categoryTitle) {
            let newCategory = {
                'path': categoryTitle,
                'name': categoryTitle
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCategory)
                })

                if (response.ok) {
                    setCategoryTitle('')
                    setError(false)
                    setForm(false)
                    console.log('data boli pridané');
                  } else {
                    console.log(error);
                  }
                } catch (error) {
                    console.log(error);
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