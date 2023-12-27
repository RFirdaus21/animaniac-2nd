import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

function SingleAnime() {
    
    const [data, setData] = useState([]);
    const urlSlug = useParams();
    const baseUrl = `http://localhost:8000/api/animes/${urlSlug.slug}`;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(()=> {
        const fetchData = async()=> {
            try {
                const response = await fetch(baseUrl);
                if(!response.ok){
                    throw new Error ("Failed Fetch data!");
                }
                const jsonData = await response.json();
                setData(jsonData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError("Error fetching data!!");
                setIsLoading(false);
            }
        }
        fetchData(); 
    },[]);
    

  return (
    <div>
      <Link to={"/anime-list"}>  </Link>
      <div className='animedetails'>
        <div className='col-1'>
           <img src={`http://localhost:8000/uploads/${data.thumbnail}`} 
            alt={data.title}/> <br/>
            <Link to={`/editanimes/${data.slug}`}>Edit</Link>
        </div>
        <div className='col-2'>
            <h1>{data.title}</h1>
            <p>Original Title : {data.jtitle}</p>
            <p>MAL Score : {data.score}</p>
            <p>Studio : {data.studio}</p>
            <p>Release Year : {data.release}</p>
            <p className='genre'>Genres : {data.genre}</p>
            <p>Synopis : {data.synopsis}</p>

        </div>
      </div>
    </div>
  )
}

export default SingleAnime
