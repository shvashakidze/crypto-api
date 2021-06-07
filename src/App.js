import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import './coin.css'
import Coin from './Coin.js';


function App() {
 const [coins, setCoins] = useState([]);
 const [search, setSearch] =useState([])

  useEffect(()=>{
   axios
   .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
       .then(res=>{
         setCoins(res.data);
         
        }).catch(erorr => console.log(erorr));
  }, []);

const handleChange =e =>{
  setSearch(e.target.value)
};

  const filteredCoins = coins.filter(coin => 
  coin.name.toLowerCase().includes(search)
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
      <h1 className="coin-text">Search</h1>
      <form>
        <input type='text' placeholder='search' 
        className='coin-input' onChange={handleChange}
        />
      </form>
      </div>
      <div className='app-container'>
      {filteredCoins.map( coin =>{
        return(
            <Coin 
          key={coin.id} 
           name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
         price={coin.current_price}
         priceChange={coin.price_change_percentage_24h}
         volume={coin.total_volume}
     />
        );
      })}

    </div>
    </div>
  );
}

export default App;
