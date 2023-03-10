import React, {useEffect, useState } from 'react'
import customFetch from '../../api';
import Card from '../../components/card/Card';
import styles from '../arms/arms.module.css';
import NavBar from '../../components/navBar/navBar';


const Arms = ({isInFav='false', onClick}) => {
 const [filteredData, setFilteredData] = useState([])
  const [favs, setFavs] = useState([]);
  const [data, setData] = useState([]);
 

  useEffect(() => {
    if (data.length) {
      setFilteredData(data);
    }
  }, [data, setFilteredData]);


  useEffect(() => {
    customFetch("GET", "workouts")
      .then((json) => {
      setData(json);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [setFilteredData]);

    const addToFav = (item) => {       
      setFavs([...favs, item]);
  }

console.log(filteredData)
  return (
    <div className={styles.container}>
      <NavBar />
      <h1>Welcome to Arms workout</h1>
    <div className={styles.wrap}>
    {
      filteredData && filteredData.length > 0 && filteredData.filter(item => item.type.toLocaleLowerCase().includes('arms','arm')).map( item => 
        <Card addToFav={addToFav} item={item} id={item._id} key={item._id}
        onClick={() => {onClick()}} />)}
    </div>
      
       
    </div>
    
  )
}

export default Arms;