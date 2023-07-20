import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../Context/global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

function MangaPop() {


    const { id } = useParams();
    console.log(id);
    const [manga, setManga] = React.useState({});
    const { getMangapic } = useGlobalContext();
    const [showmore, setShowmore] = React.useState({});
    const [favoriteMangaList, setFavoriteMangaList] = useState([]);
    const [characters, setCharacters] = React.useState([]);

    const {
        title, images,
        score, chapters,
        volumes, type,
        synopsis, rank, scored_by,
        popularity, status,
        members } = manga


    useEffect(() => {
        getManga(id);
        getCharacters(id);
        getMangapic(id);
        //getAnimepic(id);
        // eslint-disable-next-line
    }, [])
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    // const initialState = {
    //     mangapic: [],
    // };

    //get manga with mal id
    const getManga = async (manga) => {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${manga}`);
        const data = await response.json();
        setManga(data.data);
        console.log(data.data);
    }

    const getCharacters = async (manga) => {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${manga}/characters`);
        const data = await response.json();
        setCharacters(data.data);
        console.log(data.data);
    }

        useEffect(() => {
            // Fetch the favorite anime list
            const email = localStorage.getItem("email");    
            axios
                .get('http://localhost:3001/api/getmanga')
                .then(response => {
                    const animeNames = response.data.filter(item => item.user_id === email);
                    // Update the state with the fetched data
                    setFavoriteMangaList(animeNames);
                })
                .catch(error => {
                    console.log(error);
                });
        }, []);


    const isAlreadyFavorited = favoriteMangaList.some(
        favoriteManga => favoriteManga.manga_name === title
    );

    const favoriteManga = () => {
        window.location.reload();
        if (isAlreadyFavorited) {
            alert("Manga is already favorited!");
        } else {
            axios
                .post('http://localhost:3001/api/favManga', {
                    mal_id: id,
                    manga_name: title,
                    image_url: images?.jpg.image_url,
                    score: score,
                    user_id:localStorage.getItem("email")
                })
                .then(() => {
                    alert("Successful insert");
                    // Update the favorite manga list
                    setFavoriteMangaList(prevList => [
                        ...prevList,
                        {
                            mal_id: id,
                            manga_name: title,
                            image_url: images?.jpg.image_url,
                            score: score,
                            user_id:localStorage.getItem("email")
                        }
                    ]);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };



    return (
        <div>
            <MangaStyled>
                <div className='back'>
                    <Link onClick={handleBackClick}>
                        Back
                    </Link>
                </div>
                <div className="info">
                    <h1>{title}</h1>
                    <div className='details'>
                        <div className='information'>
                            <h3><span>Chapters: </span><span>{chapters}</span></h3>
                            <h3><span>Volumes: </span><span>{volumes}</span></h3>
                            <h3><span>Status: </span><span>{status}</span></h3>
                            <h3><span>Rank: </span><span>{rank}</span></h3>
                            <h3><span>Popularity: </span><span>{popularity}</span></h3>
                            <h3><span>Type: </span><span>{type}</span></h3>
                            <h3><span>Score: </span><span>{score}</span></h3>
                            <h3><span>Scored by: </span><span>{scored_by}</span></h3>
                            <h3><span>Members: </span><span>{members}</span></h3>
                            {/* <div className='genre'>
                            <h3>Genres:</h3>
                            {anime.genres.map((genre) => (
                                <h5 key={genre.mal_id}>
                                        <Link to={`genre/${genre.mal_id}/${genre.name}`}>
                                            {genre.name}
                                        </Link>
                                </h5> 
                            ))}
                        </div> */}
                            <button onClick={favoriteManga} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }} hidden={!isAlreadyFavorited} disabled={isAlreadyFavorited} >
                                <FontAwesomeIcon icon={faHeart} style={{ fontSize: 54, color: "red" }} />
                            </button>
                            <button onClick={favoriteManga} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }} hidden={isAlreadyFavorited} disabled={isAlreadyFavorited} >
                                <FontAwesomeIcon icon={faHeart} style={{ fontSize: 54, color: "white" }} />
                            </button>
                        </div>
                        <div className='image'>
                            <img src={images?.jpg.large_image_url} alt='/'></img>
                        </div>
                    </div>
                    <h2 className='synopsis'>
                        <h2>
                            Synopsis:
                        </h2>
                        {showmore ? synopsis?.substring(0, 500) + '...' : synopsis};
                        <button onClick={() => {
                            setShowmore(!showmore)
                        }}>{showmore ? ' Read more' : 'Show less'}</button>
                    </h2>
                </div>

                <h1 className='trailer'>
                    Pictures
                </h1>
                <div className='trailer-con'>
                    {/* {mangapic.map((manga) => {
                        return <h5 key={manga.mal_id}>
                                <a href={manga?.jpg.image_url} target="blank">
                                    <img src={manga?.jpg.image_url} alt='' />
                                </a>
                            </h5>
                    })} */}
                </div>

                <h1 className='trailer'>
                    Characters
                </h1>
                <div className='characters'>
                    {characters?.map((character, index) => {
                        const { role } = character;
                        const { images, name, mal_id } = character.character;
                            return (
                                <Link to={`/character/${mal_id}`} key={index}>
                                    <div className='character'>
                                        <img src={images?.jpg.image_url} alt="" />
                                        <h4>{name}</h4>
                                        <p>{role}</p>
                                    </div>
                                </Link>
                            ); 
                    })}
                </div>

            </MangaStyled>
        </div>
    )
}

