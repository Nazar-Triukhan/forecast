import apiNetural from '../../api/nature' 
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import style from './Slider.module.css'


function Slider () {

    const [natural, setNatural] = useState([])
    const swiperRef = useRef(null)

    useEffect(() => {
    apiNetural().then(res => setNatural(res.hits))
    }, [])

    return (
        <div className={style.slider}>
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                spaceBetween={24}
                loop
                navigation
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Navigation]}
            >
                {natural.map((item) => (
                    <SwiperSlide
                        className={style.slide}
                        key={item.id}
                        onClick={(event) => {
                            const index = Number(
                                event.currentTarget.dataset.swiperSlideIndex,
                            )

                            if (Number.isInteger(index)) {
                                swiperRef.current?.slideToLoop(index)
                            }
                        }}
                    >
                        <img src={item.webformatURL} alt={item.tags} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}


export default Slider