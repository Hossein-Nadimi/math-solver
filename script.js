const expressionInput = document.querySelector('#expression')
const resultElement = document.querySelector('#results')
const formElement = document.querySelector('#equation-form')

// Regexp for matching the operators
const paranthesisRegex = /\((?<equation>[^\(\)]*)\)/
const exponentRegex = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/
const multiplyDivideRegex = /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/
const addSubtractRegex = /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/

// Show results
formElement.addEventListener('submit', e => {
    e.preventDefault()

    const result = parse(expressionInput.value)
    resultElement.innerText = result
})

//checking the different operators in expression and calculating the result of each
//then replacing the result in expression 
function parse(expression) {
    if(expression.match(paranthesisRegex)) {
        const subExpression = expression.match(paranthesisRegex).groups.equation
        const result = parse(subExpression)
        const newExpression = expression.replace(paranthesisRegex, result)
        return parse(newExpression)
    } else if(expression.match(exponentRegex)) {
        const result = handleMath(equation.match(exponentRegex).groups)
        const newEquation = equation.replace(exponentRegex, result)
        return parse(newEquation)
    } else if(expression.match(multiplyDivideRegex)) {
        const result = calculateMath(expression.match(multiplyDivideRegex).groups)
        const newExpression = expression.replace(multiplyDivideRegex, result)
        return parse(newExpression)             
    } else if(expression.match(addSubtractRegex)) {
        const result = calculateMath(expression.match(addSubtractRegex).groups)
        const newExpression = expression.replace(addSubtractRegex, result)
        return parse(newExpression) 
    } else {
        return parseFloat(expression)
    }
}

//Calculating the result based on operators
function calculateMath({ operand1, operation, operand2 }) {
    const firstNumber = parseFloat(operand1)
    const secondNumber = parseFloat(operand2)

    switch(operation) {
        case '^': 
            return firstNumber ** secondNumber
        case '*':
            return firstNumber * secondNumber
        case '/':
            return firstNumber / secondNumber
        case '+':
            return firstNumber + secondNumber
        case '-':
            return firstNumber - secondNumber
    }
}