const MangaStyled = styled.div`

.genre {
    display: flex;
    flex-wrap: wrap; 
    align-items: center;
    margin-top: 5px;
  }

  .genre h3 {
    margin: 15px;
    color: beige;
  }

  .genre h5 a {
    text-decoration:none;
    padding: 6px;
    margin: 3px;
    color:gold;
    text-aling:center;
    background-color: #222401;
    font-size: 15px;
    border-radius: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border:2px solid transparent;
  }

  .genre h5 a:hover{
    opacity:1;
    transition:0.6s;    
    border:2px solid gold;
    filter:brightness(1.1);
}

.back{
    position:absolute;
    top:2rem;
    left:3rem;
    a{
      text-decoration:none;
      font-size:20px;
      font-weight:400;
      color:gold;
    }
  }
  
  .back:hover{
    cursor:pointer;
    transition:0.5s ease-in-out;
    color:gold;
  }

    padding: 3rem 18rem;
	background: #222831; 
    .info{
        background: #393e46; 
        border-radius:20px;
        padding: 2rem;
        border:2px solid ;
        .details{
            background:#222831;
            padding:2rem;
            border-radius:30px;
            display:grid;
            gap:200px;
            grid-template-columns: repeat(2,1fr);
            img{
                height:100%;
                width:100%;
                border-radius:30px;
            }
            img:hover{
                transition:0.2s;
                cursor:pointer;
            }
            .information{
                color:beige;
                font-weight:0;
                font-size:17px;
                content:right;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                h3{
                    display:flex;
                    gap:1rem;
                    span:first-child{
                        font-weight:800;
                        color:gold;
                        font-size:30px;
                    }
                    span{
                        font-size:30px;
                    }
                }
                
            }
        }
    }
    h1{
        font-family:SpaceGrotesk-Light;
        line-height: 1.2;
        font-weight: 500;
        font-size: 64px;
        margin-bottom: 40px;
        color: beige; 
        font-style: italic; 
        text-align: center;
        border-bottom: 2px solid gold;
    }

        
    h2{
        margin-top: 2rem;
        color:white;
        line-height: 2.7rem;
        color: beige
    }
    .synopsis{
        margin-top: 2rem;
        color:white;
        line-height: 2.7rem;
        color: beige;
        button{
            background-color:transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.6rem;
            color: gold;
            font-weight:bolder;

        }
    }
        .trailer-con{
            display:flex;
            justify-content:center;
            flex-wrap:wrap; 
            padding:4rem;
            margin:2rem;
            border: 2px solid #222831;
            background:black;
            gap:3rem;
            img{
                height:100%;
                width:100%;
                border: 2px solid transparent;
            }
            img:hover{
                border:2px solid gold;
                filter: brightness(1.3);
                cursor:pointer;
                transition:0.6s;
            }
            iframe{
                outline:none;
                border:1px solid;
                padding:1.5rem;
                border-radius:20px;
                background-color:#393e46;
                
            }
        }
    .trailer{
        border:none;
        padding-top:2rem;
    }

    .characters{
        display:grid;
        grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
        grid-gap:2rem;
        background-color:#393e46;
        padding:2rem;
        border-radius:10px;
        border: 5px solid ;
        width:100%;
        height:100%;
        .character{
            padding:2rem;
            border-radius:10px;
            background-color:#222831;
            transition: all .4s ease-in-out;
            text-align:center;
            text-color:beige;
            
            h4{
                color:beige;
                font-size:20px;
                font-weight:800;
            }
            p{
                color:beige;
                font-size:15px;
                font-weight:800;
            }
            img{
                width:100%;
                height:100%;
            }
        }
        .character:hover{
            background-color:black;
            transition:0.6s;
            h4{
                color:gold;
            }
            p{
                color:gold;
            }
        }
    }
`;


export default MangaPop