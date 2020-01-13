import React from 'react';
import GoogleMapReact from 'google-map-react';
import {API_KEY} from '../../api_key'
import placeholder from '../../placeholder.svg'

import {
    Icon,
    MapWrapper,
    MarkerWrapper,
    Text
} from './MapSetting'

const RestaurantMarker = ({icon, text, showDetail, placeId}) => (
    <MarkerWrapper>
      <Icon src={icon} />
      <Text onClick={()=>showDetail(placeId)}>{text}</Text>
    </MarkerWrapper>
)


const MyPositionMarker = ({text}) =>(
    <MarkerWrapper>
      <Icon src={placeholder} />
      <Text>{text}</Text>
    </MarkerWrapper>
)


const Map = ({places, defaultCenter, handleCenterChange, apiHasLoaded, showDetail}) => (

  <MapWrapper>
    <GoogleMapReact
      onBoundsChange={handleCenterChange}
      bootstrapURLKeys={{ 
        key: API_KEY,
        libraries: ['places','geometry']
      }}
      defaultCenter={{lat: 25.04, lng: 121.512}}
      defaultZoom={17}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
    >
      <MyPositionMarker
        lat={defaultCenter.lat}
        lng={defaultCenter.lng}
        text="當前位置"
      />
      {places.map(item=>{
        return(
          <RestaurantMarker
            icon={item.icon}
            key={item.id}
            lat={item.geometry.location.lat()}
            lng={item.geometry.location.lng()}
            text={item.name} 
            placeId={item.place_id} 
            showDetail={showDetail} 
        />)
        })}
    </GoogleMapReact>
  </MapWrapper>
)


export default Map
  