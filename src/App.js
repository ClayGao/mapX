import React, { useEffect, useState } from 'react';
import List from './components/list'
import Map from './components/map'
import RestaurantDetails from './components/restaurantDetails'
import styled from 'styled-components';

// 只有一個 Wrapper 所以沒有額外建一個 Styled Setting
export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  margin: 0;
  padding: 0;
`

// App
const App = () => {
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 25.04, 
    lng: 121.512
  })
  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [places, setPlaces] = useState([])
  const [isReading, setIsReading] = useState(false)
  const [details, setDetails] = useState({
    name: null,
    address: null,
    telphone: null,
    rating: null,
    isOpen: null,
    openTime: null
  })
  
  //地圖 API 載入
  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
    setMapApiLoaded(true)
  };

  // 當 API 載入完成，或者本地位置移動時，重新找餐廳
  useEffect(()=>{
    findResturants(mapInstance, mapApi)
  },[mapApiLoaded, defaultCenter, mapInstance, mapApi])

  // 找餐廳
  const findResturants = (map, maps) => {
    if(mapApiLoaded) {
      const search = new maps.places.PlacesService(map)

      const request = {
        location: defaultCenter,
        radius: 1000, 
        type: ['restaurant']
      };
    
      search.nearbySearch(request, (results, status) => {
        if(status === maps.places.PlacesServiceStatus.OK) {
          setPlaces(results)
        }
      })
    }
  }
  
  // 以評價排序
  const handleSortByRating = () => {
    const newPlaces = [...places]
    newPlaces.sort((a,b)=>b.rating - a.rating)
    setPlaces(newPlaces)
  } 

  // 以評價數量排序
  const handleSortByUserRatings = () => {
    const newPlaces = [...places]
    newPlaces.sort((a,b)=>b.user_ratings_total - a.user_ratings_total)
    setPlaces(newPlaces)
  } 

  // 以價格排序
  const handleSortByPriceLevel = (startFromCheap) => {
    const newPlaces = [...places]
    if(startFromCheap) {
      const newPlacesFilter = newPlaces.filter(n=>n.price_level)
      newPlacesFilter.sort((a,b)=>a.price_level - b.price_level)
      setPlaces(newPlacesFilter)
    } else {
      const newPlacesFilter = newPlaces.filter(n=>n.price_level)
      newPlacesFilter.sort((a,b)=>b.price_level - a.price_level)
      setPlaces(newPlacesFilter)
    }
  } 
  
  
  // 當 User 移動
  const handleCenterChange = () => {
    if(mapApiLoaded) { 
      setDefaultCenter({...defaultCenter,
          lat: mapInstance.center.lat(),
          lng: mapInstance.center.lng()
      })
    }
  }

  // Show 餐廳資訊
  const showDetail = (placeId) => {
    const search = new mapApi.places.PlacesService(mapInstance)
    const request = {
        placeId,
        fields: ['name', 
          'rating', 
          'formatted_address', 
          'formatted_phone_number', 
          'geometry',
          'opening_hours',
          'utc_offset']
    }
    search.getDetails(request, (results, status)=>{
     if (status === mapApi.places.PlacesServiceStatus.OK && results.opening_hours) {
        setDetails({...details, 
          name: results.name,
          address: results.formatted_address,
          telphone: results.formatted_phone_number,
          rating: results.rating,
          isOpen: results.opening_hours.isOpen(),
          openTime: results.opening_hours.weekday_text
        })
        setIsReading(true)
      } else {
        setDetails({...details, 
          name: results.name,
          address: results.formatted_address,
          telphone: results.formatted_phone_number,
          rating: results.rating,
          isOpen: '找不到營業資訊 :(',
          openTime: null
        })
        setIsReading(true)
      }
      })
    }

  // 關閉資訊
  const closeDetail = () => setIsReading(false)

  // render
  return(
    <Wrapper>
      {isReading && <RestaurantDetails details={details} closeDetail={closeDetail} />}
      <List 
        mapInstance={mapInstance}
        mapApi={mapApi}
        places={places}
        handleSortByRating={handleSortByRating}
        handleSortByPriceLevel={handleSortByPriceLevel}
        handleSortByUserRatings={handleSortByUserRatings}
        showDetail={showDetail}
      />
      <Map
        mapInstance={mapInstance}
        mapApi={mapApi}
        defaultCenter={defaultCenter}
        places={places}
        handleCenterChange={handleCenterChange}
        mapApiLoaded={mapApiLoaded}
        apiHasLoaded={apiHasLoaded}
        showDetail={showDetail}
      />
    </Wrapper>
  );
}

export default App;
