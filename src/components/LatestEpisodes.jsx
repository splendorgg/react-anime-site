import { useNavigate } from 'react-router-dom';
import { usePopper } from 'react-popper';
import { useState, useRef } from "react";
import { Button, Dropdown, Space, } from 'antd';
import { PlusOutlined, CaretRightFilled } from '@ant-design/icons';
import { FaStar,FaPlay } from "react-icons/fa";
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                Watching
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                Plan to watch
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                Completed
            </a>
        ),
    },
];


function LatestEpisodes({ latestAnimeDetails }) {
    const [showPopper, setShowPopper] = useState(false); // Popper kontrol state'i
    const [currentAnime, setCurrentAnime] = useState(null); // Hover edilen anime bilgileri
    const [popperElement, setPopperElement] = useState(null); // Popper referansı
    const animeImgRef = useRef(null); // anime-img referansı
    const { styles, attributes } = usePopper(animeImgRef.current, popperElement, {
        placement: 'top', // Popper'ın nerede görüneceğini ayarla
        modifiers: [{ name: 'offset', options: { offset: [0, -100] } }], // Konum ayarı
    });

    // Hover başladığında anime bilgilerini ve referansı ayarlıyoruz
    const handleMouseEnter = (anime, ref) => {
        setCurrentAnime(anime);
        animeImgRef.current = ref; // Hover edilen elementin referansı
        setShowPopper(true); // Popper'ı göster
    };

    const handleMouseLeave = () => {
        setShowPopper(false); // Popper'ı gizle
        setCurrentAnime(null); // Bilgileri temizle
    };


    const formatDuration = (duration) => {
        return duration.replace(' per ep', ''); // Trim the unnecessary information
    };

    const navigate = useNavigate()
    const handleClick = (anime) => {
        navigate(`/anime/${anime.mal_id}`, { state: { anime } })
    }

    return (
        <>
            <div className="recent-sub-container">
                <div className="recent-animes-container">
                    <h1>Latest Episode</h1>
                    <div className="recent-animes">
                        {latestAnimeDetails.map((latest) => {
                            const imageUrl = latest.images.jpg.image_url;

                            if (imageUrl === 'https://cdn.myanimelist.net/images/icon-banned-youtube-rect.png') {
                                return null;
                            }
                            return (
                                <div className="recent-anime" key={latest.mal_id} onMouseEnter={(e) => handleMouseEnter(latest, e.currentTarget)} // Mouse hover
                                    onMouseLeave={handleMouseLeave} onClick={() => handleClick(latest)}>
                                    <div className="anime-img">
                                        <img src={imageUrl} alt="" />
                                        <FaPlay size={30} className="recent-play" />
                                    </div>
                                    <div className="recent-anime-info">
                                        <div className="recent-anime-title">
                                            {latest.title}
                                        </div>
                                        <div className="recent-anime-type">
                                            <span>{latest.type}</span>
                                            <span className="dot"></span>
                                            <span>{formatDuration(latest.duration)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {showPopper && currentAnime && (
                            <div
                                ref={setPopperElement}
                                style={{ ...styles.popper, zIndex: 1030 }}
                                {...attributes.popper}
                                onMouseEnter={(e) => handleMouseEnter(currentAnime, e.currentTarget)} // Mouse hover
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="popper-content">
                                    <div className="popper-title">
                                        {currentAnime.title_english || currentAnime.title}
                                    </div>
                                    <div className="popper-detail">
                                        <span className='float-left'><FaStar fill='yellow' />{currentAnime.score}</span>
                                        <span>Episodes:{currentAnime.episodes}</span>
                                        <span className='span-type'>{currentAnime.type}</span>
                                    </div>
                                    <div className="popper-description">
                                        {currentAnime.synopsis}
                                    </div>
                                    <div className="popper-additional">
                                        <div className="language">
                                            <span>Japanese:  </span>
                                            <span className='popper-text'>{currentAnime.title_japanese}</span>
                                        </div>
                                        <div className="aired">
                                            <span>Aired: </span>
                                            <span className='popper-text'>{currentAnime.aired.from ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(currentAnime.aired.from)) : "Unknown"} </span>
                                        </div>
                                        <div className="status">
                                            <span>Status: </span>
                                            <span className='popper-text'> {currentAnime.status}</span>
                                        </div>
                                        <div className="popper-genres">
                                            <span>Genres: </span>
                                            <span className='popper-text'>{currentAnime.genres.map((genre) => genre.name).join(', ')}</span>
                                        </div>
                                    </div>
                                    <div className="popper-button">
                                        <Button type='primary' className='popper-watch-button' ><CaretRightFilled />Watch Now </Button>
                                        <div className="popper-add-dropdown">
                                            <Space direction='vertical'>
                                                <Space wrap>
                                                    <Dropdown menu={{ items, }} placement='top' getPopupContainer={() => document.body} >
                                                        <Button shape='circle' >
                                                            <PlusOutlined />
                                                        </Button>
                                                    </Dropdown>
                                                </Space>
                                            </Space>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="sidebar">
                    <h1>Genres</h1>
                    <div className="genres-container">
                        <ul className="genres-list">
                            <li>Action </li>
                            <li>Comedy </li>
                            <li>Drama </li>
                            <li>Horror </li>
                            <li>Mecha </li>
                            <li>Mystery </li>
                            <li>Adventure </li>
                            <li>Ecchi</li>
                            <li>Harem</li>
                            <li>Isekai</li>
                            <li>Fantasy</li>
                            <li>Magic</li>
                            <li>Military</li>
                            <li>Historical</li>
                            <li>Music</li>
                            <li>Police</li>
                            <li>Demons</li>
                            <li>School</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestEpisodes