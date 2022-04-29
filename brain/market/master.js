const brain = require('brain.js');
const RSI = require('technicalindicators').RSI
const fs = require('fs')
const axios = require('axios').default;

async function load(){

const coinex = await axios.get('https://angelhtml.github.io/json/coinex.json')
const highValues = coinex.data.data.map(e=> e[3]*1    )
const lowValues = coinex.data.data.map(e=> e[4]*1    )
const clossingValues = coinex.data.data.map(e=> e[2]*1    )
const volumeValues = coinex.data.data.map(e=> e[5]*1    )
const openingValues = coinex.data.data.map(e=> e[1]*1    )

var a = []
/*
const clossingValue = [200,170,140,120,100,95,90, 90,89,70,130,120,115,110     ,200,170,140,120,100,95,90, 90,89,70,130,120,115,110]
const highValue = [220,200,170,150,140,120,140, 140,120,140,150,170,200,220]
const lowValue = [170,110,100,110,90,80,75, 75,80,90,110,100,110,170]
const volumeValue = [800,650,440,330,240,230,230, 230,230,240,330,440,650,800]
const openingValue = [180,150,120,112,120,85,80, 80,85,120,112,120,150,180]
*/
var inputRSI = {
    values : clossingValues,
    //values : [95,100,102.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
    period : 2
};
var resultRSI = RSI.calculate(inputRSI) 
for(var Rsi = 0; Rsi<resultRSI.length-1; ++Rsi){
  var rsi1 = resultRSI[resultRSI.length - Rsi]
  a.push(rsi1)
}

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

let rawdata = fs.readFileSync("./realtraning1day.json");
let student = JSON.parse(rawdata);

net.fromJSON(student)
const output = net.run([a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]]);
console.log(output)
console.log([a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]])
}

function run(){
    load()
}
try{
    run()
}catch(err){
    console.log(err)
}
