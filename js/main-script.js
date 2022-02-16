const  finalWarningElement =  document.getElementById("calculation-warning");
const  expensesElement =  document.getElementById("total-expenses");
const  primaryBalanceElement =  document.getElementById("primary-balance");
const  savingElement =  document.getElementById("seving-amount");
const  netBalanceElement =  document.getElementById("net-balance");
const  overSavingElement =  document.getElementById("over-save-warning");

function dataValidation(warningElement, warningMsg) {
    const userWarning = document.getElementById(warningElement);
    userWarning.innerText = warningMsg;
    userWarning.style.display = "block"
} 

function getUserData(field) {
    const inputElement = field + "-field";
    const warningElement = field + "-warning"; 
    const userData = parseFloat(document.getElementById(inputElement).value); 
    document.getElementById(warningElement).style.display = "none";

    if(isNaN(userData)){
        dataValidation(warningElement, "Please insert number only.")
        return false;
    } else if(userData < 0){
        dataValidation(warningElement, "Number should not smaller then 0.")
        return false;
    } else{
        return userData;
    }
}

document.getElementById("cost-calculate").addEventListener("click", function(){
    const income = getUserData("income");
    const foodCost = getUserData("food");
    const rentCost = getUserData("rent");
    const clothesCost = getUserData("clothes");
    const dataValidation =  calculationValidation(income, foodCost, rentCost, clothesCost);
    const totalCost = foodCost + rentCost + clothesCost;
    finalWarningElement.style.display = "none";
   
     if(dataValidation && income > totalCost){
        expensesElement.innerText = totalCost;
        primaryBalanceElement.innerText = income - totalCost
     } else {
        finalWarningElement.innerText = "Income shode more then cost.";
        finalWarningElement.style.display = "block";
     }  
})

function calculationValidation() {
    let validation = true;
    for(const data of arguments){
       if (!data) {
        finalWarningElement.style.display = "block";
        validation = false
       }
    }
    return validation;
}

document.getElementById("saving-calculator").addEventListener("click", function(){
    const income = getUserData("income");
    const saveing = getUserData("save");
    const primaryBalance = parseFloat(primaryBalanceElement.innerText);
    const  sevingAmount = (saveing / 100) * income;
    const netBalance = primaryBalance - sevingAmount;
    overSavingElement.style.display = "none";
    if( primaryBalance > sevingAmount && saveing > 0){
       savingElement.innerText = sevingAmount;
       netBalanceElement.innerText = netBalance;
    } else{
        overSavingElement.style.display = "block";
        savingElement.innerText = 0;
        netBalanceElement.innerText = 0;
    }
})