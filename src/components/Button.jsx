import { Link } from 'react-router-dom';

const Button = ({ to, children }) => {
  return (
      <Link to={to} className="">
    <button className="bg-teal-300 hover:bg-lime-400 text-black text-2xl font-bold italic py-2 px-4 rounded-xl drop-shadow-2xl h-32 w-60 ">
        {children}
    </button>
      </Link>
  );
}

export default Button;