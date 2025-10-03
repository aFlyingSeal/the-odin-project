const display = document.querySelector(".display");

let first = "";
let second = "";
let operator = null;

function handleNumber(char){
    if (operator === null){
        if (char === "." && first.indexOf(char) !== -1){
            console.log("PASS");
        }
        else if (char === "." && first === ""){
            first = "0.";
        }
        else{
            first += char;
        }
        display.value = first;
    }
    else{
        if (char === "." && second.indexOf(char) !== -1){
            console.log("PASS");
        }
        else if (char === "." && second === ""){
            second = "0.";
        }
        else{
            second += char;
        }
        display.value = second;
    }
}

function handleOperator(op){
    if (first === ""){
        return;
    }
    else if (operator !== null && second !== ""){
        let result = calculate();
        first = result;
        second = "";
    }
    operator = op;
    display.value = operator;
}

function calculate(){
    if (first !== "" && second !== "" && operator !== null){
        let firstNum = parseFloat(first);
        let secondNum = parseFloat(second);
        let result;
        switch (operator){
            case "+":
                result = firstNum + secondNum;
                break;
            case "-":
                result = firstNum - secondNum;
                break;
            case "*":
                result = firstNum * secondNum;
                break;
            case "/":
                if (secondNum == 0){
                    display.value = "Cannot divide by zero!";
                    return;
                }
                result = firstNum / secondNum;
        }
        display.value = String(result);
        first = result;
        second = "";
        operator = null;
        return result;
    }
    return;
}