import { useEffect, useState } from 'react'
import newsApi from '../../api/news' 
import Container from '../container/Container'
import style from './News.module.css'

function News() {
    const [news, setNews] = useState([])



    useEffect(() => {
           newsApi().then(res => setNews(res.results))
    }, [])


    return (
        <section className={style.news}>
            <Container>
                <h2 className={style.title}>Interacting with our pets</h2>
                <ul className={style.list}>
                  {
                    news.map(e => {
                        return (
                            <li className={style.item} key={e.id} >
                                <a href={e.url} target="_blank">
                                    <img className={style.img} src={e.image_url} alt="" width={200}/>
                                    <p className={style.text}>{e.title}</p>
                                </a>
                            </li>
                        )
                    })
                  }
                </ul>
                <button className={style.btn} type="button">See more</button>
            </Container>
        </section>
    )
}

export default News
