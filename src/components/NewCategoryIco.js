import './NewCategoryIco.scss'
import { FaRegPlusSquare } from "react-icons/fa";

const NewCategoryIco = ({setForm}) => {
  return (
    <div 
    onClick={() => setForm(true)}
    className="newcategoryico"
    >
      <div className="newcategoryico-plus-ico">
        <FaRegPlusSquare/>
      </div>
    <div className="newcategoryico-text">Pridať kategóriu</div>
  </div>
  )
}

export default NewCategoryIco