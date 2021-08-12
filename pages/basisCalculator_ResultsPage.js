
// selektorių pavadinimai pakankamai aiškūs, todėl papildomų konstantų nekūriau (bet galima :) )

exports.basisCalculator_ResultsPage = class basisCalculator_ResultsPage{
    constructor (page){
        this.page = page;
    }
    // bus daugiau :)
/*
    function getRandomNumberInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}*/

async selectBuild(buildNo){
    await this.page.selectOption('#selectBuild', buildNo); // build selection
}

async selectOperator(operatorId){
    await this.page.selectOption('#selectOperationDropdown', String(operatorId)); // operation selection
}

async enterNumber1(number){
    await this.page.fill('#number1Field', String(number));
}

async enterNumber2(number){
    await this.page.fill('#number2Field', String(number));
}

async ClearAnswer(){
    await this.page.click("#clearButton");
}

async clickCalculateButton(){
    await this.page.click("#calculateButton");
}

async getCalculationResult(){
    return await this.page.inputValue('#numberAnswerField');
}

async checkInteger(checkOnOff){
    switch(checkOnOff){
        case 'ON':
            await this.page.check('#integerSelect');
            break;
        case 'OFF':
            await this.page.uncheck('#integerSelect');
            break;
    }
}



}