import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Logo from "../assets/img/github.png";
import { ListItemText, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';


const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
    <div className='text-center'>
      <div className="absolute top-6 left-4">
      <Button to="/">Volver a la Home</Button>
      </div>
      <div className="absolute top-6 right-4">
        <Button to="/repoSearch">Ir a buscar Repositorios</Button>
      </div>
      <div className="mt-10"> {/* Agrega margen superior para separar la imagen */}
        <img className="mx-auto" src={Logo} alt="logo" /> {/* mx-auto para centrar la imagen horizontalmente */}
      </div>
      <h1 className="font-extrabold my-5 text-4xl">Buscar Usuarios de GitHub</h1>
      <div className="flex justify-center items-center">
      <TextField
        className='h-14'
        type="text"
        placeholder="Buscar Usuario"
        label= "Usuario"
        variant='standard'
        id='standar-basic'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="bg-rgb-purple hover:bg-blue-400 text-black font-bold py-2 px-4 rounded" onClick={handleSearch}>
      <Search className="w-6 h-6 mr-2" /> Buscar</button>
      </div>
      <div className="flex justify-center">
        <ul className="list-disc text-left mt-4 pl-4">
        {users.map((user) => (
          <ListItemText disablePadding key={user.id}>
            <Link to={`/user/${user.login}`} className="block  hover:text-gray-950 font-bold hover:bg-blue-400 rounded-md px-4 py-2">{user.login}</Link>
          </ListItemText>
        ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default UserSearchPage;
