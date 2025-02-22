import { imageElement } from "./drag.js";
import html2canvas from "html2canvas";

document.getElementById("open").addEventListener("click", openFile);
document.getElementById("save").addEventListener("click", saveFile);

const fileName = document.getElementById("fileName");
const placeholder = document.getElementById('placeholder');
const imageClamp = document.getElementById('imageClamp');

function openFile() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = ".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
    input.click();
    input.onchange = e => {
        var file = e.target.files[0];
        open(file);
    }
}

const dropOverlay = document.getElementById("dropOver");
document.body.addEventListener("dragenter", () => { dropOverlay.classList.remove('hidden') });
dropOverlay.addEventListener("dragleave", () => { dropOverlay.classList.add('hidden') });

dropOverlay.addEventListener("dragover", e => e.preventDefault());
dropOverlay.addEventListener("drop", dropFile);

function dropFile(e) {
    dropOverlay.classList.add('hidden');
    e.preventDefault();

    var file = e.dataTransfer.items[0].getAsFile();
    open(file);
}

function open(file) {
    // Update fileName
    fileName.innerText = file.name;
    //Unhide and hide stuff if it's the first file opened
    if (imageClamp.classList.contains('hidden')) {
        imageClamp.classList.remove('hidden');
        placeholder.classList.add('hidden');
    }
    //Return if the user picked no files
    if (!file) {
        return;
    }
    //Read the file
    var reader = new FileReader();
    reader.onload = function (e) {
        imageElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function saveFile() {
    var name;
    name !== "Saving..." ? name = fileName.innerText : {};
    fileName.innerText = "Saving...";

    html2canvas(imageClamp, { backgroundColor: "#191919", })
        .then(function (canvas) {
            canvas.toBlob(blob => navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]))
            fileName.innerText = name
        });
}
