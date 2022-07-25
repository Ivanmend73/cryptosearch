import React,{ useState, useEffect } from 'react'
import axios from 'axios'

export const Crypto = () => {
  // 1- Setear los hooks
  const [search, setSearch] = useState("")
  const [cryptos, setCryptos] = useState( [] )
  
  // 2- Funcion para atraer los datos
    const endPoint = 'https://api.coingecko.com/api/v3/coins'

    const showData = () => {
      axios.get(endPoint).then((res) => {
        setCryptos(res.data)
        //console.log(cryptos)
      })
    }

    useEffect(() => {
      showData()
    }, [])
  
  // 3- Funcion de busqueda
 
    const searcher = (e) => {
      setSearch(e.target.value) 
    }


   // 4- Filtrar los datos

   const results = !search ? cryptos : cryptos.filter((val) => val.name.toLowerCase().includes(search.toLocaleLowerCase()))


  //Renderizamos la vista
  return (
    <div className='container-fluid'>
      <input valie={search} type="text" onChange={searcher}  placeholder="Search...." className='form-control'/>
      <table className='table table-dark table=hpver mt-3'>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price 24h</th>
          </tr>
        </thead>
        <tbody>
          {
            results.map((result)=> (
              <tr key={result.key}>
                <td>{result.market_data.market_cap_rank}</td>
                <td><small><img src={result.image.small} /> {result.name}</small></td>
                <td>{result.symbol.toUpperCase()}</td>
                <td>{result.market_data.current_price.bmd.toFixed(2)}</td>
                <td>
                  {
                    result.market_data.price_change_percentage_1y < 0 ? 
                    ( <span className='badge bg-danger'>{result.market_data.price_change_percentage_1y}</span> ) :
                    ( <span className='badge bg-success'>{result.market_data.price_change_percentage_1y}</span> )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Crypto;

