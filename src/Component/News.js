import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - News`
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c6386e40d6e4f62b9da67f71695f522&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        await this.updateNews();

    }



    // handleNextClick = async () => {
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c6386e40d6e4f62b9da67f71695f522&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     //     this.setState({ loading: true });
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json()
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     })
    //     // }
    //     // this.setState({ page: this.state.page + 1 })
    //     await this.updateNews();
    // }


    // handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4c6386e40d6e4f62b9da67f71695f522&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })

    //     // this.setState({ page: this.state.page - 1 })
    //     await this.updateNews();
    // }

    fetchMoreData = async() => {
    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        
    })
   
  };


    render() {
        return (
            <>
                <h2 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}>News - Top  {this.props.category} Headlines </h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading &&<Spinner />}
                >

                    <div className='container'>
                    <div className='row'>
                        {this.state.articles.map((e,index) => {
                            return <div className='col-md-4' key={index}>
                                <NewsItem title={e.title ? e.title.slice(0, 45) : ""} description={e.description ? e.description.slice(0, 85) : ""}
                                    imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} />
                            </div>
                        })}
                    </div>
                    </div>
                    </InfiniteScroll >
                    
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &#11164; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#11166;</button>
                    </div> */}
            </>

        )
    }
}
