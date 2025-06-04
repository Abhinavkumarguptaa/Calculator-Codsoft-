const display = document.getElementById('display');
let current = '0';
let resetNext = false;

function updateDisplay() {
    display.textContent = current;
}

function append(char) {
    if (resetNext) {
        current = (/[0-9.]/.test(char)) ? char : current;
        resetNext = false;
    } else {
        if (current === '0' && char !== '.') {
            current = char;
        } else {
            // Prevent multiple decimals in a number
            if (char === '.' && /\.\d*$/.test(current.split(/[\+\-\*\/%]/).pop())) return;
            current += char;
        }
    }
    updateDisplay();
}

function clearDisplay() {
    current = '0';
    updateDisplay();
}

function deleteLast() {
    if (current.length > 1) {
        current = current.slice(0, -1);
    } else {
        current = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        let expression = current.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        // Handle percent
        expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
        let result = eval(expression);
        if (result === Infinity || isNaN(result)) throw Error();
        current = result.toString();
        resetNext = true;
        updateDisplay();
    } catch {
        current = 'Error';
        resetNext = true;
        updateDisplay();
    }
}
