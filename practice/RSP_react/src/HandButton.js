import HandIcon from './HandIcon.js';
import './css/HandButton.css';

function HandButton({ value = 'rock', onClick }) {
  const handleClick = () => onClick(value);
  return (
    <button onClick={handleClick} className={`HandButton`}>
      <HandIcon value={value} className={`HandButton-icon`} />
    </button>
  );
}

export default HandButton;
