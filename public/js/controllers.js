import { encoder, decoder } from "./models.js"
import { updateTextEl as updateTextEl } from "./view.js"

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

const encoderFileSelector = document.getElementById("encoderDropbox");
encoderFileSelector.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let contents;
    reader.addEventListener("load", (e) => {
        contents = e.target.result;
        encoder.setInput(contents);
    });
    reader.readAsText(file);
});

const decoderFileSelector = document.getElementById("decoderDropbox");
decoderFileSelector.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let contents;
    reader.addEventListener("load", (e) => {
        contents = e.target.result;
        decoder.setInput(contents);
    });
    reader.readAsText(file);
});


export default {}

