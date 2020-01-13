import styled from 'styled-components'

export const MapWrapper = styled.div`
  display: inline-block;
  height: 100vh;
  width: 100%;
`
export const MarkerWrapper = styled.div`
  height: 50px;
  width: 200px;
`
export const Icon = styled.img`
  height: 20px;
  width: 20px;
`

export const Text = styled.div`
  word-wrap: nowrap;
  width: auto;
  height: auto;
  display: inline-block;
  padding: 3px;
  border-radius: 8px;
  border: 1.5px solid orange;
  background-color: white;
  transition: all 1s;
  cursor: pointer;
  &:hover {
    transform: scale(2);
    background-color: wheat;
  }
`

