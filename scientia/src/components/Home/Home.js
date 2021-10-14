import React from "react";
import './Home.css';
import SearchBar from "../Search/SearchBar";
import FilterBy from '../FilterBar/FilterBar'

export default function Home () {
    return (
        <div>
            <SearchBar />
            <FilterBy />
        </div>
    );
};