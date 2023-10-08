import './AddPhotoForm.scss';
import { useState, useContext, useEffect } from "react";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";
import TitleContext from '../TitleContext/TitleContext';
import useFetchPostPhoto from '../../hooks/useFetchPostPhoto';
import urlApi from '../../Constants';

const AddPhotoForm = ({ setForm, dataChange, setDataChange }) => {
    const currentCategory = useContext(TitleContext);
    const url = `${urlApi}gallery/${currentCategory}/`;
    const { postPhoto, error } = useFetchPostPhoto(); 
    const [selected, setSelected] = useState(null);
    const [errorMessage, setErrorMessage] = useState(error || ''); 
    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const selecting = (event) => {
        let selectFile = event.target.files[0];

        if (selectFile && types.includes(selectFile.type)) {
            setSelected(selectFile);
            setErrorMessage('');
        } else {
            setSelected(null);
            setErrorMessage('Vyber obrázok vo formáte .jpeg alebo .png');
        }
    }

    const hidenButtonClick = (event) => {
        event.preventDefault();
        document.getElementById('fileselector').click();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selected) {
            setErrorMessage('Vyberte obrázok na odoslanie.');
            return
        }

        const success = await postPhoto(selected, url);

        if (success) {
            console.log('Položka bola pridaná');
            setDataChange(!dataChange);
            setErrorMessage('');
            setForm(false);
        } else {
            setErrorMessage('Nahrávanie se nepodarilo');
            console.log('Položka nebola pridaná');
            console.error(error)
        }
    }

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
                        {errorMessage && <div className="addphotoform-wrapper-error">{errorMessage}</div>}
                        {selected && <div className='addphotoform-wrapper-selected-photo'>{selected.name}</div>}
                    </div>
                    <button className='addphotoform-button' onClick={handleSubmit}>Pridať</button>
                </form>
            </div>
        </div>
    )
}

export default AddPhotoForm;

