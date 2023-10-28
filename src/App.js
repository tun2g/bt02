import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const API_KEY = "BWliTZ6kkPZp4PkRYVxQi5s4abNRvMBLBofUmNPYo3hyKzMIRNcsvrlE"

const API_URL = "https://api.pexels.com/v1"

function App() {

  const [query,setQuery] = useState('');
  const [currentPage,setCurrentPage] = useState(1)
  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(false);

  const header = {
    "Authorization": API_KEY
  }

  useEffect(()=>{
    console.log()
  },[])

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const handleFetch = ()=>{

      axios.get(`${API_URL}/search?query=${query}&per_page=10&page=${currentPage}&client_id=${API_KEY}`,{
        headers: header
      })
      .then(data=>{
          let newList  =  images
          newList = newList.concat(data.data.photos)          
          setImages(newList);
        })
      .catch(err=>{
          alert("API KET is limited.")
          console.log(err);
      })
  }

  const handleScrollTopTop=(event)=>{
    const scrollableElement = event.target;
    console.log("aaa")
    if (
      scrollableElement.scrollTop + scrollableElement.clientHeight ===
      scrollableElement.scrollHeight
    ) {
      console.log("Đã cuộn đến cuối");
    }
  }

  const loadMore = ()=>{
    setCurrentPage(currentPage+1)
    handleFetch()
  }

  const handleSearch= async()=>{
      setLoading(true)
      await delay(1000)
      handleFetch()
      setLoading(false)
  }

  const handleTyping=(e)=>{
      setQuery(e.target.value);
      setCurrentPage(1);
  }

  return (
    <div className="App" onScroll={(e)=>handleScrollTopTop(e)}>
      <div className='wrapper'>
        <div className='header'>
          <div className='search'>
            <input value ={query} onChange={e=>{handleTyping(e)}}/>
          </div>
          <div className='button' onClick={handleSearch}>
              Search
          </div>
        </div>
        <div className='content'>
          <InfiniteScroll
          dataLength={images.length}
          next={loadMore}
          hasMore={true}
          >

            {
              loading?
              <div className="cv-spinner"><span className="spinner"></span></div>
              :
              images.map((image,index)=>{
                return (
                  <div className='image' key = {index}>
                      <img src={image?.src?.medium}/>
                    </div>
                )
              })
            }
            </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
