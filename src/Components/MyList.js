import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function MyList() {
    const [watched, setWatchedd] = useState([]);
    const [animeNames] = useState("");

    const setWatched = () => {
        window.location.reload();
            // Anime is not favorited, add it to the database
            axios
                .post('http://localhost:3001/api/watched', {
                   user_id:localStorage.getItem('email'),
                   watch: "True"
                })
                .then(() => {
                    alert("Successful insert");
                    // Update the favorite anime list
                    setWatchedd(prevList => [
                        ...prevList,
                        {
                          user_id:localStorage.getItem('email'),
                           watch:"True"
                        }
                    ]);
                })
                .catch(error => {
                    console.log(error);
                });
    };


    const [mal_id, setMal_id] = React.useState([]);

    useEffect(() => {
        const email = localStorage.getItem("email");
        axios.get(`http://localhost:3001/api/get?user_id=${email}`).then((response) => {
            const animeNames = response.data.filter(item => item.user_id === email);
            setMal_id(animeNames)
            console.log(animeNames);
        })
    }, []);
    
    return (
        <MyListStyled>
            <div className='popular-anime'>
                {mal_id.map((val, index) => {
                    return <Link to={`/anime/${val.mal_id}`} target="_blank" key={val.mal_id}>
                        <h1 style={{ padding: ".2rem", margin: ".5rem" }}>{index + 1}</h1>
                        <img src={val.image_url} alt="" />
                        <h1>{val.anime_name}</h1>
                        <h1 style={{ color: "red" }}>{val.rating}</h1>
                                   
                    </Link>
                })}
            </div>
        </MyListStyled>
    )
}

const MyListStyled = styled.div`

display:flex;


.popular-anime{
    margin-top: 2rem;
    margin-left: 3rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    width:100%;
    display:grid;
    grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    grid-gap: 1rem;
    border-top: 5px solid;
    a{
        height:720px;
        border-radius: 7px;
        padding:2rem;
        border: 2px solid #222831; 
        opacity:0.95;
        background:#222831;
    }        
    
    a img{
        width:100%;
        height:75%;
        object-fit: cover;
        border-radius:5px;
    }
    a:hover{
        opacity:1;
        transition:0.6s;    
        border:2px solid gold;
        filter:brightness(1.1);
    }
    .infoabtanime{
        display:grid;
        color:beige;
        font-size:15px;
        clear:right;
        font-weight:1000;
        grid-template-columns: repeat(1,1fr);
        h3{
            text-decoration:none;
            display:flex;
            justify-content:center;
      }

        .score{
            color:red;
            font-size:20px;
        }
    }
    a h1{
        text-decoration:none;
      color:gold;
      font-size:20px;
      text-align:center;
      font-weight:1000;
    }
    
    
}
`;

export default MyList