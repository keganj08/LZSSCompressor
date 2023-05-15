import {default as models} from "./models.js"
import {default as controllers} from "./controllers.js"

export default {}

export function updateTextEl(elId, newVal) {
    document.getElementById(elId).value = newVal;
}

export function updateStatsEl(elId, sizeDiff) {
    if(!sizeDiff) { sizeDiff = 0; }
    document.getElementById(elId).innerHTML = `Reduced length by: ${sizeDiff * 100.0}%`;
    //document.getElementById(elId).style.visibility = "visible";
}