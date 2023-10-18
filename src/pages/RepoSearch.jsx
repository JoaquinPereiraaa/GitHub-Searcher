import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ListItemText } from '@mui/material';
import Logo from "../assets/img/github.png";

const RepoSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();

        // Ordenar los resultados por fecha de creación (más nuevo a más antiguo)
        const sortedResults = data.items.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA; // Ordenar de más nuevo a más antiguo
        });

        setSearchResults(sortedResults);
      } else {
        console.error('Error al buscar en GitHub');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <div className="absolute top-6 left-4">
        <Button to="/">Volver a la Home</Button>
      </div>
      <div className="absolute top-6 right-4">
        <Button to="/userSearch" className="ml-auto">Ir a buscar Usuarios</Button> {/* Agrega ml-auto para alinear a la derecha */}
      </div>
      <div className="mt-10">
        <img className="mx-auto" src={Logo} alt="logo"/> 
      </div>
      <h1 className="font-extrabold my-5 text-4xl">Buscar Repositorios</h1>
      <form onSubmit={handleSearchSubmit} className="center-content mt-4">
        <div className="flex justify-center items-center">
          <TextField
            className="h-14"
            id="standard-basic"
            label="Repo"
            variant="standard"
            type="text"
            placeholder="Buscar repositorio"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="bg-rgb-purple hover:bg-blue-400 text-black font-bold py-2 px-4 rounded" type="submit">
            <Search className="w-6 h-6 mr-2" /> Buscar
          </button>
        </div>
      </form>
      <div className="flex justify-center">
        <ul className="list-disc text-left mt-4 pl-4">
          {searchResults.map((repo) => (
            <ListItemText disablePadding key={repo.id}>
              <Link to={`/repo/${repo.full_name}`}  className="block hover:text-gray-950 font hover:bg-blue-400 rounded-md px-4 py-2">
                {repo.name}
              </Link>
            </ListItemText>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RepoSearchPage;
