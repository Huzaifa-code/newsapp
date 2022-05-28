import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import './News.css'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  

  const updateNews = async () => {
    props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    
    setLoading(true);
    let data = await fetch(url);

    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);


    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);

  }

  useEffect(() => {
    updateNews();
  },[])


  // const handlePrevClick = async () => {
     
  //     setPage(page-1);
  //     updateNews();
  // }

  // const handleNextClick = async () => {

  //   setPage(page+1);
  //   updateNews();

  // }

  const fetchMoreData = async () => {
    
    setPage(page + 1);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    
    // setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json()

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    // setLoading(false);
    
  }
  

  const MainStyle = {
      background: "#2d3436",
      padding: "0 9rem"
  }

    return (
      <div className='main'  style={MainStyle} >
          <h1 className="text-center font-weight-bold" style={{color: "#dfdfdf"}} >NewsMonkey - Top Headlines</h1>
          {/* { loading && <Spinner/>} */}

          <InfiniteScroll
              dataLength={  articles.length }
              next={fetchMoreData}
              hasMore={  articles.length !==  totalResults }
              loader={<Spinner/>}    
          >
              <div className="container">

              <div className="row">

                {   articles.map((element) => {
                  
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem  title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                  </div>

                })}
              </div>
              </div>
          </InfiniteScroll>

          {/* <div className="container pb-2 d-flex justify-content-between">
            <button disabled={ page  <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
            <button disabled={  page + 1 >  Math.ceil( totalResults/20) } type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
          </div> */}
      </div>
    )
  
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'

}

News.propTypes = {
  name: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News