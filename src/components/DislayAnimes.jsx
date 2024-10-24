import DisplayImages from './DisplayImages';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/zoom';


function DisplayAnimes() {
    return (
        <>
            <div className="display">
                <div className="display-png">
                    <img src="https://i.hizliresim.com/bwa0lc6.png" alt="" />
                </div>
                <div className="display-swiper">
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={15}
                        freeMode={true}
                        zoom={true}
                        modules={[FreeMode, Zoom]}
                        className="mySwiper"
                    >
                        {DisplayImages.map((anime, index) => (
                            <SwiperSlide key={index}>
                                <img src={anime.image} alt="" className='display-img' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default DisplayAnimes