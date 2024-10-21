import rockImg from './assets/rock.svg';
import scissorImg from './assets/scissor.svg';
import paperImg from './assets/paper.svg';

const IMAGES = Object.freeze({
  rock: rockImg,
  scissor: scissorImg,
  paper: paperImg
});

function HandIcon({ value = 'rock', className = '' }) {
  return <img src={IMAGES[value]} alt={value} className={className} />;
}

export default HandIcon;
