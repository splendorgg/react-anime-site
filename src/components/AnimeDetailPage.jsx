import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlayCircle, FaPlay, FaStar } from "react-icons/fa";
import Navbar from './Navbar';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Popper } from './Popper';


function AnimeDetailPage() {
    const location = useLocation();
    const animeDetails = location.state?.anime;

    const [similarAnimes, SetSimilarAnimes] = useState([])
    const [popularAnimes, SetPopularAnimes] = useState([])

    const [showPopper, setShowPopper] = useState(false); // Popper kontrol state'i
    const [currentAnime, setCurrentAnime] = useState(null); // Hover edilen anime bilgileri
    const animeImgRef = useRef(null); // anime-img referansı


    const [search, SetSearch] = useState("")
    const [searched, SetSearched] = useState([])


    const handleMouseEnter = (anime, ref) => {
        setCurrentAnime(anime);
        animeImgRef.current = ref; // Hover edilen elementin referansı
        setShowPopper(true); // Popper'ı göster
    };

    const handleMouseLeave = () => {
        setShowPopper(false); // Popper'ı gizle
        setCurrentAnime(null); // Bilgileri temizle
    };




    const GetSimiralAnimes = async () => {
        const genreIds = animeDetails.genres.slice(0, 2).map(genre => genre.mal_id).join(',');
        const similarAnimeResponse = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreIds}&order_by=popularity&limit=18`)
        const similarAnimes = similarAnimeResponse.data.data
        SetSimilarAnimes(similarAnimes)
    }

    const GetPopularAnimes = async () => {
        const mostPopularResponse = await axios.get('https://api.jikan.moe/v4/top/anime?filter=airing&filter=bypopularity&limit=10');
        const popularAnimes = mostPopularResponse.data.data
        SetPopularAnimes(popularAnimes)
    }





    const navigate = useNavigate()
    const handleClick = (anime) => {
        navigate(`/anime/${anime.mal_id}`, { state: { anime } })
    }

    useEffect(() => {
        GetSimiralAnimes()
        GetPopularAnimes()
    }, [])



    const formatDuration = (duration) => {
        return duration.replace(' per ep', ''); // Trim the unnecessary information
    };
    const HandleSearch = (e) => {
        const searchValue = e.target.value
        SetSearch(searchValue)
        if (searchValue.length > 2) {
            GetSearchedAnime(searchValue)
        } else {
            SetSearched([]);
        }
    }
    const GetSearchedAnime = async (search) => {
        const searchResponse = await axios.get(`https://api.jikan.moe/v4/anime?q=${search}&sort=asc&limit=5`)
        const searchedAnime = searchResponse.data.data
        SetSearched(searchedAnime)
    }


    if (!animeDetails) return <div>Loading...</div>;

    return (
        <>
            <Navbar HandleSearch={HandleSearch} search={search} SetSearch={SetSearch} searchedAnime={searched} />
            <div className="anime-detail-page">
                <div className="anime-detail">
                    <div className="anime-container" >
                        <div className="detail-background">
                            <div className="detail-back" style={{ backgroundImage: `url(${animeDetails.images.jpg.image_url})` }}>
                            </div>
                        </div>
                        <div className="detail-wrapper">

                            <div className="ani-img">
                                <img src={animeDetails.images.jpg.image_url} />
                            </div>

                            <div className="ani-detail">
                                <div className="ani-title">
                                    <h1>{animeDetails.title}</h1>
                                </div>
                                <div className="ani-info">
                                    <span>Episodes {animeDetails.episodes}</span>
                                    <span className='dot'></span>
                                    <span>{animeDetails.type}</span>
                                    <span className='dot'></span>
                                    <span>{animeDetails.duration}</span>
                                </div>
                                <div className="ani-buttons">
                                    <Button type="primary" size="large" className='watch-button'><FaPlayCircle />Watch Now</Button>
                                    <Button type="primary" size="large" className='add-button' ><PlusOutlined /> Add to List</Button>
                                </div>
                                <div className="ani-synopsis">
                                    {animeDetails.synopsis}
                                </div>
                            </div>

                            <div className="ani-side-info-wrap">
                                <div className="ani-side-info">
                                    <div className="info-element">
                                        <span className='info-title'>Japanese: </span>
                                        <span className='info-value'>{animeDetails.title}</span>
                                    </div>
                                    <div className="info-element">
                                        <span className='info-title'>Synonyms: </span>
                                        <span className='info-value'>{animeDetails.title_synonyms.join(', ')}</span>
                                    </div>
                                    <div className="info-element">
                                        <span className='info-title'>Aired: </span>
                                        <span className='info-value'>{animeDetails.aired.string}</span>
                                    </div>
                                    <div className="info-element">
                                        <span className='info-title'>Duration: </span>
                                        <span className='info-value'>{formatDuration(animeDetails.duration)}</span>
                                    </div>
                                    <div className="info-element">
                                        <span className='info-title'>Status: </span>
                                        <span className='info-value'>{animeDetails.status}</span>
                                    </div>
                                    <div className="info-element">
                                        <span className='info-title'>MAL Score: </span>
                                        <span className='info-value'>{animeDetails.score}</span>
                                    </div>
                                    <div className="info-genres">
                                        <span className='info-title'>Genres: </span>
                                        <span className='info-genre-value'>
                                            {animeDetails.genres.map((genre) => (
                                                <span key={genre.mal_id} className='genre-item'>
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="info-element">
                                        <span className='info-title'>Studios: </span>
                                        <span className='info-value'>{animeDetails.studios.map((studio) => studio.name).join(', ')}</span>
                                    </div>
                                    <div className="info-element">
                                        <span className='info-title'>Producers: </span>
                                        <span className='info-value'>{animeDetails.producers.map((producer) => producer.name).join(', ')}</span>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="similar-container">
                <div className="similar-animes-wrapper">
                    <div className="similar-animes-container">
                        <h1>Similar Animes</h1>
                        <div className="similar-animes">
                            {similarAnimes.map((anime) => {
                                const imageUrl = anime.images.jpg.image_url;

                                if (imageUrl === 'https://cdn.myanimelist.net/images/icon-banned-youtube-rect.png') {
                                    return null;
                                }
                                return (
                                    <div className="similar-anime" key={anime.mal_id} onMouseEnter={(e) => handleMouseEnter(anime, e.currentTarget)} // Mouse hover
                                        onMouseLeave={handleMouseLeave} onClick={() => handleClick(anime)}>
                                        <div className="anime-img">
                                            <img src={imageUrl} alt="" />
                                            <FaPlay size={30} className="similar-play" />
                                        </div>
                                        <div className="similar-anime-info">
                                            <div className="similar-anime-title">
                                                {anime.title}
                                            </div>
                                            <div className="similar-anime-type">
                                                <span>{anime.type}</span>
                                                <span className="dot"></span>
                                                <span>{formatDuration(anime.duration)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {showPopper && currentAnime && (
                                <Popper currentAnime={currentAnime} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} animeImgRef={animeImgRef} />
                            )}
                        </div>
                    </div>
                    <div className="sidebar">
                        <div className="most-popular-sidebar">
                            <div className="section1 subsection">
                                <h2>Top Airing</h2>
                                <div className="anime-block">
                                    <ul>
                                        {popularAnimes.map((popularanime, index) => (
                                            <li key={index}>
                                                <div className="list-image" onMouseEnter={(e) => handleMouseEnter(popularanime, e.currentTarget)} // Mouse hover
                                                    onMouseLeave={handleMouseLeave} onClick={() => handleClick(popularanime)}>
                                                    <img src={popularanime.images.jpg.image_url} alt="" />
                                                </div>
                                                <div className="list-detail">
                                                    <h3 className="list-title">{popularanime.title_english}</h3>
                                                    <div className="list-info">
                                                        <div className="list-score">
                                                            <FaStar fill='yellow' />
                                                            {popularanime.score}
                                                        </div>
                                                        <span className="dot"></span>
                                                        <div className="list-episode">
                                                            {popularanime.type}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        {showPopper && currentAnime && (
                                            <Popper currentAnime={currentAnime} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} animeImgRef={animeImgRef} />
                                        )}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default AnimeDetailPage