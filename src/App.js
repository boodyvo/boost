import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [filter, setFilter] = useState(false);
    const [age, setAge] = useState(0);
    const [data, setData] = useState([]);
    const [visualData, setVisualData] = useState([]);

    const handleGeneralFilter = () => { /* TODO(boodyvo): do something useful */};

    const handleAllFilterChange = () => {
        setFilter(!filter);
        console.log(filter);
        setVisualData( data.filter( (item) => filter ?
            item["Всі"] === "TRUE" :
            item["Всі"] === "FALSE" )
        );
        console.log(visualData);
    };

    const handleAgeChange = (e) => {
        const val = e.target.value ? e.target.value : "0";
        setAge(parseInt(val, 10));
        if (e.target.value === "")
            setVisualData( data );
        else
            setVisualData( data.filter( (item) => item.fromAge <= val && item.toAge >= val ));
        console.log(val);
        console.log(data.filter( (item) => item.fromAge <= val && item.toAge >= val ));
    };

    useEffect( () => {
        const fetchData = async () => {
            const result = await axios(
                'https://v1.nocodeapi.com/boost/google_sheets/WufYxAImintsinXV?tabId=Database',
            );
            console.log(result.data.data);

            const parsedData = result.data.data.map( (item) => {
                if (item["Вік"].search("-") > -1) {
                    let ages = item["Вік"].split("-");
                    item.fromAge = parseInt(ages[0], 10);
                    item.toAge = parseInt(ages[1], 10);
                } else {
                    item.fromAge = 0;
                    item.toAge = 1000;
                }

                return item;
            });
            console.log(parsedData);

            setData(parsedData);
            setVisualData(parsedData);
            console.log("Fetched data");
        };

        fetchData();
    }, []);

    return (
        <div>
            <input className="btn" type="checkbox" checked={filter} onChange={handleAllFilterChange} />
            <input className="btn" type="range" min="0" max="100" step="1" onChange={handleAgeChange} />
            <ul>
                {
                    visualData.length > 0 ? visualData.map( (item, index) => (
                        <li key={index}>
                            <h2>{ item["Назва організації"] }</h2>
                            <img src={item["Картинка"]} alt="Картинка" />
                            <div>
                                {item["Опис"]}
                            </div>
                        </li>
                    )) : <li> No items </li>
                }
            </ul>
        </div>
    );
};

export default App;
