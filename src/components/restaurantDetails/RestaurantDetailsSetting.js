import styled from 'styled-components'

export const DetailsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100vh;
    touch-action: none;
`

export const DetailCard = styled.div`
    padding: 25px;
    border-radius: 12px;
    min-height: 200px;
    height: auto;
    width: 450px;
    border: 2px solid orange;
    background-color: ivory;
`

export const Name = styled.div`
    color: #444444;
    font-weight: bolder;
    font-size: 30px;
`

export const Address = styled.div`
    color: #444444;
    margin-top: 14px;
    font-size: 16px;
`

export const Telphone = styled.div`
    color: #444444;
    margin-top: 14px;
    font-size: 16px;
`
export const Rating = styled.div`
    font-weight: ${props => props.rating >= 4 ? 'bolder' : 'normal'};
    color: ${props => props.rating >= 4 ? 'green' : 'mediumblue'};
    margin: 14px 0;
    font-size: 16px;
`
export const IsOpen = styled.div`
    display: inline-box;
    color: ${props => props.isOpen ? "white" : "#444444" };
    margin-top: 14px;
    font-size: 18px;
    width: auto;
    height: auto;
    padding: 8px;
    border: 1px solid white;
    background-color: ${props => props.isOpen ? "green" : "gray" };
    border-radius: 8px;
`

export const CloseDetail = styled.button`
    font-size: 16px;
    color: white;
    margin-top: 14px;
    width: auto;
    height: auto;
    padding: 8px;
    border: 2px solid white;
    background-color: orange;
    border-radius: 8px;
    cursor: pointer;
`

export const OpenTimeDetails = styled.div`
    margin-top: 4px;
    font-size: 13px;
`
