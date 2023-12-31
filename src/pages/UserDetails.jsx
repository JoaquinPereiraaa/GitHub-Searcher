import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '../assets/img/github.png';

const UserDetails = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw 'Failed';
         
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario de GitHub', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  const textShadowStyle = {
    textShadow: '4px 4px 4px black', 
  };

  return (
    <>
    <div  className="flex flex-col items-center text-center relative">
      <h2 className="text-7xl font-extrabold my-11">DETALLES DEL USUARIO</h2>
      <div className="absolute top-6 left-4">
      <Button to="/userSearch">
        VOLVER A LA PÁGINA DE BÚSQUEDA
      </Button>
      </div>

      <img src={userData.avatar_url} alt={`Avatar de ${userData.login}`}  style={textShadowStyle} className='h-96 w-96 my-28'/>
      <p  style={textShadowStyle} className='text-5xl '>NOMBRE DE USUARIO: <span className='text-blue-400'>  {userData.login}</span> </p>
      <p  style={textShadowStyle} className='text-5xl '>SEGUIDORES:  <span className='text-blue-400'> {userData.followers}</span> </p>
      <p  style={textShadowStyle} className='text-5xl '>SEGUIDOS:   <span className='text-blue-400'> {userData.following}</span></p>
      <p style={textShadowStyle} className='text-5xl no-underline hover:underline' > <a href={userData.html_url} target="_blank">VER EN GITHUB</a></p>
      <div className="absolute top-6 right-4 ">
        <img src={Logo} alt="logo" style={textShadowStyle} className="w-16 " />
        </div>
    </div>
    </>
  );
};

export default UserDetails;