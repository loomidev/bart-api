import './Loader.scss';
import loading from '../../img/loading.gif';

const Loader = () => {
  return (
    <div className='loader-backdrop'>
      <div className='loader-wrap'>
          <img 
              src={loading}
              className='loading'
              alt='loading ...'
          />
        </div>
    </div>
  )
}

export default Loader