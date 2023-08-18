import './AddPhotoIco.scss'
import { FaRegPlusSquare } from "react-icons/fa";

const AddPhotoIco = ({setForm}) => {
  return (
    <div 
      onClick={() => setForm(true)}
      className="addphotoico"> 
      <div className="addphotoico-plus-ico">
        <FaRegPlusSquare/>
      </div> 
      <div className="addphotoico-text">Pridať fotky</div>
    </div>
  )
}

export default AddPhotoIco