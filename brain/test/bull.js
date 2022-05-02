const brain = require('brain.js');
const RSI = require('technicalindicators').RSI
const fs = require('fs')
const axios = require('axios').default;
const csv = require('csv-parser');
var ROC = require('technicalindicators').ROC

async function bull(){

const coinex = await axios.get('https://api.coinex.com/v1/market/kline?market=XLMUSDT&limit=1000&type=1day')
//const coinex = await axios.get('https://angelhtml.github.io/json/coinexunday.json')
const highValues = coinex.data.data.map(e=> e[3]*1    )
const lowValues = coinex.data.data.map(e=> e[4]*1    )
const clossingValues = coinex.data.data.map(e=> e[2]*1    )
const volumeValues = coinex.data.data.map(e=> e[5]*1    )
const openingValues = coinex.data.data.map(e=> e[1]*1    )

var a = []
var inputRSI = {
    values : clossingValues,
    period : 2
};
var resultRSI = RSI.calculate(inputRSI) 
for(var Rsi = 0; Rsi<resultRSI.length-1; ++Rsi){
  var rsi1 = resultRSI[resultRSI.length - Rsi]
  a.push(rsi1)
}

var resultRoc = ROC.calculate({period : 12, values : clossingValues})
var bull_roc = resultRoc.slice(Math.max(resultRoc.length - 600, 0))

const config = {
    binaryThresh: 0.5,
    // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
    iterations: 1000000,
    //hiddenLayers: [1],
    learningRate: 0.001,
    log: state => { console.log(state) }
};
  
const net = new brain.NeuralNetwork(config);

let rawdata = fs.readFileSync("./xlm2018_2022_1day.json");
let student = JSON.parse(rawdata);
var data_rsi = a.slice(396,996)
net.fromJSON(student)
const output = net.run(data_rsi,bull_roc);
console.log(output)
console.log(a[996])
console.log(bull_roc[bull_roc.length-1])
}



function run() {
    bull()
  }
  try{
    run()
  }
  catch(err){
    console.log(err)
  }