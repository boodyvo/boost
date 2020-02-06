import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import {Context} from "../../store";

const Home = () => {
    const [state, dispatch] = useContext(Context);

    const handleFilterAllChange = () => {
        const nextValue = !state.filters.all;
        dispatch({
            type: "SET_FILTER_ALL",
            payload: nextValue,
        });
    };

    const handleFilterVPOChange = () => {
        const nextValue = !state.filters.vpo;
        dispatch({
            type: "SET_FILTER_VPO",
            payload: nextValue,
        });
    };

    const handleAgeChange = (e) => {
        const val = e.target.value ? e.target.value : "0";
        dispatch({
            type: "SET_FILTER_AGE",
            payload: (parseInt(val, 10)),
        });
    };

    return (
        <div className="row">
            <div className="col-3 home--filters">
                <div>
                    <label>All</label>
                    <input className="btn" type="checkbox" checked={state.filters.all} onChange={handleFilterAllChange} />
                </div>
                <div>
                    <label>VPO</label>
                    <input className="btn" type="checkbox" checked={state.filters.vpo} onChange={handleFilterVPOChange} />
                </div>
                <input className="btn" type="range" min="0" max="100" step="1" value={state.filters.age} onChange={handleAgeChange} />
                {state.filters.age}
            </div>
            <div className="col-9 home--data">
                <ul>
                    {
                        state.visualData.length > 0 ? state.visualData.map( (item, index) => (
                            <Card key={index}>
                                {/*<Card.Img variant="top" src={item["Картинка"]} />*/}
                                <Card.Body>
                                    <Card.Title>{item["Назва організації"]}</Card.Title>
                                    <Card.Text>
                                        Опис: {item["Опис"]}
                                    </Card.Text>
                                    <Card.Text>
                                        Вік: {item["Вік"]}
                                    </Card.Text>
                                    <Card.Text>
                                        Всі: {item["Всі"]}
                                    </Card.Text>
                                    <Card.Text>
                                        ВПО: {item["ВПО"]}
                                    </Card.Text>
                                </Card.Body>
                                <Link to={`/opportunity/${item["ID"]}`}>
                                    Read More
                                </Link>
                            </Card>
                        )) : <li> No items </li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Home;