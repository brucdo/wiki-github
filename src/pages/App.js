import { useState } from 'react';
import github from '../assets/github.png';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import {Container} from './styles';


function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){
      const isExist = repos.find(repo => repo.id===data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      }  
    }
    alert('Repositório não encontrado')
  }

  const handleRemoveRepo = (id) => {
    console.log('removendo registro ', id);
    const resul = repos.filter(checkId);
    function checkId(repo) {
      return repo.id !== id;
    }
    setRepos(resul);
  }

  return (
    <Container>
      <img src={github} width={72} height={72} alt="Logo github" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => 
        <ItemRepo repo={repo} key={repo.id} handleRemoveRepo={handleRemoveRepo} /> 
      )}
    </Container>
  );
}

export default App;

// https://api.github.com/repos/brucdo/clone-dio