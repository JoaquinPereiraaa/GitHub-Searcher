import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '../assets/img/github.png';

const RepoDetailsPage = () => {
  const { owner, name } = useParams();
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
        if (response.ok) {
          const data = await response.json();
          setRepoData(data);
        } else {
          console.error('Error al obtener los detalles del repositorio de GitHub');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del repositorio de GitHub', error);
      }
    };

    fetchRepoData();
  }, [owner, name]);

  if (!repoData) {
    return <div>no aparece nada</div>;
  }

  // Estilos para el sombreado
  const textShadowStyle = {
    textShadow: '4px 4px 4px black', // Ajusta los valores según tus preferencias
  };

  return (
    <div className="flex flex-col items-center text-center relative">
      <h2 className="text-7xl font-extrabold my-11">Detalles del Repositorio</h2>
      <div className="absolute top-6 left-4">
        <Button to="/repoSearch">
           Volver a la página de búsqueda
        </Button>
      </div>
      
      <img src={repoData.owner.avatar_url} alt={`Avatar de ${repoData.owner.login}`} className='h-96 w-96 my-28'/>
      <p className='text-5xl' style={textShadowStyle}>Nombre del repositorio: {repoData.name}</p>
      <p className='text-5xl' style={textShadowStyle}>Propietario: {repoData.owner.login}</p>
      <p className='text-5xl' style={textShadowStyle}>Descripción: {repoData.description}</p>
      <p className='text-5xl no-underline hover:underline' style={textShadowStyle}>
        <a href={repoData.html_url} target="_blank">Ver en GitHub</a>
      </p>
      <div className="absolute top-6 right-4">
        <img src={Logo} alt="logo" className="w-16" />
      </div>
    </div>
  );
};

export default RepoDetailsPage;
