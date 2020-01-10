import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
    display: 'inline-block';
    height: '100vh';
    min-width: 250px;
`

const Card = styled.div`
    height: 200px;
    width: 100%;
    border: 2px solid gray;
    box-sizing: border-box;
`

const Photo = styled.img`
    height: 130px;
    width: 100%;
`

const Icon = styled.img`
    height: 20px;
    width: 20px;
`

const Name = styled.span`
    height: 30px;
    width: 100px;
    font-size: 20px;
    font-weight: bolder;

`

const Cards = (props) => {
    //console.log(props)
    return (
    <Card>
        <Icon src={props.icon} />
        <Name>{props.name}</Name>
        {props.isOpen && <span>{props.isOpen ? '營業中' : '休息中'}</span>}

        
    </Card>
)}



const List = ({places}) => { 
    console.log(places)
    return (
    <ListWrapper>
        {places && places.map((item,index)=><Cards
            key={index}
            icon={item.icon}
            name={item.name}
            isOpen={item.opening_hours}
            Rating={item.rating}
            address={item.vicinity}
        />)}
    </ListWrapper> 
    )
}

export default List