const input = document.getElementById("input")
const box = document.getElementById("typebox")
var full = false
var elem = document.documentElement;
var data
var mypkgs = []
document.getElementById("os").innerHTML = LargeOS()
setInterval(function() {
    input.style.width = cijs("sizeInW") - 25 + "px"
}, 1)
input.focus()
getpkg()
window.onclick = function(event) {
  document.getElementById("movecur").style.left = event.clientX + "px"
  document.getElementById("movecur").style.top = event.clientY + "px"
  document.getElementById("movecur").style.display = "block"
  input.focus()
}
//window.open('https://youtube.com', '_blank');
//for wikipedia: https://wikipedia.org/w/index.php?search=
//for youtube: https://www.youtube.com/results?search_query=
// for google: https://www.google.com/search?q=
document.onkeypress = function(KeyboardEvent) {
    //console.log(KeyboardEvent.keyCode)
    if (KeyboardEvent.keyCode == 13) {
        check()
    }
}
function check() {
    data = input.value
    console.log(data)
    if (data == "etter"){
        var type = document.createElement("br")
        box.appendChild(type)
        box.appendChild(type)
        type = document.createElement("span")
        type.innerHTML = '<span>EtchTerm [Version 1.0.0]</span><br><span><a href="https://imagineeeinc.github.io/">Imagineee</a>(c) 2020 Imagineee. All rights reserved.</span><br><br>'
        box.appendChild(type);
        var type = document.createElement("span")
        type.innerHTML = "Type 'commands' for commands<br>"
        box.appendChild(type);
    } else if (data == "full") {
        Full()
    } else if (data == "commands" || data == "command") {
        var type = document.createElement("span")
        type.innerHTML = "commands: <ul><li>'etter': to get the info on terminal</li><li>'commands': to get the commands avaliable</li><li>'full' = to make the terminal full screen</li><li>'youtube ' + 'your search query or word': will search on youtube for you query or word</li><li>'google' or 'search' + 'query word or search word': will search the query word or search word on google</li><li>Type JavaScript Commands and it will be exucuted</li><li>epkg('#you package url'): for installing a package</li><li>'goto' + 'webstie address': open the link in a new tab</li><li>'rolldice': rolls a dice bettwen 1 and 6</li><li>'wiki' + 'search query r search term': will open the search query or search term on wikipedia</li></ul><br>"
        box.appendChild(type);
    } else if (data.substr(0, 8) == "youtube ") {
        window.open('https://www.youtube.com/results?search_query=' + data.substr(8, data.length), '_blank')
        var type = document.createElement("span")
        type.innerHTML = "Opened: '" + data.substr(8, data.length) + "' in YouTube<br>"
        box.appendChild(type);
    } else if (data.substr(0, 7) == "google " || data.substr(0, 7) == "search ") {
      window.open('https://www.google.com/search?q=' + data.substr(7, data.length), '_blank')
      var type = document.createElement("span")
      type.innerHTML = "Searched: '" + data.substr(7, data.length) + "' in Google<br>"
      box.appendChild(type);
    } else if (data.substr(0, 5) == "wiki ") {
      window.open('https://wikipedia.org/w/index.php?search=' + data.substr(5, data.length), '_blank')
      var type = document.createElement("span")
      type.innerHTML = "Searched: '" + data.substr(5, data.length) + "' in Wikipedia<br>"
      box.appendChild(type);
    } else if (data.substr(0, 5) == "goto ") {
      window.open('https://' + data.substr(5, data.length), '_blank')
      var type = document.createElement("span")
      type.innerHTML = "opened: '" + data.substr(5, data.length) + "' in a new tab<br>"
      box.appendChild(type);
    } else if(data.substr(0, 5) == "echo ") {
        var type = document.createElement("span")
        type.innerHTML = data.substr(5, data.length) + "<br>"
        box.appendChild(type);
    } else if (data == "rolldice") {
      var type = document.createElement("span")
        type.innerHTML = Math.round(Math.floor(Math.random(1) * 6)) + "<br>"
        box.appendChild(type);
    } else {
      /*var F=new Function (data);
      input.value = ""
      return F();*/
      try {
      var F=new Function (data);
      input.value = ""
      return F();
     } 
     catch (e) {
      var type = document.createElement("br")
      box.appendChild(type)
      type = document.createElement("span")
      type.innerHTML = '<span>("' + data + '") err => error: "' + data + '" is not defined command?</span><br><br>'
      box.appendChild(type);
     }
    }
    input.value = ""
}
function Full() {
    if (full == false) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
          }
          full = true
          var type = document.createElement("span")
          type.innerHTML = "Made full screen<br>"
          box.appendChild(type)
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
          }
          full = false
          var type = document.createElement("span")
          type.innerHTML = "Removed full screen<br>"
          box.appendChild(type)
        }
}
function epkg(addurl) {
  var type = document.createElement("script")
  type.setAttribute("src", addurl)
  document.getElementById("body").appendChild(type)
  var type = document.createElement("span")
  type.innerHTML = "Added '" + addurl + "' pkg"
  box.appendChild(type)
  mypkgs.push(addurl)
  if(check_web_storage_support() == true) {
    localStorage.setItem("pkgs", JSON.stringify(mypkgs));
}
}

function check_web_storage_support() {
  if(typeof(Storage) !== "undefined") {
      return(true);
  }
  else {
      return(false);
  }
}

function getpkg() {
  if(check_web_storage_support() == true) {
    if (localStorage.getItem("pkgs") != undefined) {
      mypkgs = JSON.parse(localStorage.getItem("pkgs"));
      var i = 0
      while (i < mypkgs.length) {
        var type = document.createElement("script")
        type.setAttribute("src", mypkgs[i])
        document.getElementById("body").appendChild(type)
        i++;
      }
    }
  }
}

function save() {
  if(check_web_storage_support() == true) {
          localStorage.setItem("pkgs", mypkgs);//JSON.stringify(mypkgs); JSON.parse(localStorage.getItem("pkgs"))
  }
}
