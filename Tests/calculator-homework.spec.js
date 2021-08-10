const { test, expect } = require('@playwright/test');

//=================================================================================

const {basisCalculator_StartPage} = require('../pages/basisCalculator_StartPage')
const {basisCalculator_ResultsPage} = require('../pages/basisCalculator_ResultsPage')

//=================================================================================

test.describe('Calculator test suite', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        startPage = new basisCalculator_StartPage(page);
        //resultsPage = new basisCalculator_ResultsPage(page);
    });
    test.beforeEach(async () => {
        await startPage.goto();
    });

//=================================================================================


//================================================================
//T5-Mathematic operations check
//================================================================
let builds = ['0','1','2','3','4','5','6','7','8','9'];
let operations = ['0','1','2','3','4']; // add/subtract/divide/multiply/concatenate
const operations_list = ['add','subtract','divide','multiply','concatenate']; // add/subtract/divide/multiply/concatenate
//operations = ['0']; // single value for single test
//builds = ['0']; // single value for single test
builds.forEach(build_no => {
    operations.forEach(operator_num => {
    test(`T5 Mathematic operations check. '${operations_list[parseInt(operator_num)]}' operation is testing. Calculator build No:${build_no} under test. `, async () => {
   
        await page.selectOption('#selectBuild', build_no); // build selection
        await page.selectOption('#selectOperationDropdown', String(operator_num)); // operation selection
        await page.selectOption('#selectOperationDropdown', operator_num); // operation selection

        const min = -999999999;
        const max = 9999999999;
    
        const number_1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const number_2 = Math.floor(Math.random() * (max - min + 1)) + min;

        //const number_1 = Math.random() * (max - min + 1) + min;
        //const number_2 = Math.random() * (max - min + 1) + min;
       
        console.log('Build No:',build_no);
        console.log('Operation: ',operations_list[operator_num]);
        console.log('Num1',number_1);
        console.log('Num2',number_2);

        //await page.check('#integerSelect');
        //await page.uncheck('#integerSelect');

        const isField_1_isVisible = await page.isVisible("#number1Field");
        const isField_2_isVisible = await page.isVisible("#number2Field");

        expect(isField_1_isVisible && isField_2_isVisible).toBe(true);

        await page.fill('#number1Field', String(number_1));
        await page.fill('#number2Field', String(number_2));
    
        let expResult_strexpResult_num;

        switch (operator_num){
            case '0': // add
                expResult_str = String(number_1+number_2);
                break;
            case '1': // subtract
                expResult_str = String(number_1-number_2);
                break;
            case '2': // divide
                expResult_str = String(number_1*number_2);
                break;
            case '3': // multiply
                expResult_str = String(number_1/number_2);
                break;
            case '4': // concatenate
                expResult_str = String(number_1)+String(number_2);
                break;
        }

        await page.click('#calculateButton');

        const calcResult = await page.inputValue('#numberAnswerField');

        console.log('  expected: ',expResult_str);
        console.log('calculated: ',calcResult);

        expect(calcResult).toEqual(expResult_str);

    });

}); //end of operations.forEach

}); //end of builds.forEach
//end of test


//================================================================
//T1-Check if all objects are visible
//================================================================
//builds = ['0']; // single value for single test
builds.forEach(build_no => {
    test(`T1-Is all objects are visible. Calculator build No:${build_no} under test.`, async () => {

        await page.selectOption('#selectBuild', build_no); // build selection

        const isField_1_isVisible = await page.isVisible("#number1Field");
        const isField_2_isVisible = await page.isVisible("#number2Field");
        const isSelectOperationVisible = await page.isVisible("#selectOperationDropdown");
        const isAnswerFieldVisible = await page.isVisible("#numberAnswerField");
        const isCalculateButtonVisible =await page.isVisible('#calculateButton');
        const isClearButtonVisible =await page.isVisible('#clearButton');

        expect(isField_1_isVisible && isField_2_isVisible && isCalculateButtonVisible && isClearButtonVisible && isSelectOperationVisible && isAnswerFieldVisible).toBe(true);

    });
});//end of test(builds)


