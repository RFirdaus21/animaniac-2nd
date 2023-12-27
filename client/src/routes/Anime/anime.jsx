import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Anime() {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const baseUrl = `${serverUrl}/api/animes`;
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

        console.log(baseUrl)
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
        <table className='animes'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Release</th>
            <th>Studio</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <Link to={`/animes/${item.slug}`}>
                  <h3>{item.title}</h3>
                </Link>
              </td>
              <td>{item.release}</td>
              <td>{item.studio}</td>
              <td>{item.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
  )
}

export default Anime
