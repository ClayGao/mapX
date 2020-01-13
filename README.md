# 串接 Google Map API 找附近餐廳

## 專案簡介

使用套件 Google-Map-React 串接 Google Map API，自動查找附近餐廳並顯示資訊

## 使用方法

下載專案 (Clone or download) 之後，進入到 my-app/src

建立 api_key.js，輸入以下程式碼後並 Save:

```javascript
export const API_KEY = [YOUR_API_KEY] // 需自行申請你的 Google Map API KEY
```

打開 cmd 輸入:

```bash
npm start
```

採用 `http://localhost:3000/` 跑起該程式

- 如果缺少套件，可以使用 `npm install` 下載需要套件

---

## 功能介紹

可以移動 Google Map 尋找附近餐廳，地圖中央定位點為 User 預設位置，尋找附近的餐廳

- 搜尋範圍: 設定為 1000 半徑 (radius)

- 搜尋類型: 僅餐廳 (resturant)，目前測試發現酒店、飯店也會納入搜尋目標

- 餐廳資訊: 點選左側菜單可以看到以下資訊:

    |資訊|介紹|語法|
    |---|---|---|
    |店名|餐廳店名|name|
    |評分|餐廳評分，最高為 5|rating|
    |地址|餐廳地址|formatted_address|
    |電話|餐廳電話|formatted_phone_number|
    |座標|座標資訊|geometry|
    |營業時間|店面營業時間，包括當下是否營業的 Boolean|opening_hours|
    |時區標準|該餐廳所在位置的時區標準，需使用才能顯示營業時間|utc_offset|

  - 其中 utc_offset 經 Google Map API 介紹，即將於 2020 年停用，需要改用 utc_offset_minutes，但目前實測使用 utc_offset_minutes 反而會跳出警告

  - 同上，open_now 也即將停用，店面是否營業也即將在 2020 年全面改用 open_hours 底下的 isOpen Function，該專案使用 isOpen 沒有問題

- 排序功能:

    關於餐廳的喜好排序，目前提供四種排序功能:

  - 評分排序: 使餐廳由高到低做排序，資訊欄中若評分超過 4 (含)，則顯示字體顏色為 green，否則為 mediumBlue

  - 評論量高: 評論量應該會與訪客造訪次數成正比，因此也成為了排序條件，建議可以與評分排序搭配使用

  - 便宜排序: 如果只是想隨便吃個飯，可以點選此排序，此排序與下列的高價排序，都會先剔除掉無價格等級資訊的餐廳再進行排序，因此，不含有價格資訊的餐廳不會顯示在左側列表。

  - 高價排序: 有時候一些重要節日總會想請家人或情人吃個大餐，因此點選這個排序時會較容易看到高星級的餐廳，個人認為也是蠻必要的。

    補充: 根據 [Google API 介紹](https://developers.google.com/places/web-service/details#fields)，價格排序分為五個星等，分別為:

    - 0: 自由無定價 (Free)

    - 1: 便宜 (Inexpensive)

    - 2: 普通 (Moderate)

    - 3: 貴 (Expensive)

    - 4: 超級貴 (Very Expensive)

---

## Stacks

- Google-Map-React

- React.js (Use Hooks)

- Styled-Components

---

## 絕對沒用到的 Stacks

- React-router

- React-redux

- Redux-saga

---

## 參考文件

- [Google Map API for JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial)

- [Building a React “Ice Cream finder” App with the Google Maps API](https://medium.com/javascript-in-plain-english/building-a-react-ice-cream-finder-app-with-the-google-maps-api-7e39339e0261)