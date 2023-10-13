
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepoSearchPage from './pages/RepoSearch';
import UserSearchPage from './pages/UserSearch';
import RepoDetailsPage from './pages/RepoDetailsPage';
import UserDetails from './pages/UserDetails';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/repoSearch" element={<RepoSearchPage/>} />
        <Route path="/userSearch" element={<UserSearchPage/> } />
        <Route path="/repo/:owner/:name" element={<RepoDetailsPage/>} />
        <Route path='/user/:username' element={<UserDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;