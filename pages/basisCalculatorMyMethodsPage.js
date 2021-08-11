
// selektorių pavadinimai pakankamai aiškūs, todėl papildomų konstantų nekūriau (bet galima :) )

exports.basisCalculatorMyMethodsPage = class basisCalculatorMyMethodsPage{
    constructor (page){
        this.page = page;
    }
    // bus daugiau :)
/*
async  getRandomNumberInt(min, max){
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
    //await this.page.click("#calculateButton");
    return await this.page.inputValue('#numberAnswerField');
}

async getCalculationResultClickButton(){
    await this.page.click("#calculateButton");
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

async isIntegerResultSelected(){
    return await this.page.inputValue('#integerSelect');
}

async getErrorMesage(){
    return await this.page.textContent("#errorMsgField");
}

async enterNumber(fieldNum,value){
    await this.page.fill(`#number${fieldNum}Field`, String(value));
}


}