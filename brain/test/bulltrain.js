const brain = require('brain.js');
const RSI = require('technicalindicators').RSI
const fs = require('fs')
const axios = require('axios').default;
const csv = require('csv-parser');
var ROC = require('technicalindicators').ROC

//function
async function bulltrain(){

    var bullish_closing = []
    var bearish_closing = []
    const coinex = await axios.get('https://angelhtml.github.io/json/coinex.json')

    for(var c = coinex.data.length - 2; c>0; --c){
      const bullish_close = (coinex.data[c-1].__parsed_extra[5]*1 - coinex.data[c].__parsed_extra[5]*1)
      const bullish_close_percent = ((bullish_close) - (bullish_close*0.6/100))
      
      const bullish_test = (bullish_close > 0 && bullish_close_percent > 0)
      const bearish_test = (bullish_close <= 0 && bullish_close_percent < 0)

      if(bullish_test == true){
        bullish_closing.push(bullish_close)
      }else if (bearish_test == true){
        bearish_closing.push(bullish_close)
      }
      //clossingValues.push(bull_close)
    }

    var resultRSIbull = RSI.calculate({values: bullish_closing, period:14}) 
    var resultRSIbear = RSI.calculate({values: bearish_closing, period:14}) 
    var bull_rsi = resultRSIbull.slice(Math.max(resultRSIbull.length - 600, 0))
    var bear_rsi = resultRSIbear.slice(Math.max(resultRSIbear.length - 600, 0))

    var resultRocbull = ROC.calculate({period : 12, values : bullish_closing})
    var resultRocbear = ROC.calculate({period : 12, values : bearish_closing})
    var bull_roc = resultRocbull.slice(Math.max(resultRocbull.length - 600, 0))
    var bear_roc = resultRocbear.slice(Math.max(resultRocbear.length - 600, 0))


    const config = {
        binaryThresh: 0.5,
        // array of ints for the sizes of the hidden layers in the network
        activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
        leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
        iterations: 100000000,
        //hiddenLayers: [100],
        learningRate: 0.001,
        log: state => { console.log(state) }
    };
      
    const net = new brain.NeuralNetwork(config);

    
    net.train([
        { input: bull_rsi,bull_roc, output: [1]},
        { input: bear_rsi,bear_roc, output: [0]}
    ]); 

    console.log(bull_rsi,bull_roc)
    console.log(bear_rsi,bear_roc)

    console.log(bullish_closing.length,bull_roc.length)
    console.log(bearish_closing.length,bear_roc.length)
    //console.log(output)
    //console.log(coinex.data[coinex.data.length - 2])

    const json = net.toJSON();
const jsonString = JSON.stringify(json);

fs.writeFile(

  './xlm2018_2022_1day.json',

  jsonString,

  function (err) {
      
      if (err) {
          console.error('Crap happens');
      }
      if (!err) {
          console.error('done');
      }
  }
);
}

function run() {
    bulltrain()
  }
  try{
    run()
  }
  catch(err){
    console.log(err)
  }