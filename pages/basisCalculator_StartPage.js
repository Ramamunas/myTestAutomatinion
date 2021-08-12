exports.basisCalculator_StartPage = class basisCalculator_StartPage{
    constructor (page){
        this.page = page;
    }
    async goto(){
    await this.page.goto('https://testsheepnz.github.io/BasicCalculator')
    }

}