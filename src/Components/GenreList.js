import React, { useState } from 'react'
import { useGlobalContext } from '../Context/global'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { styled } from 'styled-components';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';



function GenreList({ rendered }) {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { id } = useParams();
  const { nametitle } = useParams();
  const [mal_id] = useState("");
  const [anime_name] = useState("");
  const [image_url] = useState("");
  const location = useLocation();

  const favoriteAnime = () => {
    axios.post('http://localhost:3001/api/favorite', {
      mal_id: mal_id,
      anime_name: anime_name,
      image_url: image_url
    }).then(() => {
      alert("successful insert")
    })
  }

  console.log(id);
  console.log(nametitle);
  const { scrollToTop } = useGlobalContext();
  const [genresAnime, setGenresanime] = React.useState([]);
  const [variable, setVariable] = useState(1);


  const getAnimebyGenrefunc = async (id, variable) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${id}&order_by=score&sort=desc&page=${variable}&sfw`);
    const data = await response.json();
    setGenresanime(data.data);
    console.log(data.data);
  }
  {
    isAuthenticated ?
      <p hidden>
        {localStorage.setItem("email", user.name)}
        {localStorage.setItem("nickname", user.nickname)}
      </p>
      :
      <p hidden>
        {localStorage.getItem("email") !== "" && (
          <>
            {localStorage.removeItem("email")}
            {localStorage.removeItem("nickname")}
          </>
        )}

        <p hidden>
          {/* Content when condition is true */}
        </p>
      </p>
  }

  const { Email_local, setString, setVariableAiring, setVariableUpcoming, setVariableManga, setVariableglb,
    setSearch } = useGlobalContext();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    getAnimebyGenrefunc(id, variable);
    // eslint-disable-next-line
  }, [])

  return (

    <div>
      <GenreListStyled>
        <div className='Header'>
        {isAuthenticated ?
                        <div className="continuous-text-container" style={{ position: "fixed",zIndex: "9999" , background:"#2"}} onClick={() => {
                            loginWithRedirect();
                            setVariable(1);
                            setVariableAiring(1);
                            setVariableUpcoming(1);
                            setVariableManga(1);
                            setVariableglb(1);
                            setSearch('');
                        }}>
                            <div className="continuous-text" style={{position: "relative",zIndex: "9999"}}>
                                <p style={{
                                    color: "gold",
                                    fontSize: "30px", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontWeight: "1000",letterSpacing:"8px"
                                }}>Welecome {user.nickname}. Enjoy your stay at AnimeAPI - the best place to keep track of all your favorite Anime and Manga.</p>
                            </div>
                        </div>
                        :

                        <div className="continuous-text-container" style={{ cursor: "pointer",position: "fixed",zIndex: "9999", background:"#212529" }} onClick={() => {
                            loginWithRedirect();
                            setVariable(1);
                            setVariableAiring(1);
                            setVariableUpcoming(1);
                            setVariableManga(1);
                            setVariableglb(1);
                            setSearch('');
                        }}>
                            <div className="continuous-text"  style={{position: "relative",zIndex: "9999" }}>
                                <p style={{
                                    color: "gold",position: "relative",zIndex: "9999",
                                    fontSize: "30px", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontWeight: "1000",letterSpacing:"8px"
                                }}>Create your Anime and Manga List here on AnimeAPI. Click the banner to sign up.</p>
                            </div>
                        </div>
                }
          <h1>{nametitle} Anime</h1>
        </div>
        <div className='back'>
          <Link onClick={handleBackClick}>
            Back
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "right", padding: "2rem", flexWrap: "wrap" }}>
          {
            localStorage.getItem('email') ?
              <div className='search-btn-logout' style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                <p style={{ color: "gold", display: "flex", justifyContent: "center", textAlign: "center", fontSize: "25px" }}>
                  Logged in as {localStorage.getItem('email')}
                </p>
                <button className='log' onClick={() => {
                  logout({ logoutParams: { returnTo: window.location.origin } });
                  setVariable(1);
                  setVariableAiring(1);
                  setVariableUpcoming(1);
                  setVariableManga(1);
                  setVariableglb(1);
                  setSearch('');
                  localStorage.removeItem("email");
                  localStorage.removeItem("nickname");
                }}>Logout</button>
              </div>
              : <h1>
                Not Logged in
              </h1>

          }
          <h1>Page:</h1>
          <h2></h2>
          <h1 className="page" style={{ color: "gold" }}>Page: {variable}</h1>
        </div>
        <div className='search' style={{ marginTop: "2rem", marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
          <div className='search-btn-prev'>
            {variable !== 1 && (
              <button onClick={() => {
                setVariable(variable - 1);
                getAnimebyGenrefunc(id, variable - 1);
                scrollToTop();
              }}>Previous</button>)
            }
          </div>
          <div className='search-btn-next'>
            <button onClick={() => {
              setVariable(variable + 1);
              getAnimebyGenrefunc(id, variable + 1);
              scrollToTop();
            }}>Next</button>
          </div>
        </div>
        <div className='popular-anime'>
          {genresAnime?.map((genresAnime, index) => {

            return (<Link to={`/anime/${genresAnime.mal_id}`}
              style={
                { border: index === 0 && variable === 1 ? "5px solid gold" : index === 1 && variable === 1 ? "5px solid silver" : index === 2 && variable === 1 ? "5px solid brown" : "" }}>
              {index === 0 && variable === 1 && (
                <h1 style={{ border: "4px solid gold", color: "gold", fontSize: "35px" }}>Number 1</h1>
              )}
              {index === 1 && variable === 1 && (
                <h1 style={{ border: "4px solid silver", color: "silver", fontSize: "30px" }}>Number 2</h1>
              )}
              {index === 2 && variable === 1 && (
                <h1 style={{ border: "4px solid brown", color: "brown", fontSize: "25px" }}>Number 3</h1>
              )}
              {(index !== 0 && index !== 1 && index !== 2 && variable === 1) && (
                <h1 style={{ border: "4px solid beige", color: "beige", fontSize: "20px" }}>Number {index + 1}</h1>
              )}

              <img src={genresAnime.images?.jpg.image_url} alt="" />
              <h1>{genresAnime.title}</h1>
              <div className='infoabtanime'>
                <h3>Adaptation:{genresAnime.source}</h3>
                <h3>Score:<span className='score' style={{
                  color: genresAnime.score >= 9.0 ? "Gold" : "beige"
                }}>{genresAnime.score}</span></h3>
                <div className='genre'>
                  <h3>Genres:</h3>
                  {genresAnime.genres.map((genre) => (
                    <h5 key={genre.mal_id}>
                      <Link
                        to={`/genre/${genre.mal_id}/${genre.name}`} target='_blank'
                      >
                        {genre.name}
                      </Link>
                    </h5>
                  ))}

                </div>
              </div>


            </Link>
            );
          })}
        </div>
      </GenreListStyled >
    </div >
  )
}

const GenreListStyled = styled.div`

.continuous-text-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  overflow: hidden;
  background:black;
  padding:2rem;
}

