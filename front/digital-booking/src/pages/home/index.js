import React, { useEffect, useState } from 'react';
import './home.scss';
import Categories from '../../components/Categories';
import Search from '../../components/Search';
import Layout from '../../components/Layout';
import List from '../../components/List';


const Home = () => {

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        type: "rated",
        data: 6
    });
    const [cleanFilter, setCleanFilter] = useState(false);

    return (
        <Layout>
            <div className="main-home-container">
                <Search setFilter={(filterValue) => setFilter(filterValue)} loading={loading} cleanFilter={cleanFilter} />
                <Categories setFilter={(filterValue) => setFilter(filterValue)} loading={loading} cleanFilter={cleanFilter}/>
                <List filter={filter} setFilter={(filterValue) => setFilter(filterValue)} loading={loading} setLoading={(isLoading) => setLoading(isLoading)} setCleanFilter={(clean) => setCleanFilter(clean)}/>
            </div>
        </Layout>
    );
};

export default Home;