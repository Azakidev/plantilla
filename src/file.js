import { imageElement } from "./drag.js";
import html2canvas from "html2canvas";

document.getElementById("open").addEventListener("click", openFile);
document.getElementById("save").addEventListener("click", saveFile);

const fileName = document.getElementById("fileName");
const div = document.getElementById('imageClamp');

function openFile() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = ".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
    input.click();
    input.onchange = e => {
        var file = e.target.files[0];
        fileName.innerText = file.name;

        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            imageElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function saveFile() {
    const name = fileName.innerText;
    fileName.innerText = "Saving...";

    html2canvas(div, {
        backgroundColor: "#191919"
    }).then(function (canvas) {
        canvas.toBlob(blob => navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]))
        fileName.innerText = name
    });
}

