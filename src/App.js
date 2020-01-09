import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import {API_KEY} from './api_key'

const Wrapper = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
`

const AnyReactComponent = (props) =>{
  //console.log(props.lat)
  return (
    <div style={{height: '50px', width:'50px',}}>
      <div style={{height: '5px', width:'5px',backgroundColor:'red'}}>

      </div>
      <p>{props.text}</p>
    </div>
  )
}

const MyComponent = (props) =>{
  //console.log(props)
  return (
    <div style={{height: '50px', width:'50px',}}>
      <div style={{height: '5px', width:'5px',backgroundColor:'red'}}>

      </div>
      <p>{props.text}</p>
    </div>
  )
}
 
class SimpleMap extends Component {
  /*
  static defaultProps = {
    center: {
      lat: 25.04, 
      lng: 121.512
    },
    zoom: 17
  };
  */

  constructor(props) {
    super(props);

    this.state = {
      search: null,
      defaultCenter: {
          lat: 25.04, 
          lng: 121.512
        },
      defaultZoom: 17,
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };

    this.mapRef = React.createRef()
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true, // 如果不設這個開關，會傳還沒拿到資料的 props 給 Search
      mapInstance: map,
      mapApi: maps,
    });

    const {
      defaultCenter, defaultZoom, places, mapApiLoaded, mapInstance, mapApi,
    } = this.state;
    
    this.setState({search : new mapApi.places.PlacesService(mapInstance)})

    const request = {
      location: defaultCenter,
      radius: 500,
      type: ['restaurant']
    };

    this.state.search.nearbySearch(request, (results, status) => {
      if (status == mapApi.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {  
          console.log(results[i])        
          //console.log(results[i].name)
        }
        this.setState({places : results})
      }
    })
    

  };

  showSomething = () => {
    const {
      defaultCenter, defaultZoom, places, mapApiLoaded, mapInstance, mapApi,
    } = this.state
    if(mapApiLoaded) { 
      console.log(mapInstance.center.lat()) 
      this.setState({
        defaultCenter: {
          lat: mapInstance.center.lat(),
          lng: mapInstance.center.lng()
        }
      },function(){
        console.log('display')

        const request = {
          location: defaultCenter,
          radius: 500,
          type: ['restaurant']
        };

        this.state.search.nearbySearch(request, (results, status) => {
          
            this.setState({places : results})
            console.log('ok')
          
        })
      })
    }
  }

  
 
  render() {
    
    const {
      defaultCenter, defaultZoom, places, mapApiLoaded, mapInstance, mapApi,
    } = this.state


    /*
    var myLatLng = {lat: 25.04, lng: 121.512};

    var marker = new mapApi.Marker({
      position: myLatLng,
      map: SimpleMap,
      title:'這是總統府'
    });

    marker.setMap(SimpleMap);
    */
    
    console.log('render')
    return (
      // {mapApiLoaded && <Search map={mapInstance} maps={mapApi} /> }
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <input style={{height:'50px', width:'50px', backgroundColor:'red'}} onClick={this.showSomething} type="button" />
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: API_KEY,
            libraries: ['places','geometry']
          }}
          defaultCenter={{lat: 25.04, lng: 121.512}}
          defaultZoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          <MyComponent
            //position={this.props.center}
            lat={defaultCenter.lat}
            lng={defaultCenter.lng}
            text="當前位置"
          />
          {places && places.map(item=>
            <AnyReactComponent
              //lat={(item.geometry.viewport.pa.g+item.geometry.viewport.pa.h)/2}
              //lng={(item.geometry.viewport.ka.g+item.geometry.viewport.ka.h)/2}
              lat={item.geometry.location.lat()}
              lng={item.geometry.location.lng()}
              text={item.name}
            />
          )}
        </GoogleMapReact>
      </div>
    );
  }
}
 
  
const App = () => {
  return (
    <Wrapper>
      <SimpleMap />
    </Wrapper>
  );
}

export default App;
