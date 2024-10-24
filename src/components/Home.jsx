import Navbar from "./Navbar";
import TrendingAnimes from "./TrendingAnimes";
import LatestEpisodes from "./LatestEpisodes";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from 'antd';
import { FaPlayCircle, FaClock, FaCalendarAlt, FaStar } from "react-icons/fa";



function Home() {
    const [anime, setAnime] = useState([])
    const [trendingAnime, setTrendingAnime] = useState([])
    const [latestAnime, setLatestAnime] = useState([])
    const [latestAnimeDetails, setLatestAnimeDetails] = useState([])
    const [search, SetSearch] = useState("")
    const [searched, SetSearched] = useState([])

    const GetTopAnime = async () => {

        const [topAnimeResponse, trendingAnimeResponse, latestAnimeResponse] = await Promise.all([
            axios.get('https://api.jikan.moe/v4/top/anime?filter=airing&sort=asc&type=tv&limit=10'), // Top airing animes for Swiper banner
            axios.get('https://api.jikan.moe/v4/seasons/now?limit=10'),  // Trending Animes swiper
            axios.get('https://api.jikan.moe/v4/watch/episodes'), // Latest Episodes
        ])
        const topAnime = topAnimeResponse.data.data
        const trendingAnime = trendingAnimeResponse.data.data
        const latestAnime = latestAnimeResponse.data.data
        setAnime(topAnime)
        setTrendingAnime(trendingAnime)
        setLatestAnime(latestAnime)

        await GetLatestAnimeDetails(latestAnime)

    }
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const GetLatestAnimeDetails = async (latestAnime) => {
        const ids = latestAnime.slice(0, 18).map(anime => anime.entry.mal_id)

        const animeDetails = []
        for (const id of ids) {
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`) // Get all details about latest episodes by id
            animeDetails.push(response.data.data)
            await delay(300)
        }

        setLatestAnimeDetails(animeDetails)
    }

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


    useEffect(() => {
        GetTopAnime()
    }, [])

    const formatDuration = (duration) => {
        return duration.replace(' per ep', ''); // Trim the unnecessary information
    };

    return (
        <>
            <Navbar HandleSearch={HandleSearch} search={search} SetSearch={SetSearch} searchedAnime={searched} />
            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}>
                {anime.map((anime, index) => (
                    <SwiperSlide key={anime.mal_id}>
                        <div className="main-slide-wrapper">
                            <div className="slide-cover">
                                <img src={anime.images.jpg.large_image_url} />
                                <div className="gradient-overlay"></div>
                            </div>
                            <div className="slide-description">
                                <div className="rank">#{index + 1} Top Airing</div>
                                <h1>{anime.title_english}</h1>
                                <div className="slide-detail">
                                    <div><FaPlayCircle /> {anime.type}</div>
                                    <div><FaClock />{formatDuration(anime.duration)}</div>
                                    <div><FaCalendarAlt /> {anime.aired.string.split('to')[0]}</div>
                                    <div><FaStar fill="yellow" />{anime.score}</div>
                                </div>
                                <div className="description">
                                    {anime.synopsis}
                                </div>
                                <div className="slide-button">
                                    <Button type="primary" size="large"><FaPlayCircle />Watch Now</Button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

            <div className="trending-wrapper">
                <h1>Trending Animes</h1>
                <div className="trending-animes">
                    {trendingAnime.length > 0 && <TrendingAnimes trendinganime={trendingAnime} />}
                </div>
            </div>

            <div className="recent-container">
                <LatestEpisodes latestAnimeDetails={latestAnimeDetails} />
            </div>
        </>
    )
}

export default Home


