import './NewCategoryForm.scss';
import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import urlApi from '../../Constants';
import useFetchPostCategory from '../../hooks/useFetchPostCategory';

const NewCategoryForm = ({ setForm, dataChange, setDataChange }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const { postCategory, error } = useFetchPostCategory();
  const url = `${urlApi}gallery`;

  const submitForm = async (event) => {
    event.preventDefault();

    if (categoryTitle) {
      const success = await postCategory(categoryTitle, url);

      if (success) {
        console.log('Položka bola pridaná');
        setDataChange(!dataChange);
        setCategoryTitle('');
        setForm(false);
      } else {
        console.log('Položka nebola pridaná');
        console.error(error)
      }
    }
  };

  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.key === 'Escape') {
        setForm(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // clean up function
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className='newcategoryform-wrap'>
      <div className='newcategoryform-backdrop' onClick={() => setForm(false)}></div>
      <div className='newcategoryform-bcg'>
        <form onSubmit={submitForm} className='newcategoryform'>
          <div className='newcategoryform-header-row'>
            <div className='newcategoryform-header'>Pridať kategóriu</div>
            <div className='newcategoryform-closer' onClick={() => setForm(false)}>
              <IoCloseOutline />
            </div>
          </div>
          <div className='newcategoryform-input-header'>Názov kategórie *</div>
          <input
            type='text'
            onChange={(event) => setCategoryTitle(event.target.value)}
            className='newcategoryform-input'
            value={categoryTitle}
          />
          <br />
          <div>{error && <div className='newcategoryform-wrapper-error'>{error}</div>}</div>
          <button type='submit' className='newcategoryform-button'>
            Pridať
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCategoryForm;