//================================================================
//T2-Check if NumberX field accepts symbols
//================================================================
const number = [1, 2]; // Number1 | Number2
//builds = ['0']; // single value for single test
builds.forEach(build_no => {
    number.forEach(num => {
        test(`T2-Check if Number${num} field accepts symbols. Calculator build No:${build_no} under test.`, async () => {

            await page.selectOption('#selectBuild', build_no); // build selection
        
            const isNumberFieldisVisible = await page.isVisible(`#number${num}Field`);
            let isErrorMesageVisible;
            if(isNumberFieldisVisible){
                await page.fill(`#number${num}Field`, 'symbol');
                const isCalculateButtonVisible =await page.isVisible('#calculateButton');
                if (isCalculateButtonVisible) await page.click('#calculateButton');
                else expect(isCalculateButtonVisible).toBe(true); // there is no 'Calculate' button
                isErrorMesageVisible = await page.isVisible("#errorMsgField");
                const errorMesage = await page.textContent("#errorMsgField");

                if (isErrorMesageVisible){
                    console.log(`Calculator build ${build_no} input field 'number${num}Field' doesn't accepts symbols`);
                    console.log('Error mesage: ',errorMesage);
                }
                    else console.log(`Calculator build ${build_no} input field 'number${num}Field' accepts symbols`);
            } else{
                console.log(`number${num}Field is invisible`);
                expect(isNumberFieldisVisible).toBe(true);
                } 
        expect(isErrorMesageVisible).toBe(true); // true - doesn't accepts symbols | false - accepts symbols

        });
    });//end of number
});//end of test(builds)


//================================================================
//T3-Check if 'Clear' button works
//================================================================
//builds = ['9']; // single value for single test
builds.forEach(build_no => {
    test(`T3-Check if 'Clear' button works. Calculator build No:${build_no} under test.`, async () => {

        await page.selectOption('#selectBuild', build_no); // build selection

        const number_1 = 3;
        const number_2 = 5;

        if (await page.isVisible("#number1Field"))
            await page.fill('#number1Field', String(number_1)); 

        if (await page.isVisible("#number2Field"))
            await page.fill('#number2Field', String(number_2));

        const isCalculateButtonVisible =await page.isVisible('#calculateButton');
        if (isCalculateButtonVisible) await page.click('#calculateButton');
        else expect(isCalculateButtonVisible).toBe(true); // there is no 'Calculate' button

        const calcResult = await page.inputValue('#numberAnswerField');
        //console.log('Answer: ',calcResult);
        await page.click("#clearButton");
        const calcResult_empty = await page.inputValue('#numberAnswerField');
        //console.log('Answer after clear: ',calcResult_empty);

        expect(calcResult_empty).toBe("");

    });
});//end of test(builds)


//================================================================
//T4-Check if 'Integers only' check box works
//================================================================
let Intcheck = ['0','1']; // 0 - 'Integers only' checkbox is unchecked | 1 - 'Integers only' checkbox is checked
//builds = ['7']; // single value for single test
//Intcheck = ['1']; // single value for single test
builds.forEach(build_no => {
    Intcheck.forEach(Intcheck_val => {
    test(`T4-Check if 'Integers only' check box works. Integers only = ${Intcheck_val}. Calculator build No:${build_no} under test.`, async () => {

        await page.selectOption('#selectBuild', build_no); // build selection
        
        const number_1 = 3.5;
        const number_2 = 5;
        const expResult_str = String(number_1+number_2);
        let expResult_str_int = String(Math.floor(number_1+number_2));
        let disableON = 0;
      
        if (await page.isDisabled('#integerSelect')){
            Intcheck_val = await page.inputValue('#integerSelect');
            console.log('Integer only checkbox is disabled. Default value: ',Intcheck_val);
            disableON = 1;}
        
        if (await page.isVisible("#number1Field"))
            await page.fill('#number1Field', String(number_1)); 

        if (await page.isVisible("#number2Field"))
            await page.fill('#number2Field', String(number_2));

        const isCalculateButtonVisible =await page.isVisible('#calculateButton');
        if (isCalculateButtonVisible) await page.click('#calculateButton');
        else expect(isCalculateButtonVisible).toBe(true); // there is no 'Calculate' button

        switch (Intcheck_val){
            case '0': {// 'Integers only' unchecked
                if (!disableON) await page.uncheck('#integerSelect');
                const calcResult = await page.inputValue('#numberAnswerField');
                console.log('Answer: ',calcResult);
                console.log('Expected: ',expResult_str);
                expect(calcResult).toBe(expResult_str);
                break;
            }

            case '1':{ // 'Integers only' checked
                if (!disableON) await page.check('#integerSelect');
                const calcResult = await page.inputValue('#numberAnswerField');
                expResult_str_int = String(parseInt(calcResult));
                console.log('Answer: ',calcResult);
                console.log('Expected: ',expResult_str_int);
                expect(calcResult).toBe(expResult_str_int);
                break;
            }
        } //end of swith 

    });
});//end of IntOnly
});//end of test(builds)



});//end of describe
