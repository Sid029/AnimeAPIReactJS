
import { BrowserRouter } from 'react-router-dom';
import { useGlobalContext } from './Context/global';
import { Routes, Route } from "react-router-dom";
import AnimeItem from './Components/AnimeItem';
import Home from './Components/Home';
import Gallery from './Components/Gallery';
import GenreList from './Components/GenreList'
import MangaPop from './Components/MangaPop';


function App() {

  const global = useGlobalContext();
  console.log(global);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path='/anime/:id' element={<AnimeItem />} />
        
        <Route path='/manga/:id' element={<MangaPop />} />        

        <Route path='/character/:id' element={<Gallery />} />
        
        <Route path='/genre/:id/:nametitle' element={<GenreList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
