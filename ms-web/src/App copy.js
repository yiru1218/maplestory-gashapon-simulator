//import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React,{ useState, useEffect } from "react";

function App() {
  const [datas, getData] = useState();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/fashion-data')
      .then((response) => {
        getData(response.data.data);
      });
  }, []);

  if (!datas) return null;

  // const listPool = [datas.map((data)=>(
  //   data.item_name
  // ))];
  var itemPool = [];
  datas.forEach((data) => {
    for(let i=0; i<data.prob_nums; i++) {
      itemPool.push(data.item_name);
    }
  });
  // console.log(itemPool.length);

  const [randomSelectItem, setRandomSelectItem] = useState();
  
  const randomOneItems = () => {
    const item = Math.floor(Math.random() * itemPool.length);
    setRandomSelectItem(item);
    console.log(itemPool[randomSelectItem]);
  };

  return ( 
    <div>
      {/* <ul>
        {
          datas.map(
            data =>
          <p>{data.item_name} {data.prob_nums}</p>
          )
        }
      </ul> */}
      
      <button onClick={randomOneItems}>test</button>
      {/* <div>{randomSelectItem}</div> */}
    </div>
  );
}

export default App;