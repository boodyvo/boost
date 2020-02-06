import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import FormCheck from "react-bootstrap/FormCheck";
import Form from "react-bootstrap/Form";
import { Context } from "../../store";
import { typesAssistance } from "../../config/consts";

const Home = () => {
    const [state, dispatch] = useContext(Context);

    const handleFilterAllChange = () => {
        dispatch({
            type: "SET_FILTER_ALL",
            payload: !state.filters.all,
        });
    };

    const handleFilterVPOChange = () => {
        dispatch({
            type: "SET_FILTER_VPO",
            payload: !state.filters.vpo,
        });
    };

    const handleAgeChange = (e) => {
        const val = e.target.value ? e.target.value : "0";
        dispatch({
            type: "SET_FILTER_AGE",
            payload: (parseInt(val, 10)),
        });
    };

    const handleTypeFilter = (type, e) => {
        dispatch({
            type: `SET_FILTER_${type.toUpperCase()}`,
            payload: !state.filters[type],
        });
    };

    return (
        <div className="row">
            <div className="col-3 home--filters">
                <div>
                    <Form>
                    <span>Тип</span>
                    {
                        Object.entries(typesAssistance).map( ([key, value]) => {
                            return <div key={key}>
                                <FormCheck
                                    type="checkbox"
                                    label={value}
                                    className="btn"
                                    checked={state.filters[key]}
                                    onChange={handleTypeFilter.bind(this, key)}
                                />
                            </div>
                        })
                    }
                    </Form>
                </div>

                <div>
                    <FormCheck
                        type="checkbox"
                        label="Всі"
                        className="btn"
                        checked={state.filters.all}
                        onChange={handleFilterAllChange}
                    />
                </div>
                <div>
                    <FormCheck
                        type="checkbox"
                        label="ВПО"
                        className="btn"
                        checked={state.filters.vpo}
                        onChange={handleFilterVPOChange}
                    />
                </div>

                <input className="btn" type="text" value={state.filters.age} onChange={handleAgeChange} />
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
                                        Тип: {item["Тип"]}
                                    </Card.Text>
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