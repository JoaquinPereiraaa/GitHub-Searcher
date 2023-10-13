import Logo from '../assets/img/github.png';
import Button from '../components/Button';


const HomePage = () => {
  return (
    <div className="home-page h-screen flex flex-col justify-center items-center">
      <img src={Logo} alt="logo" />
      <h1 className='font-extrabold text-6xl mt-5 mb-5'>BUSCADOR DE GITHUB</h1>
      <div className="font-serif space-x-4">
        <Button to="/repoSearch">Repositorios</Button>
        <Button to="/userSearch">Usuarios</Button>
      </div>
    </div>
  );
}

export default HomePage;