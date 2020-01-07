import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import {API_KEY} from './API_key'

const Wrapper = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
`

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 20.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={20.955413}
            lng={30.337844}
            text="My Marker"
          />
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
