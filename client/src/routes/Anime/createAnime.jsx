import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoImageSelected from '../../assets/no-image.png';

function CreateAnime() {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();

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
    const [image, setImage] = useState(NoImageSelected);

    // const formData = new FormData({
    //     title: title,
    //     slug: slug,
    //     jtitle: jtitle,
    //     score: score,
    //     studio: studio,
    //     release: release,
    //     genre: genre,
    //     synopsis: synopsis,
    //     thumbnail: thumbnail,
    //   });
    // formData.append("title", title);
    // formData.append("slug", slug);
    // formData.append("jtitle",jtitle);
    // formData.append("score", score);
    // formData.append("studio", studio);
    // formData.append("release", release);
    // formData.append("genre", genre);
    // formData.append("synopsis", synopsis);
    // formData.append("thumbnail", thumbnail);

    const createAnime = async(e)=> {
        e.preventDefault();
        console.table([title, slug ]);
        try {
            const response = await fetch(`${serverUrl}/api/animes`, {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    slug: slug,
                    jtitle: jtitle,
                    score: score,
                    studio: studio,
                    release: release,
                    genre: genre,
                    synopsis: synopsis,
                    // thumbnail: thumbnail,
                  }),
                headers: {'Content-Type': 'application/json'}
            });
        

            if(response.ok) {
                setTitle("");
                setSlug("");
                setGenre([]);
                setSubmitted(true);
                navigate("/anime-list");
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



  return (
    <div>
        <h1>Add Anime</h1>
        <p>Add the anime details here</p>

        {submitted ? (
            <p>Data sucessfully added</p>
        ):(
            <form className='animedetails' onSubmit={createAnime}>
                {/* <div className='col-1'>
                    <label>Upload Picture</label>
                    <img src={image} alt='image preview'/>
                    <input 
                        type='file' 
                        accept='image/jpg, image/png, image/jpeg'
                        onChange={onImageChange} />
                </div> */}
                <div>
                    <div>
                        <label>Title</label>
                        <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} />
                    </div>

                    <div>
                        <label>Slug</label>
                        <input type='text' value={slug} onChange={(e)=> setSlug(e.target.value)} />
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

export default CreateAnime;
