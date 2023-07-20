import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function MyListManga() {


    const [mal_id, setMal_id] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/getmanga').then((response) => {
            const email = localStorage.getItem("email");
            const mangaNames = response.data.filter(item => item.user_id == email); 
            setMal_id(mangaNames);
            console.log(response);
        })
    }, []);
    
    return (
        <MyListMangaStyled>
            <div className='popular-anime'>
                {mal_id.map((val, index) => {
                    return <Link to={`/manga/${val.mal_id}`} target="_blank" key={val.mal_id}>
                        <h1 style={{ padding: ".2rem", margin: ".5rem" }}>{index + 1}</h1>
                        <img src={val.image_url} alt="" />
                        <h1>{val.manga_name}</h1>
                        <h1 style={{ color: "red", fontSize:"30px" }}>Score:{val.score}</h1>
                    </Link>
                })}
            </div>
        </MyListMangaStyled>
    )
}

const MyListMangaStyled = styled.div`
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

export default MyListManga