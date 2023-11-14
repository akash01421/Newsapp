import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, author,date } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!imageUrl ? "https://i.guim.co.uk/img/media/c987903c1685775b23a86d30014cf496283634ba/0_1_3979_2388/master/3979.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=fefca1825f852d05e8c2b893c3369fb6" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted' >By {!author?'Unknown':author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
