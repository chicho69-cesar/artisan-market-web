import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { serverUrl } from '@/modules/shared/constants'
import type { Image as ImageType } from '@/modules/shared/interfaces'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  images?: ImageType[]
}

export default function ImagesCarousel({ images = [] }: Props) {
  return (
    <div className='w-full mt-4'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="bg-red-500">
            <div>
              <img
                src={`${serverUrl}/storage/${image.link}`}
                alt={`Image of product with id ${image.product_id}`}
                className="w-full h-[450px] rounded-md object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
