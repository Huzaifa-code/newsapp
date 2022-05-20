import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import './News.css'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  
  }

  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);

    console.log("Hello this is constructor from News component");

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async updateNews(){
    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data = await fetch(url);

    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);

    this.setState( {
        articles : parsedData.articles ,
        totalResults: parsedData.totalResults ,
        loading: false
    })

    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
      this.setState({ page: this.state.page - 1})
      this.updateNews();
  }

  handleNextClick = async () => {

    this.setState({ page: this.state.page + 1})
    this.updateNews();

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1});

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4a045a06fd74cf6bd1dce087b37f18b&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()

    this.setState( {
        articles : this.state.articles.concat(parsedData.articles) ,
        totalResults: parsedData.totalResults ,
        loading: false
    })
  }
  
  render(){

    const MainStyle = {
      background: "#2d3436",
      padding: "0 9rem"
    }

    return (
      <div className='main'  style={MainStyle} >
          <h1 className="text-center font-weight-bold" style={{color: "#dfdfdf"}} >NewsMonkey - Top Headlines</h1>
          {/* {this.state.loading && <Spinner/>} */}

          <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={ this.state.articles.length !== this.state.totalResults }
              loader={<Spinner/>}    
          >
              <div className="container">

              <div className="row">

                {  this.state.articles.map((element) => {
                  
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem  title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                  </div>

                })}
              </div>
              </div>
          </InfiniteScroll>

          {/* <div className="container pb-2 d-flex justify-content-between">
            <button disabled={this.state.page  <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
            <button disabled={ this.state.page + 1 >  Math.ceil(this.state.totalResults/20) } type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
          </div> */}
      </div>
    )
  }
}

export default News