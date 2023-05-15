import {default as models} from "./models.js"
import {default as controllers} from "./controllers.js"

export default {}

export function updateTextEl(elId, newVal) {
    document.getElementById(elId).value = newVal;
}

export function updateStatsEl(elId, sizeDiff) {
    let msg;
    if(!sizeDiff) { 
        msg = "";
    } else if(sizeDiff < 0.0) {
        msg = `Reduced text by: ${Math.abs(sizeDiff)}%`;
    } else if(sizeDiff > 0.0) {
        msg = `Expanded text by: ${sizeDiff}%`;
    } else {
        msg = `Text size unchanged`;
    }
    document.getElementById(elId).innerHTML = msg;
}

export function displayErrorEl(elId, msg) {

}