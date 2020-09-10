setInterval(function() {
    if (cijs("sizeInW") > 679)
    document.getElementById("body").style.width = cijs("sizeInW") - 350 + "px"
}, 1)
document.getElementById("menu").onclick = function() {
    if (document.getElementById("index").className == "hmenu") {
        document.getElementById("index").className = "smenu";
    } else if (document.getElementById("index").className == "smenu") {
        document.getElementById("index").className = "hmenu";
    }
}