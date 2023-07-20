import React, { createContext, useContext, useReducer, useState } from "react";
//import { act } from "react-dom/test-utils";

const GlobalContext = createContext();



const baseURL = "https://api.jikan.moe/v4"

const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_ANIME_CHARACTER = "GET_ANIME_CHARACTER";
const GET_ANIME_GENRE = "GET_ANIME_GENRE";
const GET_ANIME_BY_GENRE = "GET_ANIME_BY_GENRE";
const GET_ANIME_PICTURE = "GET_ANIME_PICTURE";
const GET_RANDOM_ANIME = "GET_RANDOM_ANIME";
const GET_MY_LIST = "GET_MY_LIST";
const GET_POPULAR_MANGA = "GET_POPULAR_MANGA";
const GET_MANGA_PICTURE = "GET_MANGA_PICTURE";

const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_POPULAR_ANIME:
            return { ...state, popular: action.payload, loading: false };
        case GET_UPCOMING_ANIME:
            return { ...state, upcoming: action.payload, loading: false };
        case GET_AIRING_ANIME:
            return { ...state, airing: action.payload, loading: false };
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        case GET_ANIME_CHARACTER:
            return { ...state, pics: action.payload, loading: false };
        case GET_ANIME_GENRE:
            return { ...state, genres: action.payload, loading: false };
        case GET_ANIME_BY_GENRE:
            return { ...state, genresAnime: action.payload, loading: false };
        case GET_ANIME_PICTURE:
            return { ...state, animepic: action.payload, loading: false };
        case GET_RANDOM_ANIME:
            return { ...state, random: action.payload, loading: false };
        case GET_MY_LIST:
            return { ...state, my_list: action.payload, loading: false };
        case GET_POPULAR_MANGA:
            return { ...state, manga_list: action.payload, loading: false };
        case GET_MANGA_PICTURE:
            return { ...state, mangapic: action.payload, loading: false };
        default:
            return state;
    }
}

export const GlobalContextProvider = ({ children }) => {
    const initialState = {
        popular: [],
        upcoming: [],
        airing: [],
        pics: [],
        animepic: [],
        mangapic: [],
        genres: [],
        random: [],
        my_list: [],
        manga_list: [],
        genresAnime: [],
        search: false,
        searchResults: [],
        loading: false
    }

    const [state, newstate] = useReducer(reducer, initialState)

    const [search, setSearch] = React.useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            state.isSearch = false;
        }
    }

    const [variableglb, setVariableglb] = useState(1);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (search) {
            SearchAnime(search,variableglb);
            state.isSearch = true;
        }
        else {
            state.isSearch = false;
            alert('Nothing found');
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds smooth scrolling animation
        });
    };


    const getPopular = async (variable) => {
        newstate({ type: LOADING })
        const response = await fetch(`${baseURL}/top/anime?filter=bypopularity&sort=desc&page=${variable}`);
        const data = await response.json();
        newstate({ type: GET_POPULAR_ANIME, payload: data.data })
    }

    const getManga = async (variable) => {
        newstate({ type: LOADING })
        const response = await fetch(`${baseURL}/top/manga?order_by=score&sort=desc&page=${variable}`);
        const data = await response.json();
        newstate({ type: GET_POPULAR_MANGA, payload: data.data })
    }


    const getUpcoming = async (variableUpcoming) => {
        newstate({ type: LOADING })
        const response = await fetch(`${baseURL}/top/anime?filter=upcoming&sort=desc&page=${variableUpcoming}`);
        const data = await response.json();
        newstate({ type: GET_UPCOMING_ANIME, payload: data.data })
    }


    const getAiring = async (variableAiring) => {
        newstate({ type: LOADING })
        const response = await fetch(`${baseURL}/top/anime?filter=airing&sort=desc&page=${variableAiring}`);
        const data = await response.json();
        newstate({ type: GET_AIRING_ANIME, payload: data.data })
    }

    const getRandom = async () => {
        newstate({ type: LOADING })
        const response = await fetch(`${baseURL}/random/anime`);
        const data = await response.json();
        newstate({ type: GET_RANDOM_ANIME, payload: data.data })
    }

    //et anime char
    const getAnimeCharacter = async (id) => {
        newstate({ type: LOADING })
        const response = await fetch(`https://api.jikan.moe/v4/characters/${id}/pictures`);
        const data = await response.json();
        newstate({ type: GET_ANIME_CHARACTER, payload: data.data })
    }

    const getGenres = async () => {
        newstate({ type: LOADING })
        const response = await fetch(`https://api.jikan.moe/v4/genres/anime`);
        const data = await response.json();
        newstate({ type: GET_ANIME_GENRE, payload: data.data })
    }


    const SearchAnime = async (anime,variableglb) => {
        newstate({ type: LOADING })
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&page=${variableglb}&order_by=score&sort=desc`);
        const data = await response.json();
        newstate({ type: SEARCH, payload: data.data })
    }

    const GetAnimebyGenre = async (id) => {
        newstate({ type: LOADING })
        const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${id}`);
        const data = await response.json();
        newstate({ type: GET_ANIME_BY_GENRE, payload: data.data })
    }

    const getAnimepic = async (id) => {
        newstate({ type: LOADING })
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`);
        const data = await response.json();
        newstate({ type: GET_ANIME_PICTURE, payload: data.data })
    }

    const getMangapic = async (id) => {
        newstate({ type: LOADING })
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/pictures`);
        const data = await response.json();
        newstate({ type: GET_MANGA_PICTURE, payload: data.data })
    }

    


    React.useEffect(() => {
        getAiring(1);
    }, [])

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            variableglb,
            setVariableglb,
            SearchAnime,
            search,
            setSearch,
            getPopular,
            getManga,
            getAiring,
            getUpcoming,
            getAnimeCharacter,
            getGenres,
            GetAnimebyGenre,
            getAnimepic,
            getMangapic,
            getRandom,
            scrollToTop,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}