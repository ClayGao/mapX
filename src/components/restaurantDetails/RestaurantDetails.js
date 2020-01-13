import React from 'react'
import {
    DetailsWrapper,
    DetailCard,
    Name,
    Address,
    IsOpen,
    Rating,
    Telphone,
    OpenTimeDetails,
    CloseDetail
} from './RestaurantDetailsSetting'

const RestaurantDetails = ({details, closeDetail}) => {
    const {
      name,
      address,
      telphone,
      rating,
      isOpen,
      openTime
    } = details

    return (
    <DetailsWrapper>
      <DetailCard>
        <Name>{name}</Name>
        <Address>{address}</Address>
        <IsOpen isOpen={isOpen}>{isOpen ? '現正營業中':'休息中'}</IsOpen>
        <Rating rating={rating}>評分: {rating}</Rating>
        {openTime && openTime.map((time,i)=>
          <OpenTimeDetails key={i}>
            {time}
          </OpenTimeDetails>
        )}
        <Telphone>電話: {telphone}</Telphone>
        <CloseDetail onClick={closeDetail}>Close</CloseDetail>
      </DetailCard>
    </DetailsWrapper>
    )
  }

  export default RestaurantDetails