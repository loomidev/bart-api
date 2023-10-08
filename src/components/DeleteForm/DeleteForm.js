import './DeleteForm.scss';
import { useEffect } from 'react';
import useFetchDel from '../../hooks/useFetchDel';

const DeleteForm = ({ setDeleteForm, deletePath, dataChange, setDataChange }) => {
  const { deleteData, error } = useFetchDel();

  const handleDelete = async () => {
    const success = await deleteData(deletePath);

    if (success) {
      setDeleteForm(false);
      setDataChange(!dataChange);
      console.log('Položka bola vymazaná');
    } else {
      console.log('Položka nebola vymazaná');
      console.error(error)
    }
  };

  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.key === 'Escape') {
        setDeleteForm(false);
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
    <div className='deleteform-wrap'>
      <div className='deleteform-backdrop' onClick={() => setDeleteForm(false)} />
      <div className='deleteform'>
        <h2 className='deleteform-header'>Vymazat tuto kategorii?</h2>
        <div className='deleteform-row'>
          <button
            className='deleteform-wrapper-button'
            onClick={handleDelete}
          >
            Áno
          </button>
          <button
            className='deleteform-wrapper-button'
            onClick={() => setDeleteForm(false)}
          >
            Nie
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;

