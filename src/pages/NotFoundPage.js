import './NotFoundPage.scss';
import { Link } from 'react-router-dom';
import { VscDebugDisconnect } from "react-icons/vsc";

const NotFoundPage = () => {
  return (
    <div className='notfoundpage'>
        <div className='notfoundpage-header'>Page Not Found</div>
        <VscDebugDisconnect className='notfoundpage-ico'/>
        <div className='notfoundpage-nmb-err'>404</div>
        <Link to={'/'} className='notfoundpage-link'>Back to homepage</Link>
    </div>
  )
}

export default NotFoundPage