.continuous-text {
  animation: continuousTextAnimation 20s linear infinite;
  white-space: nowrap;
}

@keyframes continuousTextAnimation {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.log{
  display:flex;
  cursor:pointer;
  align-items:center;
  padding:.7rem 1.5rem;
  color:beige;
  background:#222831;
  outline:none;
  border-radius:10px;
  font-family:inherit;
  width: 130px;
  justify-content:center;
  height: 40px;
}
.log:hover{
  cursor:pointer;
  transition:0.5s ease-in-out;
  border:2px solid gold;
  color:gold;
}
.log:focus{
  color:black;
  border:2px solid gold;
}

button{
  display:flex;
  align-items:center;
  padding:.7rem 1.5rem;
  color:beige;
  background:#222831;
  font-size:20px;
  outline:none;
  border-radius:10px;
  font-family:inherit;
  width: 170px;
  justify-content:center;
  height: 60px;
}
button:hover{
  cursor:pointer;
  transition:0.5s ease-in-out;
  border:2px solid gold;
  color:gold;
}
button:focus{
  color:gold;
  border:2px solid gold;
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

.search{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:2rem;
        button{
            display:flex;
            align-items:center;
            padding:.7rem 1.5rem;
            color:beige;
            background:#222831;
            outline:none;
            border-radius:10px;
            font-family:inherit;
            width: 130px;
            justify-content:center;
            height: 40px;
        }
        button:hover{
            cursor:pointer;
            transition:0.5s ease-in-out;
            border:2px solid gold;
            color:gold;
        }
        button:focus{
            color:gold;
            border:2px solid gold;
        }
    }

.Header{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  text-align: center;
}

.Header h1{
  color: gold;
  font-weight: 1000;
  font-family: monospace;
}

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

.popular-anime{
    margin-top: 2rem;
    margin-left: 3rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    width:100%;
    display:grid;
    grid-template-columns: repeat(auto-fill,minmax(320px,1fr));
    grid-gap: 1rem;
    background-color: black;
    border-top: 5px solid;
     a{
        height:720px;
        border-radius: 7px;
        border: 2px solid #222831; 
        padding:2rem;
        opacity:0.95;
        background:#222831;
    }        
    
     a img{
        width:100%;
        height:70%;
        object-fit: cover;
        border-radius:5px;
    }
     a:hover{
        opacity:1;
        transition:0.6s;    
        border:2px solid beige;
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

export default GenreList