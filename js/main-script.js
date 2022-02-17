// Get all global element 
const  finalWarningElement =  document.getElementById("calculation-warning");
const  expensesElement =  document.getElementById("total-expenses");
const  primaryBalanceElement =  document.getElementById("primary-balance");
const  savingElement =  document.getElementById("seving-amount");
const  netBalanceElement =  document.getElementById("net-balance");
const  overSavingElement =  document.getElementById("over-save-warning");

// Global data validation for fields 
function dataValidation(warningElement, warningMsg) {
    const userWarning = document.getElementById(warningElement);
    userWarning.innerText = warningMsg;
    userWarning.style.display = "block";
} 

// Recive fields data 
function getUserData(field) {
    const inputElement = field + "-field";
    const warningElement = field + "-warning"; 
    const userData = parseFloat(document.getElementById(inputElement).value); 

    // Hide error message at another submit
    document.getElementById(warningElement).style.display = "none";

    // Check user input data and return data
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
    debugger;
    //Receive user data from input fields
    const income = getUserData("income");
    const foodCost = getUserData("food");
    const rentCost = getUserData("rent");
    const clothesCost = getUserData("clothes");

    //Checking all user data again and get single return after validation 
    const dataValidation =  calculationValidation(income, foodCost, rentCost, clothesCost);
    
    //Calculate cost 
    const totalCost = foodCost + rentCost + clothesCost;

    // Hide error message at another submit
    finalWarningElement.style.display = "none";
    
    // Display Income and total cost into webpage after validation   
     if(dataValidation && income > totalCost){
        expensesElement.innerText = totalCost;
        primaryBalanceElement.innerText = income - totalCost;
     } else {
        finalWarningElement.innerText = "Income should be more than expenses.";
        finalWarningElement.style.display = "block";
        expensesElement.innerText = 0;
        primaryBalanceElement.innerText = 0;
     }  
})

//Checking all user data again and get single return for calculation
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

// Saving calculation 
document.getElementById("saving-calculator").addEventListener("click", function(){
     //Receive user data from input fields
    const income = getUserData("income");
    const saveing = getUserData("save");

    //Receive balance from previous calculation 
    const primaryBalance = parseFloat(primaryBalanceElement.innerText);

    // Get seving amount from percent 
    const  sevingAmount = (saveing / 100) * income;
   
    // Get net balance
    const netBalance = primaryBalance - sevingAmount;

    // Hide error message at another submit
    overSavingElement.style.display = "none";

    // Display Seving and net balance into webpage after validation 
    if( primaryBalance > sevingAmount && saveing > 0){
       savingElement.innerText = sevingAmount;
       netBalanceElement.innerText = netBalance;
    } else{
        overSavingElement.style.display = "block";
        savingElement.innerText = 0;
        netBalanceElement.innerText = 0;
    }
})