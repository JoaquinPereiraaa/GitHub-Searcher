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

  return (
    <>
    <div  className="flex flex-col items-center text-center relative">
      <h2 className="text-4xl font-extrabold my-11">Detalles del Usuario</h2>
      <div className="absolute top-6 left-4">
      <Button to="/userSearch">
        Volver a la página de búsqueda
      </Button>
      </div>

      <img src={userData.avatar_url} alt={`Avatar de ${userData.login}`}  className='h-96 w-96 my-28'/>
      <p  className='text-3xl '>Nombre de usuario: {userData.login}</p>
      <p  className='text-3xl '>Seguidores: {userData.followers}</p>
      <p  className='text-3xl '>Seguidos: {userData.following}</p>
      <p className='text-3xl no-underline hover:underline' > <a href={userData.html_url} target="_blank">Ver en GitHub</a></p>
      <div className="absolute top-6 right-4 ">
        <img src={Logo} alt="logo" className="w-16 " />
        </div>
    </div>
    </>
  );
};

export default UserDetails;
