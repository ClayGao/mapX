import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
    max-height: 100vh;
    min-width: 350px;
    overflow: scroll;
`

const Card = styled.div`
    display: flex;
    align-items: center;
    min-height: 50px;
    height: auto;
    border: 2px solid gray;
    box-sizing: border-box;
    cursor: pointer;
`

const Photo = styled.img`
    height: 130px;
    width: 100%;
`

const Icon = styled.img`
    border: 2px solid orange;
    margin-left: 5px;
    padding: 4px;
    border-radius: 10px;
    height: 20px;
    width: 20px;
`

const Name = styled.span`
    text-align: center;
    line-height: 30px;
    min-height: 30px;
    height: auto;
    overflow: auto;
    width: 100%;
    font-size: 16px;
    font-weight: bolder;
    color: gray;

`

const Cards = (props) => {
    //console.log(props)
    return (
    <Card onClick={props.showDetail}>
        <Icon src={props.icon} />
        <Name>{props.name}</Name>
     
    </Card>
)}

const ButtonStyle = styled.button`
    
`



const ListMenuWrapper = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SortButton = ({text, fun}) => <ButtonStyle onClick={fun}>{text}</ButtonStyle>



const ListMenu = ({handleSortByRating}) => (
    <ListMenuWrapper>
        <SortButton fun={handleSortByRating} text="Rate" />
    </ListMenuWrapper>
)


const List = ({mapInstance, mapApi, places, handleSortByRating}) => { 

    /*
    const handleSortByRating = () => {
        setPlaces(places.sort((a,b) => a.rating - b.rating))
    }
    */

    const showDetail = (placeId) => {
        const search = new mapApi.places.PlacesService(mapInstance)
        const request = {
            placeId,
            fields: ['name', 'rating', 'formatted_phone_number', 'geometry','opening_hours', 'utc_offset']
        }
        search.getDetails(request, (results, status)=>{
            console.log(results)
            console.log(results.formatted_phone_number)
            console.log(results.rating)
            if (status == mapApi.places.PlacesServiceStatus.OK && results.opening_hours) {
                console.log(results.opening_hours.isOpen() ? '營業中':'休息中')
                console.log(results.opening_hours.weekday_text)
            } else {
                console.log('找不到餐廳資訊 :(')
            }
        })
    }

    console.log(places)
    return (
    <ListWrapper>
        <ListMenu 
            handleSortByRating={handleSortByRating}
        />
        {places.map((place,index)=>{
        //console.log(item.isShit)
        //console.log(item)
        return(
            <Cards
                key={index}
                icon={place.icon}
                name={place.name}
                Rating={place.rating}
                address={place.vicinity}
                openTime={place.openTime}
                isShit={place.isShit}
                showDetail={()=>{showDetail(place.place_id)}}
            />
        )})}
    </ListWrapper> 
    )
}

export default List