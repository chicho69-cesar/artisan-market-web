import { Avatar } from '@/modules/shared/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import type { Review as ReviewType } from '@/modules/shared/interfaces'
import { dateFormatter } from '@/modules/shared/utils/date-formatter'
import { IconStarFilled } from '@tabler/icons-react'

interface Props {
  review: ReviewType
}

export default function Review({ review }: Props) {
  const { navigateBetweenRoutes } = useNavigate()

  return (
    <div className='flex flex-col gap-2 my-3 flex-nowrap'>
      <div className='flex flex-row items-center justify-between gap-4'>
        <div className='flex flex-row items-center justify-start gap-2'>
          <figure
            className='cursor-pointer hover:opacity-95'
            onClick={() => {
              if ((review.user) != null) {
                navigateBetweenRoutes('', '/user-profile', review.user.id)
              }
            }}
          >
            <Avatar
              source={
                review.user.picture == null || review.user.picture === undefined
                  ? blankImage : `${serverUrl}/storage/${review.user.picture}`
              }
              alt={review.user.name ?? ''}
            />
          </figure>

          <div className='flex flex-col flex-nowrap'>
            <p className='font-medium text-gray'>
              {review.user.name} {review.user.lastname}
            </p>

            <div className='flex flex-row items-center justify-start gap-1'>
              {([1, 2, 3, 4, 5]).map((rate) => (
                <IconStarFilled
                  key={rate}
                  size={16}
                  className={`font-bold ${rate <= review.rate ? 'text-yellow' : 'text-gray'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className='text-sm font-light text-gray'>
          {dateFormatter.format(new Date(review.created_at ?? '2000-01-01T01:01:01.000000Z'))}
        </p>
      </div>

      <p className='text-gray'>
        {review.comment}
      </p>
    </div>
  )
}
