const brain = require('brain.js');

const trainingData = [
    "weeknd is a best singer i saw ever",
    "i ask you what`s best abel song? you say ...",
    "who`s doja cat i saw her with abel"
]

const network = new brain.recurrent.LSTM();

network.train(trainingData, {
    iterations: 100,
    leakyReluAlpha: 0.0001,
    activation: 'sigmoid',
    log: state => {
        console.log(state)
    }
})

const queryString = 'weeknd';
console.log(queryString + network.run(queryString))