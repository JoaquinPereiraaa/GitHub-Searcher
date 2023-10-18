import { Link } from 'react-router-dom';
import './Button.css'


const Button = ({ to, children }) => {
  return (
      <Link to={to} >
    <button id='btn'>
        {children}
    </button>
      </Link>
  );
}

export default Button;