import React from 'react';
import {
    ListWrapper,
    Card,
    Icon,
    Name,
    ButtonStyle,
    ListMenuWrapper
} from './ListSetting'

const Cards = ({showDetail, icon, name}) => (
    <Card onClick={showDetail}>
        <Icon src={icon} />
        <Name>{name}</Name>
    </Card>
)

const SortButton = ({text, fun, arg}) => <ButtonStyle onClick={()=>fun(arg)}>{text}</ButtonStyle>

const ListMenu = ({handleSortByRating, handleSortByPriceLevel, handleSortByUserRatings}) => (
    <ListMenuWrapper>
        <SortButton fun={handleSortByRating} text="評分排序" />
        <SortButton fun={handleSortByUserRatings} text="評論量高" />
        <SortButton arg={true} fun={handleSortByPriceLevel} text="便宜排序" />
        <SortButton fun={handleSortByPriceLevel} text="高價排序" />
    </ListMenuWrapper>
)


const List = ({places, handleSortByRating, handleSortByPriceLevel, handleSortByUserRatings, showDetail}) => (
    <ListWrapper>
        <ListMenu 
            handleSortByRating={handleSortByRating}
            handleSortByPriceLevel={handleSortByPriceLevel}
            handleSortByUserRatings={handleSortByUserRatings}
        />
        {places.map((place,index)=>{
        return(
            <Cards
                key={index}
                icon={place.icon}
                name={place.name}
                showDetail={()=>{showDetail(place.place_id)}}
            />
        )})}
    </ListWrapper> 
)


export default List