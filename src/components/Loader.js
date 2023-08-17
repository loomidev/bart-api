import './Loader.scss'
import loadinggif from '../img/loadinggif.gif'

const Loader = () => {
  return (
    <div className='loader-backdrop'>
      <div className='loader-wrap'>
          <img 
              src={loadinggif}
              className='loadinggif'
          />
        </div>
    </div>
  )
}

export default Loader