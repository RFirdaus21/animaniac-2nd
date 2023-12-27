import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Anime() {
    const baseUrl = "http://localhost:8000/api/animes";
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(()=> {
        const fetchData = async()=> {
            try {
                let url = baseUrl;
                if(selectedCategory){
                    url += `?genre=${selectedCategory}`
                }
                const response = await fetch(url);
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
    },[selectedCategory]);
  return (
    <div>
      <h2>Anime List</h2>

      <Link to="/add-anime"><p>+ Add Anime</p></Link>

      <div className='filters'>
        <label>Categories</label> <br/><br/>
        <select onChange={(e)=>setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            <option value="action">Action</option>
            <option value="fantasy">Fantasy</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="romance">Romance</option>
            <option value="psychology">Psychology</option>
            <option value="slice of life">Slice of Life</option>
            <option value="drama">Drama</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
      <ul className='animes'>
        {data.map((item)=>(
            <li key={item._id}>
                <Link to={`/animes/${item.slug}`}>
                    <img src={`http://localhost:8000/uploads/${item.thumbnail}`} alt={item.title}/>
                    <h3>{item.title}</h3>
                </Link>
            </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default Anime
