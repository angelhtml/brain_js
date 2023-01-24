const brain = require('brain.js');

const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.0001 
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

/*
net.train([
    {input: [0, 0], output: [0]},
    {input: [0, 1], output: [1]},
    {input: [1, 0], output: [1]},
    {input: [1, 1], output: [0]}
]);
*/

for(var i = 0; i<100; i++){
    net.train([
        {input: [0, i], output: [1]},
        {input: [i, 0], output: [0]}
    ])
    console.log(`count:${i}\n${net.run([0,50])}`)
}

    var x = "000"
    if(output>0.9){
        x = "one"
    }else if (output<0.9){
        x = "zero"
    }
