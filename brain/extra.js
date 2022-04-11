const brain = require('brain.js');
const RSI = require('technicalindicators').RSI

var price = 128
var buyRSI = 30
var inputRSI = {
    values : [95,100,102.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
    period : 14
  };
var resultRSI = RSI.calculate(inputRSI) 
console.log(resultRSI)
var rsidata = resultRSI.slice(Math.max(resultRSI.length - 8, 0))
console.log(rsidata)

var x = 0;
var pricedata = inputRSI.values[inputRSI.values.length-1]
if(pricedata > price){
    x = 1
}console.log(x)

const net = new brain.NeuralNetwork({
    //leakyReluAlpha: 0.01,
    //learningRate: 0.01,
    inputSize: 8,
    inputRange: 8,
    log: state => {
        console.log(state)
    }

});
    net.train([
        { input: rsidata, output: [x] }
    ]); 

    const output = net.run([20,22,24,26,28,30,31,32]);
    const outputsell = net.run([80,82,84,86,88,90,91,92]);
console.log(output,outputsell)

/*
for(var i = 0; i<resultRSI.length; i++){
    console.log(resultRSI[i])

    var x = 0
    var rsidata = inputRSI.values[i]
    if(rsidata > price){
        x = 1
    }console.log(x)
    const net = new brain.NeuralNetwork({
        //leakyReluAlpha: 0.01,
        //learningRate: 0.01,
        log: state => {
            console.log(state)
        }
    });
        net.train([
            { input: resultRSI[i], output: [x] }
        ]); 
        const output = net.run([30]);
    console.log(output)
}
*/




