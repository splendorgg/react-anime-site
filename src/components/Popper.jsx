import { usePopper } from 'react-popper';
import { Button, Dropdown, Space, } from 'antd';
import { useState } from 'react';

import { FaStar } from "react-icons/fa";
import { PlusOutlined, CaretRightFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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

export const Popper = ({ currentAnime, handleMouseEnter, handleMouseLeave, animeImgRef }) => {
    const [popperElement, setPopperElement] = useState(null); // Popper referansı
    const { styles, attributes } = usePopper(animeImgRef.current, popperElement, {
        placement: 'top', // Popper'ın nerede görüneceğini ayarla
        modifiers: [{ name: 'offset', options: { offset: [0, -100] } }], // Konum ayarı
    });

    const navigate = useNavigate()
    const handleClick = (anime) => {
        navigate(`/anime/${anime.mal_id}`, { state: { anime } })
    }

    return (
        <>

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
                        <Button type='primary' className='popper-watch-button' onClick={() => handleClick(currentAnime)} ><CaretRightFilled />Watch Now </Button>
                        <div className="popper-add-dropdown">
                            <Space direction='vertical'>
                                <Space wrap>
                                    <Dropdown menu={{ items, }} placement='top' getPopupContainer={() => document.body} >
                                        <Button shape='circle'  >
                                            <PlusOutlined />
                                        </Button>
                                    </Dropdown>
                                </Space>
                            </Space>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}

