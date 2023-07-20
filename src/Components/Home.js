import React, { useEffect } from 'react'
import Popular from './Popular';
import { useGlobalContext } from '../Context/global';
import { styled } from 'styled-components'
import Upcoming from './Upcoming';
import Airing from './Airing';
import Genre from './Genre';
import Random from './Random';
import MyList from './MyList';
import Manga from './Manga';
import Search from './Search';
import MyListManga from './MyListManga';
import Login from './Login';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useState } from 'react';
import Watched from './Watched';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Home() {

    const { handleSubmit, setSearch, search, handleChange, scrollToTop, getManga, variableglb, setVariableglb,
        getAiring, getPopular, getUpcoming, isSearch, searchResults, getGenres, getRandom } = useGlobalContext();
    const [rendered, setRendered] = React.useState('airing');
    const [variable, setVariable] = React.useState(1);
    const [variableAiring, setVariableAiring] = React.useState(1);
    const [variableUpcoming, setVariableUpcoming] = React.useState(1);
    const [variableManga, setVariableManga] = React.useState(1);
    const [string, setString] = React.useState('airing');
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    const [Userlogin, setUserlogin] = useState([]);
    const [isClicked, setIsClicked] = useState(false);



    const isAlreadyUser = Userlogin.some(
        useremail => useremail.email === localStorage.getItem("email")
    );


    const Loginset = () => {
        if (isAlreadyUser && isAuthenticated) {
            alert("Welcome Back");
        } else {
            console.log("Hello from loginset");
            axios
                .post('http://localhost:3001/api/user', {
                    nickname: localStorage.getItem("nickname"),
                    email: localStorage.getItem("email")
                })
                .then(() => {
                    alert("Successful insert");
                    setUserlogin(prevList => [
                        ...prevList,
                        {
                            nickname: localStorage.getItem("nickname"),
                            email: localStorage.getItem("email")
                        }
                    ]);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            Loginset();
        }
    }, [isAuthenticated]);


    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered}></Popular>
            case 'upcoming':
                return <Upcoming rendered={rendered}></Upcoming>
            case 'airing':
                return <Airing rendered={rendered}></Airing>
            case 'genres':
                return <Genre rendered={rendered}></Genre>
            case 'random':
                return <Random rendered={rendered}></Random>
            case 'favorite':
                return <MyList rendered={rendered}></MyList>
            case 'manga_list':
                return <Manga rendered={rendered}></Manga>
            case 'searching':
                return <Search rendered={rendered}></Search>
            case 'favmanga':
                return <MyListManga rendered={rendered}></MyListManga>
            case 'login':
                return <Login rendered={rendered}></Login>
            case 'watched':
                return <Watched rendered={rendered}></Watched>
            default:
                return <Popular rendered={rendered}></Popular>
        }
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/getuser')
            .then(response => {
                setUserlogin(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    return (
        <div>
            <HomeStyled>
                {
                    isAuthenticated ?
                        <div className="continuous-text-container" style={{ position: "fixed", zIndex: "9999", background:"#212529", }}>
                            <div className="continuous-text" style={{ position: "relative", zIndex: "9999" }}>
                                <p style={{
                                    color: "gold",
                                    fontSize: "30px", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontWeight: "1000", letterSpacing: "8px"
                                }}>Welecome {user.nickname}. Enjoy your stay at AnimeAPI - the best place to keep track of all your favorite Anime and Manga.</p>
                            </div>
                        </div>
                        :

                        <div className="continuous-text-container" style={{ cursor: "pointer", position: "fixed", zIndex: "9999", background:"#212529" }} onClick={() => {
                            loginWithRedirect();
                            setVariable(1);
                            setVariableAiring(1);
                            setVariableUpcoming(1);
                            setVariableManga(1);
                            setVariableglb(1);
                            setSearch('');
                        }}>
                            <div className="continuous-text" style={{ position: "relative", zIndex: "9999" }}>
                                <p style={{
                                    color: "gold", position: "relative", zIndex: "9999",
                                    fontSize: "30px", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontWeight: "1000", letterSpacing: "8px"
                                }}>Create your Anime and Manga List here on AnimeAPI. Click the banner to sign up.</p>
                            </div>
                        </div>
                }

                <header>

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

                    <nav className='navbar'>
                        <div className='search'>
                            <ul>
                                <li>
                                    <div className='search-btn-popular'>
                                        <button onClick={() => {
                                            setRendered('popular')
                                            setString("popular");
                                            getPopular(variable);
                                            setVariableAiring(1);
                                            setVariableUpcoming(1);
                                            setVariableManga(1);
                                            setVariableglb(1);
                                            setSearch('');

                                        }}>Popular</button>
                                    </div>
                                </li>
                                <li>
                                    <div autoFocus className='search-btn-airing' >
                                        <button onClick={() => {
                                            setRendered('airing')
                                            setString("airing");
                                            getAiring(1);
                                            setVariable(1);
                                            setVariableManga(1);
                                            setVariableglb(1);
                                            setSearch('');
                                        }}>Airing</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='search-btn-upcoming'>
                                        <button onClick={() => {
                                            setRendered('upcoming')
                                            setString("upcoming");
                                            getUpcoming(1);
                                            setVariable(1);
                                            setVariableAiring(1);
                                            setVariableManga(1);
                                            setVariableglb(1);
                                            setSearch('');
                                        }}>Upcoming</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='search-btn-manga-popular'>
                                        <button onClick={() => {
                                            setRendered('manga_list')
                                            setString("manga_list");
                                            getManga(variable);
                                            setVariable(1);
                                            setVariableAiring(1);
                                            setVariableUpcoming(1);
                                            setVariableglb(1);
                                            setSearch('');
                                        }}>Manga</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='search-btn-random'>
                                        <button onClick={() => {
                                            setRendered('random')
                                            setString("random");
                                            getRandom();
                                            setVariable(1);
                                            setVariableAiring(1);
                                            setVariableUpcoming(1);
                                            setVariableManga(1);
                                            setVariableglb(1);
                                            setSearch('');
                                        }}>Feeling Lucky?</button>
                                    </div>
                                </li>
                                <li>
                                    <div className='search-btn-genres'>
                                        <button onClick={() => {
                                            setRendered('genres')
                                            setString("genres");
                                            getGenres();
                                            setVariable(1);
                                            setVariableAiring(1);
                                            setVariableUpcoming(1);
                                            setVariableManga(1);
                                            setVariableglb(1);
                                            setSearch('');
                                        }}>Genres</button>
                                    </div>
                                </li>
                                <li>
                                    <form action='' className='searchForm' value={search} onSubmit={handleSubmit} onClick={() => {
                                        setRendered('searching')
                                        setString("searching");
                                        setVariable(1);
                                        setVariableAiring(1);
                                        setVariableUpcoming(1);
                                        setVariableManga(1);
                                    }}>

                                        <div className='input-control'>
                                            <input style={{ height: "79px", width: "650px" }} type="text" placeholder='Search Anime' value={search} onChange={handleChange} className='searchbtnclick'></input>
                                            <button style={{
                                                height: "90px",
                                                width: "245px",
                                                display: "flex",
                                                alignItems: "center",
                                                padding: ".7rem rem",
                                                color: "beige",
                                                background: "#222831",
                                                paddingtop: "2rem",
                                                fontsize: "28px",
                                                outline: "none",
                                                borderradius: "10px",
                                                fontfamily: "inherit",
                                                justifycontent: "center",
                                            }} type='submit'>Search</button>
                                        </div>
                                    </form>
                                </li>



                                {/* <div style={{ display: "flex", justifyContent: "right", paddingtop: "3rem", flexWrap: "wrap" }}>
                                    {
                                        localStorage.getItem('email') ?
                                                <div className='search-btn-logout' style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                                        <h2 style={{
                                                            color: "gold", display: "flex",
                                                            justifyContent: "center", textAlign: "center", fontSize: "25px",
                                                            padding: "2.4rem"
                                                        }}>
                                                            {user.nickname}
                                                        </h2>
                                                </div>
                                            : <p hidden></p>
                                    }
                                </div> */}
                                {
                                    isAuthenticated &&
                                    <div class="dropdown">
                                        <ul>
                                            <FontAwesomeIcon class="dropbtn" style={{ cursor: "pointer", height: "100px", width: "105px" }} icon={faUserCircle} size="lg" />
                                        </ul>
                                        <div class="dropdown-content">
                                            <div className='search-btn-favorite'>
                                                <button onClick={() => {
                                                    setRendered('favorite')
                                                    setString("favorite");
                                                    getGenres();
                                                    setVariable(1);
                                                    setVariableAiring(1);
                                                    setVariableUpcoming(1);
                                                    setVariableManga(1);
                                                    setVariableglb(1);
                                                    setSearch('');
                                                }} className='btndiff'>My Favorites Anime</button>
                                            </div>



                                            <div className='search-btn-favorite'>
                                                <button onClick={() => {
                                                    setRendered('favmanga')
                                                    setString("favmanga");
                                                    getGenres();
                                                    setVariable(1);
                                                    setVariableAiring(1);
                                                    setVariableUpcoming(1);
                                                    setVariableManga(1);
                                                    setVariableglb(1);
                                                    setSearch('');
                                                }}className='btndiff'>My Favorites Manga</button>
                                            </div>

                                            <div className='search-btn-watched'>
                                                <button onClick={() => {
                                                    setRendered('watched')
                                                    setString("watched");
                                                    getGenres();
                                                    setVariable(1);
                                                    setVariableAiring(1);
                                                    setVariableUpcoming(1);
                                                    setVariableManga(1);
                                                    setVariableglb(1);
                                                    setSearch('');
                                                }}className='btndiff'>Completed Anime</button>
                                            </div>
                                            <div className='search-btn-logout'>
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
                                                }} className='btndiff'>Logout</button>
                                            </div>
                                        </div>
                                    </div>




                                }
                                <li>
                                    {
                                        isAuthenticated ?

                                            <p hidden></p>
                                            : <div className='search-btn-login'>
                                                <button className='log' onClick={() => {
                                                    loginWithRedirect();
                                                    setVariable(1);
                                                    setVariableAiring(1);
                                                    setVariableUpcoming(1);
                                                    setVariableManga(1);
                                                    setVariableglb(1);
                                                    setSearch('');
                                                }}>Login</button>
                                            </div>
                                    }
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className='logo' style={{ paddingTop: "2rem", paddingBottom: "0rem" }}>
                        <h1 style={{ color: "gold", fontWeight: "1000", fontFamily: "monospace", fontsize: "30px", letterSpacing: "8px" }}>
                            {rendered === 'popular' ? 'Popular Anime of all time'
                                : rendered === 'airing' ? 'Airing Right Now'
                                    : rendered === 'upcoming' ? 'Upcoming Anime'
                                        : rendered === 'random' ? 'Random Anime'
                                            : rendered === 'favorite' ? "My Favorite Anime"
                                                : rendered === 'favmanga' ? "My Favorite Manga"
                                                    : rendered === 'manga_list' ? " Manga Popular List"
                                                        : rendered === 'searching' ? "Searching..."
                                                            : rendered === 'login' ? "Login"
                                                                : rendered === 'watched' ? "Completed"
                                                                    : "Genres"}
                        </h1>
                    </div>

                    <div className='SearchResults'>
                        <h1>{isSearch && searchResults.length} Results found</h1>
                    </div>
                    <div className='extra' style={{ marginTop: "1.5rem" }}>

                        <div className='search'>
                            <div className='search-btn-prev'>
                                {variable !== 1 && string === "popular" && (
                                    <button onClick={() => {
                                        setVariable(variable - 1);
                                        getPopular(variable - 1);
                                        scrollToTop();
                                    }}>Previous</button>)
                                }
                            </div>
                            <div className='search-btn-next'>
                                {string === "popular" && (
                                    <button onClick={() => {
                                        setVariable(variable + 1);
                                        getPopular(variable + 1);
                                        scrollToTop();
                                    }}>Next</button>
                                )}
                            </div>
                        </div>

                        <div className='search'>
                            <div className='search-btn-prev'>
                                {variableAiring !== 1 && string === "airing" && (
                                    <button onClick={() => {
                                        setVariableAiring(variableAiring - 1);
                                        getAiring(variableAiring - 1);
                                        scrollToTop();
                                    }}>Previous</button>)
                                }
                            </div>
                            <div className='search-btn-next'>
                                {string === "airing" && (
                                    <button onClick={() => {
                                        setVariableAiring(variableAiring + 1);
                                        getAiring(variableAiring + 1);
                                        scrollToTop();
                                    }}>Next</button>
                                )}
                            </div>
                        </div>

                        <div className='search'>
                            <div className='search-btn-prev'>
                                {variableUpcoming !== 1 && string === "upcoming" && (
                                    <button onClick={() => {
                                        setVariableUpcoming(variableUpcoming - 1);
                                        getUpcoming(variableUpcoming - 1);
                                        scrollToTop();
                                    }}>Previous</button>)
                                }
                            </div>
                            <div className='search-btn-next'>
                                {string === "upcoming" && (
                                    <button onClick={() => {
                                        setVariableUpcoming(variableUpcoming + 1);
                                        getUpcoming(variableUpcoming + 1);
                                        scrollToTop();
                                    }}>Next</button>
                                )}
                            </div>
                        </div>

                        <div className='search'>
                            <div className='search-btn-prev'>
                                <form onSubmit={handleSubmit}>

                                    {string === "searching" && (
                                        <button onSubmit={handleSubmit} onClick={() => {
                                            {
                                                if (variableglb === 1) {
                                                    <p hidden>test</p>
                                                } else {
                                                    setVariableglb(variableglb - 1);
                                                }
                                            }

                                            scrollToTop();
                                        }}>Previous</button>)
                                    }
                                </form>
                            </div>
                            <div className='search-btn-next'>
                                <form onSubmit={handleSubmit}>
                                    {string === "searching" && (
                                        <button onSubmit={handleSubmit} onClick={() => {
                                            setVariableglb(variableglb + 1);
                                            scrollToTop();
                                        }}>Next</button>
                                    )}
                                </form>
                            </div>
                        </div>

                        <div className='search'>
                            <div className='search-btn-prev'>
                                {variableManga !== 1 && string === "manga_list" && (
                                    <button onClick={() => {
                                        setVariableManga(variableManga - 1);
                                        getManga(variableManga - 1);
                                        scrollToTop();
                                    }}>Previous</button>)
                                }
                            </div>
                            <div className='search-btn-next'>
                                {string === "manga_list" && (
                                    <button onClick={() => {
                                        setVariableManga(variableManga + 1);
                                        getManga(variableManga + 1);
                                        scrollToTop();
                                    }}>Next</button>
                                )}
                            </div>
                        </div>
                    </div>

                </header>
                {string === "popular" && (
                    <h1 style={{ display: "flex", justifyContent: "right", color: "gold", paddingRight: "4rem" }}>
                        Page: {variable}
                    </h1>)}
                {string === "airing" && (
                    <h1 style={{ display: "flex", justifyContent: "right", color: "gold", paddingRight: "4rem" }}>
                        Page: {variableAiring}
                    </h1>)}
                {string === "upcoming" && (
                    <h1 style={{ display: "flex", justifyContent: "right", color: "gold", paddingRight: "4rem" }}>
                        Page: {variableUpcoming}
                    </h1>)}
                {string === "manga_list" && (
                    <h1 style={{ display: "flex", justifyContent: "right", color: "gold", paddingRight: "4rem" }}>
                        Page: {variableManga}
                    </h1>)}
                {string === "searching" && (
                    <h1 style={{ display: "flex", justifyContent: "right", color: "gold", paddingRight: "4rem" }}>
                        Page: {variableglb}
                    </h1>)}
                {switchComponent()}
                <div className='extra'>

                    <div className='search'>
                        <div className='search-btn-prev'>
                            {variable !== 1 && string === "popular" && (
                                <button onClick={() => {
                                    setVariable(variable - 1);
                                    getPopular(variable - 1);
                                    scrollToTop();
                                }}>Previous</button>)
                            }
                        </div>
                        <div className='search-btn-next'>
                            {string === "popular" && (
                                <button onClick={() => {
                                    setVariable(variable + 1);
                                    getPopular(variable + 1);
                                    scrollToTop();
                                }}>Next</button>
                            )}
                        </div>
                    </div>
                </div>
            </ HomeStyled>
        </div >

    )
}

