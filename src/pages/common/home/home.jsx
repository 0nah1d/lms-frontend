import React from 'react'
import Banner from './elements/banner.jsx'
import Categories from './elements/categories.jsx'
import { Helmet } from 'react-helmet-async'

export default function Home() {
    return (
        <div>
            <Helmet>
                <title>Library | Home</title>
            </Helmet>
            <Banner></Banner>
            <Categories></Categories>
        </div>
    )
}
