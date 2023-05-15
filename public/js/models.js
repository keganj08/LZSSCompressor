import {default as controllers} from "./controllers.js"
import {updateTextEl as updateTextEl, updateStatsEl as updateStatsEl} from "./view.js"

export default {}

class StringWorker {
    constructor(inputTextEl, outputTextEl, statsEl) {
        this.input = "";
        this.output = "";
        this.sizeDiff = 0;
        this.inputTextEl = inputTextEl;
        this.outputTextEl = outputTextEl;
        this.statsEl = statsEl;
    }

    getInput() { return this.input; }
    setInput(newVal) { 
        this.input = newVal;
        updateTextEl(this.inputTextEl, newVal);
    }
    getOutput() { return this.output; }
    setOutput(newVal) { this.output = newVal; }
    updateSizeDiff() { 
        this.sizeDiff = (Math.round((1.0 - (this.output.length * 1.0 / this.input.length)) * 100) / 100); 
        if(!this.sizeDiff) this.sizeDiff = 0;
    }
    getSizeDiff() { return this.sizeDiff; }
    clearOutput() { this.output = ""; }
}

class Encoder extends StringWorker {
    constructor(inputTextEl, outputTextEl, statsEl) {
        super(inputTextEl, outputTextEl, statsEl);
    }

    encode() {
        this.clearOutput();

        let curr = "";
        let buffer = "";

        let i = 0;
        while(i < this.input.length) { // Iterate over entire input
            curr = this.input[i];
            
            if(buffer.indexOf(curr) > -1) { // Current string is in buffer

                let done = false;
                let tempI = i; // Look at characters following i
                while(!done) {
                    tempI++;
                    if(tempI < this.input.length) { // Have not reached end of input
                        curr += this.input[tempI];
                        if(buffer.indexOf(curr) == -1) { // Current string is no longer in buffer
                            tempI--;
                            curr = curr.slice(0,-1);
                            done = true;
                        }
                    } else { // Have reached end of input
                        tempI--;
                        done = true;
                    }
                }

                let backsteps = buffer.length - buffer.indexOf(curr);
                let tokenLen = curr.length;
                let newToken = `{${backsteps},${tokenLen}}`;

                if(newToken.length < curr.length) { // Token will decrease overall length
                    this.output += newToken; 
                    buffer += curr;
                    i = tempI; // Skip past all characters in token; Do not check them again
                } else { // Token will not decrease overall length
                    this.output += curr[0];
                    buffer += curr[0];
                }

                curr = "";
                i++;

            } else {
                this.output += curr;
                buffer += curr;
                curr = "";
                i++;
            }
        }
        this.updateSizeDiff();
        updateTextEl(this.outputTextEl, this.output);
        updateStatsEl(this.statsEl, this.sizeDiff);
    }
}

class Decoder extends StringWorker {
    constructor(inputTextEl, outputTextEl, statsEl) {
        super(inputTextEl, outputTextEl, statsEl);
    }

    decode() {
        alert("This hasn't been built yet. Hang tight!");
        updateTextEl(this.targetEl, this.output);
    }
}

export const encoder = new Encoder("encoderInput", "encoderOutput", "encoderStats");
export const decoder = new Decoder("decoderInput", "decoderOutput", "decoderStats");
