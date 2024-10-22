import Navbar from "./Navbar";
import TrendingAnimes from "./TrendingAnimes";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import axios from "axios";

import LatestEpisodes from "./LatestEpisodes";




function Home() {
    const [anime, setAnime] = useState([])
    const [trendingAnime, setTrendingAnime] = useState([])
    const [latestAnime, setLatestAnime] = useState([])
    const [latestAnimeDetails, setLatestAnimeDetails] = useState([])

    const GetTopAnime = async () => {

        const [topAnimeResponse, trendingAnimeResponse, latestAnimeResponse] = await Promise.all([
            axios.get('https://api.jikan.moe/v4/top/anime?filter=airing'), // Top airing animes for Swiper banner
            axios.get('https://api.jikan.moe/v4/seasons/now'),  // Trending Animes swiper
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
            await delay(10)
        }

        setLatestAnimeDetails(animeDetails)
    }

    useEffect(() => {
        GetTopAnime()
    }, [])


    return (
        <>
            <Navbar />
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {anime.map((anime) => (
                    <SwiperSlide key={anime.mal_id}>
                        <div className="main-slide-wrapper">
                            <div className="slide-cover">
                                <img src={anime.images.jpg.large_image_url} />
                                <div className="gradient-overlay"></div>
                            </div>
                            <div className="slide-description">
                                <h1>{anime.title_english}</h1>
                                <div className="description">
                                    {anime.synopsis}
                                </div>
                                <div className="slide-button">
                                    <button>Watch Now</button>
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


