import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import List from './List'
import {API_KEY} from './api_key'

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  margin: 0;
  padding: 0;
`

const Icon = styled.img`
    height: 20px;
    width: 20px;
`

const AnyReactComponent = (props) =>{
  return (
    <div style={{height: '50px', width:'50px',}}>
      <Icon 
        src={props.icon}
      />
      <p>{props.text}</p>
    </div>
  )
}

const MyComponent = (props) =>{
  return (
    <div style={{height: '50px', width:'50px',}}>
      <div style={{height: '5px', width:'5px',backgroundColor:'red'}}>

      </div>
      <p>{props.text}</p>
    </div>
  )
}
 
let search = null  
let detail = null

const SimpleMap = (props) => {
  
  const [defaultCenter,setDefaultCenter] = useState({
    lat: 25.04, 
    lng: 121.512
  })
  const [isLoading, setIsLoading] = useState(false)
  const [defaultZoom, setDefaultZoom] = useState(17)
  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [places, setPlaces] = useState([])
  
  
  //地圖 API 載入
  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true)
    setMapInstance(map)
    setMapApi(maps)
    search = new maps.places.PlacesService(map)
    
    findResturant(map, maps)
  };

  // 找餐廳
  const findResturant = (map, maps, request) => {
    setIsLoading(true)
    if(maps) {
    
    const request = {
      location: defaultCenter,
      radius: 900,
      type: ['restaurant']
    };
    
    search.nearbySearch(request, (results, status) => {
        if(status == maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {  
            results[i].key = i
      
            //
            
            const placeReq = {
              placeId: results[i].place_id,
              fields: ['name', 'rating', 'formatted_phone_number', 'geometry','opening_hours']
            }
            
           
              search.getDetails(placeReq, (place, status)=>{
                //console.log(status)
                if (status == maps.places.PlacesServiceStatus.OK && place.opening_hours)  {
                  console.log(place.opening_hours.isOpen())
                  const isOpen = place.opening_hours.isOpen()
                  if(isOpen) {
                    console.log('yes!')
                  } else {
                    console.log('NO!')
                  }
                  //console.log(place.opening_hours.isOpen())
                }
              });
            
            //

          }
          setPlaces(results)
          setIsLoading(false)
          
        }
    })

    
    }
  }

  // 解決 setState 非同步問題
  useEffect(()=>{
    findResturant(mapInstance, mapApi)
  },[defaultCenter])
  

  
  const showSomething = () => {
    if(mapApiLoaded) { 
      // 解決 setState 非同步問題 ?
      setDefaultCenter({...defaultCenter,
          lat: mapInstance.center.lat(),
          lng: mapInstance.center.lng()
      })
      setDefaultZoom(mapInstance.zoom)
      console.log(mapInstance.zoom)
    }
  }
  
  console.log(places)
    return(
      <Wrapper>
      
      <List 
        places={places}
      />
    
      <div style={{ display: 'inline-block',height: '100vh', width: '100%' }}>
        <GoogleMapReact
          onBoundsChange={showSomething}
          bootstrapURLKeys={{ 
            key: API_KEY,
            libraries: ['places','geometry']
          }}
          defaultCenter={{lat: 25.04, lng: 121.512}}
          defaultZoom={17}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
          <MyComponent
            lat={defaultCenter.lat}
            lng={defaultCenter.lng}
            text="當前位置"
          />
          {!isLoading && places.map(item=>{
            return(
              <AnyReactComponent
                /*
                position={{
                  lat: item.geometry.location.lat(),
                  lng:item.geometry.location.lng(),
                }}
                */
                icon={item.icon}
                key={item.id}
                lat={item.geometry.location.lat()}
                lng={item.geometry.location.lng()}
                text={item.name}   
            />) }
          )}
        </GoogleMapReact>
      </div>
      </Wrapper>
    );
  }


  
const App = () => {
  return (
    <div>
      <SimpleMap />
    </div>
  );
}

export default App;
