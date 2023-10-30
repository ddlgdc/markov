const fs = require('fs');
const fetch = require('node-fetch');
const MarkovMachine = require('./markov');
const { resolve } = require('path');
const { rejects } = require('assert');

function generateText(input){
    return new Promise(async (resolve, reject) => {
        try {
            let text;

            if(input.startsWith('http')){
                const res = await fetch(input);
                if(!res.ok){
                    throw new Error(`Failed to fetch URL: ${response.status} - ${response.statusText}`);
                }
                text = await res.text();
            }
            else {
                text.fs.readFileSync(input, 'utf-8');
            }
            const mm = new MarkovMachine(text);
            const generateText = mm.makeText(100);
            resolve(generateText);
        }
        catch (error) {
            reject(error);
        }
    });
}

if (process.argv.length !== 4) {
    console.error('Usage: node makeText.js [file/url] [source]');
    process.exit(1);
}

const sourceType = process.argv[2];
const source = process.argv[3];

generateText(source)
    .then((generateText) => {
        console.log(`... generated text from ${sourceType} '${source}' ...`);
        console.log(generateText);
    })
    .catch((error) => {
        console.error('Error', error.message);
        process.exit(1);
    });