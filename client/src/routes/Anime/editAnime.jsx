import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import NoImageSelected from '../../assets/no-image.png';

function editAnime() {
    const urlSlug = useParams();
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const baseUrl = `http://localhost:8000/api/animes/${urlSlug.slug}`;

    const navigate = useNavigate();

    const [animeId, setAnimeId] = useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [jtitle, setJtitle] = useState("");
    const [score, setScore] = useState(0);
    const [studio, setStudio] = useState("");
    const [release, setRelease] = useState("");
    const [genre, setGenre] = useState([]);
    const [synopsis, setSynopsis] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState("");
    const [image, setImage] = useState("");

    const fetchData = async ()=> {
        try {
            const response = await fetch(baseUrl);

            if(!response.ok) {
                throw new Error("failed to fetch data")
            }
            const data = await response.json();
            setAnimeId(data._id);
            setTitle(data.title);
            setSlug(data.slug);
            setJtitle(data.jtitle);
            setScore(data.score);
            setStudio(data.studio);
            setRelease(data.release);
            setThumbnail(data.thumbnail);
            setGenre(data.genre);
            setSynopsis(data.synopsis);
            

        } catch (error) {
            
        }
    } 

    useEffect(()=> {
        fetchData();
    }, []);

    

    const createAnime = async(e)=> {
        e.preventDefault();
        console.table([title, slug ]);

        const formData = new FormData();
        formData.append("animeId", animeId);
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("jtitle",jtitle);
        formData.append("score", score);
        formData.append("studio", studio);
        formData.append("release", release);
        formData.append("genre", genre);
        formData.append("synopsis", synopsis);
        
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/animes`, {
                method: "PUT",
                headers : {},
                body: formData,
            });
        

            if(response.ok) {
                setTitle("");
                setSlug("");
                setSubmitted(true);
            } else {
                console.log("Failed to submit data.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGenre = (e) => {
        setGenre(e.target.value.split(",").map((genre) => genre.trim()));
    }    

    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    }

    const removeAnime = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/animes/` + animeId, {
                method: "DELETE"
            })

            if (response.ok) {
                navigate("/list-anime");
                console.log("Anime removed");
            }
        } catch (error) {
            console.error(error);
        }
    }



  return (
    <div>
        <h1>Edit Anime</h1>
        <p>Edit the anime details here</p>

        <button onClick={removeAnime} className='delete'>
            Delete Anime
        </button>

        {submitted ? (
            <p>Data sucessfully edited</p>
        ):(
            <form className='animedetails' onSubmit={createAnime}>
                <div className='col-1'>
                    <label>Upload Picture</label>
                    {image ? (
                        <img src={`${image}`} alt="image preview" />
                    ):(
                        <img src={`${serverUrl}/uploads/${thumbnail}`} alt='image preview'/>
                    ) }
                    <input 
                        type='file' 
                        accept='image/jpg, image/png, image/jpeg'
                        onChange={onImageChange} />
                </div>
                <div className='col-2'>
                    <div>
                        <label>Title</label>
                        <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} required/>
                    </div>

                    <div>
                        <label>Slug</label>
                        <input type='text' value={slug} onChange={(e)=> setSlug(e.target.value)} required/>
                    </div>

                    <div>
                        <label>Original Title</label>
                        <input type='text' value={jtitle} onChange={(e)=> setJtitle(e.target.value)} />
                    </div>

                    <div>
                        <label>MAL Score</label>
                        <input type='text' value={score} onChange={(e)=> setScore(e.target.value)} />
                    </div>

                    <div>
                        <label>Studio</label>
                        <input type='text' value={studio} onChange={(e)=> setStudio(e.target.value)} />
                    </div>

                    <div>
                        <label>Release Year</label>
                        <input type='text' value={release} onChange={(e)=> setRelease(e.target.value)} />
                    </div>

                    <div>
                        <label>Genre (comma-separated)</label>
                        <input 
                            type='text' 
                            value={genre} 
                            onChange={handleGenre} />
                    </div>

                    <div>
                        <label>Synopsis</label>
                        <textarea
                            rows="4"
                            cols="50" 
                            type='text' 
                            value={synopsis} 
                            onChange={(e)=> setSynopsis(e.target.value)} 
                        />
                    </div>

                    <input type='submit'/>
                </div>
            </form>
        )}
      
    </div>
  )
}

export default editAnime;
