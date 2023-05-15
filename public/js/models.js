import {default as controllers} from "./controllers.js"
import {updateTextEl as updateTextEl, updateStatsEl as updateStatsEl} from "./view.js"

export default {}

class StringWorker {
    constructor(inputTextEl, outputTextEl, statsEl) {
        this.input = "";
        this.output = "";
        this.title = "encodedText";
        this.sizeDiff = 0;
        this.inputTextEl = inputTextEl;
        this.outputTextEl = outputTextEl;
        this.statsEl = statsEl;
    }

    getInput() { return this.input; }
    setInput(newVal) { 
        this.input = "";
        this.input += newVal;
        updateTextEl(this.inputTextEl, newVal);
    }
    getOutput() { return this.output; }
    setOutput(newVal) { this.output = newVal; }
    getTitle() { return this.title; }
    setTitle(newVal) { this.title = newVal; }
    clearOutput() { this.output = ""; }
    getSizeDiff() { return this.sizeDiff; }

    prepareDownload() {
        const contents = document.getElementById(this.outputTextEl).value;

        const downloadable = new Blob(
            [contents], 
            {type: "text/plain"}
        );

        let link = document.createElement("a");
        link.download = `${this.title}-encoded.txt`;
        link.href = window.URL.createObjectURL(downloadable);
        link.click();
    }
}

class Encoder extends StringWorker {
    constructor(inputTextEl, outputTextEl, statsEl) {
        super(inputTextEl, outputTextEl, statsEl);
    }

    updateSizeDiff() { 
        this.sizeDiff = (100 * (this.output.length * 1.0 / this.input.length) - 100).toFixed(2);
        if(!this.sizeDiff) this.sizeDiff = 0;
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
                    this.output += curr[0]; // Characters were not replaced by token, so only output the first one
                    buffer += curr[0];
                }

            } else {
                this.output += curr;
                buffer += curr;
            }
            curr = "";
            i++;
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

    updateSizeDiff() { 
        this.sizeDiff = (100 * (this.output.length * 1.0 / this.input.length) - 100).toFixed(2);
        if(!this.sizeDiff) this.sizeDiff = 0;
    }

    decode() {
        this.clearOutput();

        let curr = "";
        const tokenlikeRgx = /^(\{(\d*|\d+,?|\d+,\d*|\d+,\d+\}))$/;
        const trueTokenRgx = /\{\d+,\d+\}$/;
        
        let i=0;
        while(i < this.input.length) { // Iterate over entire input
            curr = this.input[i];

            if(tokenlikeRgx.test(curr)) { // Current string could be a token
                let done = false;
                let tempI = i; // Look at characters following i;
                while(!done) {
                    tempI++;
                    if(tempI < this.input.length) { // Have not reached end of input
                        curr += this.input[tempI];
                        if(!tokenlikeRgx.test(curr)) { // Current string is no longer tokenlike
                            tempI--;
                            curr = curr.slice(0,-1);
                            done = true;
                        }
                    } else { // Have reached end of input
                        tempI--;
                        done = true;
                    }
                }

                if(trueTokenRgx.test(curr)) { // Current string is a token
                    let backsteps = parseInt(curr.substring(1, curr.indexOf(',')));
                    let tokenLen = parseInt(curr.substring(curr.indexOf(',')+1, curr.indexOf('}')));
                    this.output += this.output.substring(this.output.length-backsteps, this.output.length-backsteps+tokenLen);
                    i = tempI;

                } else {
                    this.output += curr[0]; // Characters were not part of a token, so only output the first one
                } 

            } else { // Current string is not a token
                this.output += curr;
            }

            curr = "";
            i++;
        }

        this.updateSizeDiff();
        updateTextEl(this.outputTextEl, this.output);
        updateStatsEl(this.statsEl, this.sizeDiff);
    }
}

export const encoder = new Encoder("encoderInput", "encoderOutput", "encoderStats");
export const decoder = new Decoder("decoderInput", "decoderOutput", "decoderStats");
