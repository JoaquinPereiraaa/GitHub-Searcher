import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Logo from "../assets/img/github.png";
import { ListItemText, TextField, List, Paper, IconButton } from '@mui/material';
import { Search, Delete } from '@mui/icons-material';

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // Cargar historial de búsqueda al montar el componente
  useEffect(() => {
    const storedHistory = localStorage.getItem('userSearchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.items);
      } else {
        console.error('Error al buscar usuarios de GitHub');
      }
    } catch (error) {
      console.error('Error al buscar usuarios de GitHub', error);
    }
  };

  const handleUserSelect = (selectedUser) => {
    // Actualizar historial de búsqueda con la opción seleccionada
    const newHistory = [...searchHistory, selectedUser];
    setSearchHistory(newHistory);
    localStorage.setItem('userSearchHistory', JSON.stringify(newHistory));
  };

  const handleDeleteFromHistory = (index) => {
    // Eliminar elemento del historial por índice
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem('userSearchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className='flex justify-center'>
      <div className="max-w-screen-lg w-full flex justify-start">
        {/* Historial de búsqueda en el costado */}
        <Paper className="absolute top-6 left-5 mt-32 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <h2 className="text-lg font-bold mb-2">Historial de Búsqueda</h2>
          <List>
            {searchHistory.map((query, index) => (
              <ListItemText disablePadding key={index}>
                <div className="flex justify-between items-center">
                  <Link to={`/user/${query}`} className="block hover:text-gray-950 hover:bg-blue-400 rounded-md px-2 py-1">{query}</Link>
                  <IconButton color="inherit" onClick={() => handleDeleteFromHistory(index)}>
                    <Delete />
                  </IconButton>
                </div>
              </ListItemText>
            ))}
          </List>
        </Paper>

        {/* Contenido principal en el centro */}
        <div className='flex-1 text-center'>
          <div className="absolute top-6 left-4">
            <Button to="/">VOLVER AL MENÚ</Button>
          </div>
          <div className="absolute top-6 right-4">
            <Button to="/repoSearch">IR A BUSCAR REPOSITORIOS</Button>     
          </div>
          <div className="mt-10"> 
            <img className="mx-auto" src={Logo} alt="logo" /> 
          </div>
          <h1 className="font-extrabold my-5 text-4xl">BUSCAR USUARIOS EN GITHUB</h1>
          <div className="flex justify-center items-center">
            <TextField
              className='h-14'
              type="text"
              placeholder="Buscar Usuario"
              label="Usuario"
              variant='standard'
              id='standar-basic'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-rgb-purple hover:bg-blue-400 text-black font-bold py-2 px-4 rounded" onClick={handleSearch}>
              <Search className="w-6 h-6 mr-2" /> Buscar
            </button>
          </div>
          <div className="flex justify-center">
            <ul className="list-disc text-left mt-4 pl-4">
              {/* Mostrar resultados de búsqueda */}
              {users.map((user) => (
                <ListItemText disablePadding key={user.id}>
                  {/* Utiliza la función handleUserSelect al hacer clic en la opción */}
                  <Link to={`/user/${user.login}`} onClick={() => handleUserSelect(user.login)} className="block hover:text-gray-950 font-bold hover:bg-blue-400 rounded-md px-4 py-2">{user.login}</Link>
                </ListItemText>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchPage;
