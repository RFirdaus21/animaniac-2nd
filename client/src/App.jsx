import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Anime from "./routes/Anime/anime";
import SingleAnime from "./routes/Anime/singleAnime";
import CreateAnime from "./routes/Anime/createAnime";
import EditBook from "./routes/Anime/editAnime";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/anime-list" element={<Anime />}/>
          <Route path="/animes/:slug" element={<SingleAnime />}/>
          <Route path="/add-anime" element={<CreateAnime />} />
          <Route path="/editanimes/:slug" element={<EditBook />} />
        </Routes>
        <Footer />
      </Router>
      
    </>
  )
}

export default App
