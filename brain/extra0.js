const brain = require('brain.js');
const RSI = require('technicalindicators').RSI

var price = 128
var buyRSI = 30
var inputRSI = {
    values : [102.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
    period : 14
  };
var resultRSI = RSI.calculate(inputRSI) 


for(var i = 0; i<resultRSI.length; i++){
    console.log(resultRSI[i])

    const net = new brain.NeuralNetwork({
        //leakyReluAlpha: 0.01,
        //learningRate: 0.01,
        /*
        log: state => {
            console.log(state)
        }
    */
    });
        net.train([
            { input: resultRSI[i], output: [1] }
        ]); 
        const output = net.run([80]);
    console.log(output)
}

/*
    console.log(resultRSI)

const net = new brain.NeuralNetwork({
    //leakyReluAlpha: 0.01,
    //learningRate: 0.01,
    log: state => {
        console.log(state)
    }

});
    net.train([
        { input: resultRSI[0], output: [1] },
        { input: resultRSI[1], output: [1] },
        { input: resultRSI[2], output: [1] },
        { input: resultRSI[3], output: [1] },
        { input: resultRSI[4], output: [1] },
        { input: resultRSI[5], output: [1] },
        { input: resultRSI[6], output: [1] },
        { input: resultRSI[7], output: [1] }
    ]); 
    const output = net.run([80]);
console.log(output)
*/


