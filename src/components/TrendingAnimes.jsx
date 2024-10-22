import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";
import React, { useState, } from "react";
import { Button, Dropdown, Space, } from 'antd';
import { PlusOutlined, CaretRightFilled, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { FaStar } from "react-icons/fa";
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                3rd menu item
            </a>
        ),
    },
];


function TrendingAnimes({ trendinganime }) {
    const [visible, setVisible] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [, setMousePosition] = useState({ x: 0, y: 0 });

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "top",
        strategy: "fixed",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [10, 10],
                },
            },
        ],
    });
    const handleMouseEnter = (event, trending) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        setCurrentData(trending);
        setReferenceElement({
            getBoundingClientRect: () => ({
                top: event.clientY,
                left: event.clientX,
                bottom: event.clientY,
                right: event.clientX,
                width: 0,
                height: 0,
            }),
            clientWidth: 0,
            clientHeight: 0,
        });
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
        setCurrentData(undefined)
    };

    return (
        <>
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                modules={[Navigation]}
                className="mySwiper"
                navigation={{
                    nextEl: '.slider-button-next',
                    prevEl: '.slider-button-prev',
                }
                }
            >
                {trendinganime.slice(0, 10).map((trending, index) => (
                    <SwiperSlide key={trending.mal_id} >
                        <div className="slide-item" onMouseEnter={(e) => handleMouseEnter(e, trending)}
                            onMouseLeave={handleMouseLeave}>
                            <div className="placement">
                                <span>{index < 9 ? '0' + (index + 1) : index + 1}</span>
                                <div className="trending-title">{trending.title_english || trending.title}</div>

                            </div>
                            <div className="trending-img">
                                <img src={trending.images.jpg.image_url} alt="" />
                            </div>

                            {visible && currentData.mal_id === trending.mal_id &&
                                createPortal(
                                    <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 1030 }} {...attributes.popper} >
                                        <div className='popper-content'>
                                            <div className="popper-title">
                                                {currentData.title_english || currentData.title}
                                            </div>
                                            <div className="popper-detail">
                                                <span className='float-left'><FaStar fill='yellow' />{currentData.score}</span>
                                                <span>Episodes:{currentData.episodes}</span>
                                                <span className='span-type'>{currentData.type}</span>
                                            </div>
                                            <div className="popper-description">
                                                {currentData.synopsis}
                                            </div>
                                            <div className="popper-additional">
                                                <div className="language">
                                                    <span>Japanese:  </span>
                                                    <span className='popper-text'>{currentData.title_japanese}</span>
                                                </div>
                                                <div className="aired">
                                                    <span>Aired: </span>
                                                    <span className='popper-text'>{currentData.aired.from ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(currentData.aired.from)) : "Unknown"} </span>
                                                </div>
                                                <div className="status">
                                                    <span>Status: </span>
                                                    <span className='popper-text'> {currentData.status}</span>
                                                </div>
                                                <div className="popper-genres">
                                                    <span>Genres: </span>
                                                    <span className='popper-text'>{currentData.genres.map((genre) => genre.name).join(', ')}</span>
                                                </div>
                                            </div>
                                            <div className="popper-button">
                                                <Button type='primary' className='popper-watch-button' ><CaretRightFilled />Watch Now </Button>
                                                <div className="popper-add-dropdown">
                                                    <Space direction='vertical'>
                                                        <Space wrap>
                                                            <Dropdown menu={{ items, }} placement='top' getPopupContainer={() => document.body}>
                                                                <Button shape='circle' >
                                                                    <PlusOutlined />
                                                                </Button>
                                                            </Dropdown>
                                                        </Space>
                                                    </Space>
                                                </div>
                                            </div>
                                        </div>
                                    </div>,
                                    document.body
                                )}
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper >
            <button className="slider-button-prev">
                <LeftOutlined />
            </button>
            <button className="slider-button-next">
                <RightOutlined />
            </button>
        </>
    )
}

export default TrendingAnimes