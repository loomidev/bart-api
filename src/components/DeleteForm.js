import './DeleteForm.scss';

const DeleteForm = ({ setDeleteForm, deletePath, dataChange, setDataChange }) => {

    const deleteFolder = async () => {
          
        try {
            const response = await fetch(deletePath, {
                method: 'DELETE',
            })
    
            if (response.ok) {
                setDeleteForm(false);
                setDataChange(!dataChange);
                console.log('Položka bola vymazaná');
            } else {
                console.log('Položka nebola vymazaná');
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            setDeleteForm(false);
        }
    })

  return (
    <div className='deleteform-wrap'>
        <div className='deleteform-backdrop' onClick={() => setDeleteForm(false)}/>
        <div className='deleteform'>
            <h2 className='deleteform-header'>Vymazať túto kategóriu ?</h2>
            <div className='deleteform-row'>
                <button 
                    className='deleteform-wrapper-button'
                    onClick={()=>deleteFolder()}
                    >Áno</button>
                <button 
                    className='deleteform-wrapper-button'
                    onClick={() => setDeleteForm(false)}
                    >Nie</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteForm