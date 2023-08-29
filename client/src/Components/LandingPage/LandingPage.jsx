import style from './LandingPage.module.css'
import { NavLink } from 'react-router-dom';
import video from '../LandingPage/video/landingHD.mp4'

const LandingPage = () => {
  return (
    <div className={`${style.background} ${style['image-container']}`}>

        <video src={video} className={style.video} autoPlay loop muted></video>

      <div className={style.text}>
        <h1 className={style.welcome}>Welcome </h1>
        <h2>To the recipes app! you can search and create your recipes!</h2>
        <div className={`${style['button-container']} button-container`}>
          <NavLink to='/home'>
            <button className={style.home}>ENTER</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
