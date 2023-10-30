/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chain = {};

    for(let i = 0; i < this.words.length - 1; i++){
      const word = this.words[i];
      const nextWord = this.words[i + 1];

      if (!this.chain[word]){
        this.chain[word] = [];
      }
      this.chain[word].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const words = Object.keys(this.chain);
    let currWord = words[Math.floor(Math.random() * words.length)];
    let text = [];
    text.push(currWord);

    while (text.length < numWords) {
      const nextWords = this.chain[currWord];

      if(!nextWords || nextWords.length === 0) {
        break;
      }
      const randomIndex = Math.floor(Math.random() * nextWords.length);
      const nextWord = nextWords[randomIndex];

      text.push(nextWord);
      currWord = nextWord;
    }
    return text.join(' ');
  }
}

const text = 'the cat in the hat';
const mm = new MarkovMachine(text);
console.log(mm.makeText(50));

