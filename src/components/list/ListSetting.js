import styled from 'styled-components';

export const ListWrapper = styled.div`
    max-height: 100vh;
    min-width: 350px;
    overflow: scroll;
`

export const Card = styled.div`
    display: flex;
    align-items: center;
    min-height: 50px;
    height: auto;
    border: 2px solid gray;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.5s;
    &:hover{
        background-color: wheat;
    }
`

export const Icon = styled.img`
    border: 2px solid orange;
    margin-left: 5px;
    padding: 4px;
    border-radius: 10px;
    height: 20px;
    width: 20px;
`

export const Name = styled.span`
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

export const ButtonStyle = styled.button`
    font-size: 13px;
    color: white;
    margin: 0 5px;
    width: auto;
    height: auto;
    padding: 10px;
    border: 2px solid white;
    background-color: orange;
    border-radius: 8px;
    transition: all 0.5s;
    cursor: pointer;
    &:hover{
        transform: scale(1.05)
    }

`

export const ListMenuWrapper = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`