import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios';

function App() {

  const [ListaRecurso, setListaRecurso] = useState([])
  const [idToSearch, setIdToSearch] = useState("0")
  const [recurso, setRecurso] = useState("https://swapi.dev/api/people/")
  const [informacion, setInformacion] = useState({})
  useEffect(()=>{
    axios.get("https://swapi.dev/api/")
    .then(resultado =>{
      let arr = Object.entries(resultado.data);
      setListaRecurso(arr);
    })
    .catch((error)=>{
        console.log(error);
    })
  }, [])

  const Fetch = (e) =>{
    e.preventDefault()
    axios.get(recurso)
    .then(resultado =>{
      setInformacion(resultado.data.results[idToSearch])
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  
  const handleChange = (e) => {
    setRecurso(e.target.value)
  }
  return (
    <div >
      <select onChange={handleChange}>
        {ListaRecurso.map((recurso, index) => {
          return  <option key={index}  value={recurso[1]}>{recurso[0]}</option>
          })
        }
      </select>
      <form onSubmit={Fetch}>
        id: <input type="search" onChange={(e) => {setIdToSearch(e.target.value)}}/>
        <input type="submit"/>
      </form>
      <br/>
      {
        Object.entries(informacion).slice(0,5).map((elemento,i)=>{
          if (i == 0) {
            return <><h1>{elemento[1]}</h1><br></br></>
          }else{
            return <><b>{elemento[0]}: </b>{elemento[1]}<br></br></>
          }
            
          
        })
      }
    </div>
  );
}

export default App;
