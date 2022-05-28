import React from 'react'
import styledComponents from 'styled-components';
import styled from 'styled-components';

const NewsItem = (props) => {
  
    let {title, description, imageUrl, newsUrl, author, date} = props;
    
    return (

      <div className='my-3'>
        <div className="card" style={{borderRadius: "10px", overflow: "hidden", background: "#1e272e", boxShadow:"0px 0.3px 5.3px -2px rgba(0, 0, 0, 0.028),0px 0.9px 17.9px -2px rgba(0, 0, 0, 0.042),0px 4px 80px -2px rgba(0, 0, 0, 0.07)"}}>
          <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body" style={{color: "#fff"}} >
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
              <ReadMore rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm">Read More</ReadMore>
            </div>
        </div>
      </div>
    );
  
}

const ReadMore = styled.a`
  background-color: #0984e3;
  color: #fff;
`

export default NewsItem