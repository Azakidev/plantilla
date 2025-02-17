import { imageElement } from "./drag.js";
import html2canvas from "html2canvas";

document.getElementById("open").addEventListener("click", openFile);
document.getElementById("save").addEventListener("click", saveFile);

function openFile() {
    var input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = e => {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            swapImage(contents);
        };
        reader.readAsDataURL(file);
    }
}

function swapImage(url) {
    imageElement.src = url;
}

function saveFile() {
    const div = document.getElementById('imageClamp');

    html2canvas(div).then( function (canvas) {
        canvas.toBlob(blob => navigator.clipboard.write([
            new ClipboardItem({'image/png': blob})
        ]))
    });
}

