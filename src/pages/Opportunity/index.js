import React, { useContext } from "react";
import { useParams } from "react-router";
import { Context } from "../../store";

const Opportunity = () => {
    const [state] = useContext(Context);
    const { id } = useParams();

    const currentOpportunityList = state.data.filter( item => item["ID"] === id );
    let currentOpportunity = null;
    if (currentOpportunityList.length > 0)
        currentOpportunity = currentOpportunityList[0];

    return (
        <div>
            <div> Можливість №{ id } </div>
            {
                currentOpportunity ?
                    <div>
                        <div> Назва організації: {currentOpportunity["Назва організації"]} </div>
                        <div> Короткий опис: {currentOpportunity["Короткий опис"]} </div>
                        <div> Опис: {currentOpportunity["Опис"]} </div>
                        <div> Луганська область: {currentOpportunity["Луганська область"]} </div>
                        <div> Донецька область: {currentOpportunity["Донецька область"]} </div>
                        <div> УТОЧНЕННЯ: {currentOpportunity["УТОЧНЕННЯ"]} </div>
                        <div> Стать: {currentOpportunity["Стать"]} </div>
                        <div> Ти: {currentOpportunity["Ти"]} </div>
                        <div> Вік {currentOpportunity["Вік"]} </div>
                        <div> Всі: {currentOpportunity["Всі"]} </div>
                        <div> Люди з інвалідністю: {currentOpportunity["Люди з інвалідністю"]} </div>
                        <div> ВПО: {currentOpportunity["ВПО"]} </div>
                        <div> СЖО: {currentOpportunity["СЖО"]} </div>
                        <div> Сироти: {currentOpportunity["Сироти"]} </div>
                    </div>
                    :
                    <div> Невідома можливість </div>
            }
        </div>
    );
};

export default Opportunity;