const HomeStyled = styled.div`

.btndiff{
    border-radius:0px;
    margin:5px;
}

.dropdown {
    float: center;
    overflow: hidden;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    padding:0px 10px 0px 10px;
    cursor:pointer;
  }

  .dropdown .dropbtn:hover{
    transition: 0.6s ease-in-out;
  }
  
  .dropdown .dropbtn {
    font-size: 16px;  
    outline: none;
    color: white;
    padding: 14px 16px;
    font-family: inherit;
    margin: 0;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  
  .navbar a {
    float: center;
    width: inherit;
    color: #222831;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  .navbar a:hover, .dropdown:hover .dropbtn {
    filter:brightness(1.25);
  }
  
  .dropdown-content {
    background:transparent;
    margin:98px;
    display: none;
    padding:1rem;
    position: absolute;
    width:;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background:#212529;
    z-index: 1;
  }
  
  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: flex;
    text-align: left;
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  


.navbar{
    padding:8rem 0 2rem 0;
    background:#212529;
    width:100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    ul{
        display:flex;
        gap:1.5rem;
        li{
            text-decoration:none;
            list-style: none;
        }
    }
}

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


background-color:black;

.searchbtnclick{
    width:550px;
}

.log{
    display:flex;
    cursor:pointer;
    align-items:center;
    padding:.7rem 1.5rem;
    color:beige;
    background:transparent;
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
    color:#222831;
}
.log:focus{
    color:#222831;
    border:2px solid gold;
}

header{
    width: 100%;
    color: beige;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    .SearchResults h1{
            padding-top:0rem;
            padding-left:2rem;
            padding-right:2rem;
            display:flex;
            align-items:center;
            justify-content:center;
        
        }
        color:beige;
        width:100%;
        margin: 0 auto;
        transition: all .4s ease-in-out;
        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
          }
    }
    .search{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:2rem;
        .log{
            color:#222831;
            background:#222831;
            color:gold;
            transition:0.4s;
            font-size:28px;
        }
        .log:hover{
            color:#222831;
            color:gold;
            transition:0.4s;
            filter:brightness(1.25);
        }
        button{
            display:flex;
            align-items:center;
            padding:.7rem 1.5rem;
            color:beige;
            background:#222831;
            font-size:28px;
            outline:none;
            border-radius:10px;
            font-family:inherit;
            width: 245px;
            justify-content:center;
            height: 90px;
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

    form{
        position:relative;
        padding:.7rem 1.5rem;
        width:100%;
        .input-control{
            position:relative;
            transition:all .4s ease-in-out;
            display:flex;
        align-items:center;
        justify-content:center;
            input{
                display:flex;
                aling-items:center;
                gap:2rem;
                padding:.5rem 1rem;
                color:#222831;
                backround:white;
                outline:none;
                border-radius:10px;
                font-family:inherit;
                transition:0.5s ease-in-out;
                font-size:1.5rem;
            }
            button{
                position:absolute;
                right:0;
                top:50%;
                transform: translateY(-50%);
                align-items:center;
                padding:.7rem 1.5rem;
                color:beige;
                background:#222831;
                outline:none;
                border-radius:10px;
                font-family:inherit;
            }
            button:hover{
                cursor:pointer;
                transition:0.5s ease-out-in;
                border:2px solid gold;
                color:gold;
            }
        }
    }


`

export default Home