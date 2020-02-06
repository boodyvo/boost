import React, {useContext} from "react";
import { useParams } from "react-router";
import {Context} from "../../store";

const Opportunity = () => {
    const [state] = useContext(Context);
    const { id } = useParams();

    const currentOpportunityList = state.data.filter( item => item["ID"] === id );
    let currentOpportunity = null;
    if (currentOpportunityList.length > 0)
        currentOpportunity = currentOpportunityList[0];

    return (
        <div>
            <div> Opportunity page: { id } </div>
            {
                currentOpportunity ?
                    <div>
                        <div> Title: {currentOpportunity["Назва організації"]} </div>
                        <div> Short description {currentOpportunity["Короткий опис"]} </div>
                        <div> Short description {currentOpportunity["Короткий опис"]} </div>
                        <div> Description {currentOpportunity["Опис"]} </div>
                        <div> Luhanska {currentOpportunity["Луганська область"]} </div>
                        <div> Donetska {currentOpportunity["Донецька область"]} </div>
                        <div> Additionals {currentOpportunity["УТОЧНЕННЯ"]} </div>
                        <div> Gender {currentOpportunity["Стать"]} </div>
                        <div> You are {currentOpportunity["Ти"]} </div>
                        <div> Вік {currentOpportunity["Вік"]} </div>
                        <div> All {currentOpportunity["Всі"]} </div>
                        <div> Disabled {currentOpportunity["Люди з інвалідністю"]} </div>
                        <div> ВПО {currentOpportunity["ВПО"]} </div>
                        <div> СЖО {currentOpportunity["СЖО"]} </div>
                        <div> Orphans {currentOpportunity["Сироти"]} </div>
                    </div>
                    :
                    <div> Unknown opportunity </div>
            }
        </div>
    );
};

export default Opportunity;