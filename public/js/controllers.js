import { encoder, decoder } from "./models.js"
import { updateTextEl as updateTextEl } from "./view.js"


function htmlEscape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function unescape(output) {
    let newOutput = output    
                    .replace(/&lt;/g , "<")	 
                    .replace(/&gt;/g , ">")  
                    .replace(/&quot;/g , "\"")
                    .replace(/&#39;/g , "\'") 
                    .replace(/&amp;/g , "&");
    return newOutput;
}

const encoderInput = document.getElementById("encoderInput");
document.getElementById("encoderSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    encoder.setInput(encoderInput.value);
    encoder.encode();
});

const decoderInput = document.getElementById("decoderInput");
document.getElementById("decoderSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    decoder.setInput(decoderInput.value);
    decoder.decode();
});

document.getElementById("encoderDropbox").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let contents;
    reader.addEventListener("load", (e) => {
        contents = e.target.result;
        encoder.setInput(contents);
        encoder.setTitle(file.name.replace(/(\.\w+)$/, ""));
    });
    reader.readAsText(file);
});

document.getElementById("decoderDropbox").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let contents;
    reader.addEventListener("load", (e) => {
        contents = e.target.result;
        decoder.setInput(contents);
        decoder.setTitle(file.name.replace(/(\.\w+)$/, ""));
    });
    reader.readAsText(file);
});

document.getElementById("encoderDownloadBtn").addEventListener("click", (e) => {
    encoder.prepareDownload();
});

document.getElementById("decoderDownloadBtn").addEventListener("click", (e) => {
    decoder.prepareDownload();
});

export default {}

