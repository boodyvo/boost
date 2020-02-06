import React, {useContext, useEffect} from "react";
import "./App.css";
import { Context } from "./store";
import Home from "./pages/Home";
import About from "./pages/About";
import Opportunity from "./pages/Opportunity";
import {Route, Switch, Link} from "react-router-dom";
import axios from "axios";

function App() {
    const [state, dispatch] = useContext(Context);

    useEffect( () => {
        console.log("Initialize load");
        const fetchData = async () => {
            const result = await axios(
                "https://v1.nocodeapi.com/boost/google_sheets/WufYxAImintsinXV?tabId=Database",
            );

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
            dispatch({
                type: "SET_DATA",
                payload: parsedData,
            });
            console.log("Fetched data");
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="App-header">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/opportunity/1231">Opportunity</Link>
                    </li>
                </ul>
            </div>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/opportunity/:id" component={Opportunity} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
