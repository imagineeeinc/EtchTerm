const input = document.getElementById("input")
const box = document.getElementById("typebox")
var full = false
var elem = document.documentElement;
var data
var mypkgs = []
document.getElementById("os").innerHTML = LargeOS()
setInterval(function() {
    input.style.width = cijs("sizeInW") - 30 + "px"
}, 1)
input.focus()
//console.log(localStorage.getItem("pkgs"))
if(check_web_storage_support() == true) {
  if (localStorage.getItem("pkgs") != "" || localStorage.getItem("pkgs") != null || localStorage.getItem("pkgs") != undefined) {
    mypkgs = ["none.js"]
    localStorage.setItem("pkgs", JSON.stringify(mypkgs));
  }
}
getpkg()
window.onclick = function(event) {
  document.getElementById("movecur").style.left = event.clientX + "px"
  document.getElementById("movecur").style.top = event.clientY + "px"
  document.getElementById("movecur").style.display = "block"
}
//window.open('https://youtube.com', '_blank');
//for wikipedia: https://wikipedia.org/w/index.php?search=
//for youtube: https://www.youtube.com/results?search_query=
// for google: https://www.google.com/search?q=
input.onkeypress = function(KeyboardEvent) {
    //console.log(KeyboardEvent.keyCode)
    if (KeyboardEvent.keyCode == 13) {
        check()
    }
}
//term checker function
function check() {
    data = input.value
    console.log(data)
    if (data == "etter"){
        br()
        br()
        println('<span>EtchTerm [Version 1.5.0]</span><br><span><a href="https://imagineeeinc.github.io/">Imagineee</a>(c) 2020 Imagineee. All rights reserved.</span>')
        br()
        println("Type 'commands' for commands<br>")
    } else if (data == "full") {
        Full()
    } else if (data == "commands" || data == "command") {
        br()
        println("commands: <ul><li>'etter': to get the info on terminal</li><li>'commands': to get the commands avaliable</li><li>'full' = to make the terminal full screen</li><li>'youtube ' + 'your search query or word': will search on youtube for you query or word</li><li>'google' or 'search' + 'query word or search word': will search the query word or search word on google</li><li>Type JavaScript Commands and it will be exucuted</li><li>epkg('#you package url'): for installing a package or a library and save it forever</li><li>'goto' + 'webstie address': open the link in a new tab</li><li>'rolldice': rolls a dice bettwen 1 and 6</li><li>'wiki' + 'search query r search term': will open the search query or search term on wikipedia</li><li>addlib('#you libary url'): to install a package or libary once and one this session is closed it will be discarded</li><li>showpkgs(): to display your packages</li><li>epkgremove('#the package you want to remove url'): removes the packge you want to remove url</li></ul><br>")
    } else if (data.substr(0, 8) == "youtube ") {
        window.open('https://www.youtube.com/results?search_query=' + data.substr(8, data.length), '_blank')
        br()
        println("Opened: '" + data.substr(8, data.length) + "' in YouTube")
    } else if (data.substr(0, 7) == "google " || data.substr(0, 7) == "search ") {
      window.open('https://www.google.com/search?q=' + data.substr(7, data.length), '_blank')
      br()
      println("Searched: '" + data.substr(7, data.length) + "' in Google")
    } else if (data.substr(0, 5) == "wiki ") {
      window.open('https://wikipedia.org/w/index.php?search=' + data.substr(5, data.length), '_blank')
      br()
      println("Searched: '" + data.substr(5, data.length) + "' in Wikipedia")
    } else if (data.substr(0, 5) == "goto ") {
      window.open('https://' + data.substr(5, data.length), '_blank')
      br()
      println("opened: '" + data.substr(5, data.length) + "' in a new tab")
    } else if(data.substr(0, 5) == "echo ") {
        println(data.substr(5, data.length))
    } else if (data == "rolldice") {
        br()
        println(Math.round(Math.floor(Math.random(1) * 6)))
    } else if (data == "docs") {
      window.open("https://imagineeeinc.github.io/EtchTerm/Docs/", '_blank')
      br()
      println("opened docs in a new tab")
    } else if (data == "runsnipet") {
      println("<span id='code'><textarea></textarea></span>")
    } else {
      /*var F=new Function (data);
      input.value = ""
      return F();*/
      try {
      var F=new Function (data);
      input.value = ""
      return F();
     } 
     catch (err) {
       br()
       println(err.message)
      /*var type = document.createElement("br")
      box.appendChild(type)
      type = document.createElement("span")
      type.innerHTML = '<span>("' + data + '") err => error: "' + data + '" is not defined command?</span><br><br>'
      box.appendChild(type);*/
     }
    }
    input.value = ""
}
//full screen function
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
//package manager function
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
//add library function
function addlib(addurl) {

  var type = document.createElement("script")
  type.setAttribute("src", addurl)
  document.getElementById("head").appendChild(type)
}
//local storage functions
function check_web_storage_support() {
  if(typeof(Storage) !== "undefined") {
      return(true);
  }
  else {
      return(false);
  }
}
//show packages
function showpkgs() {
  br()
  println("your packages:")
  println(localStorage.getItem("pkgs"))
}
//removepkg
function epkgremove(removeurl) {
    var pkgsn = JSON.parse(localStorage.getItem("pkgs"));
    if (pkgsn.indexOf(removeurl) ==-1) {
      println("You don't have '" + removeurl + "' installed")
    }
    var r = pkgsn.indexOf(removeurl)
    console.log(r)
    pkgsn.splice(0, 1)
    if (pkgsn.indexOf(removeurl) > -1) {
      pkgsn.pop()
    }
    document.querySelector('script[src="' + removeurl +'"]').remove()
    if(check_web_storage_support() == true) {
    localStorage.setItem("pkgs", JSON.stringify(pkgsn));
    }
    println("removed '" + removeurl + "'")
}
//get packages functions
function getpkg() {
  if(check_web_storage_support() == true) {
    if (localStorage.getItem("pkgs") != "" || localStorage.getItem("pkgs") != null || localStorage.getItem("pkgs") != undefined) {
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
//save package functions
function save() {
  if(check_web_storage_support() == true) {
          localStorage.setItem("pkgs", mypkgs);//JSON.stringify(mypkgs); JSON.parse(localStorage.getItem("pkgs"))
  }
}

//print api functions
function println(insert) {

  var type = document.createElement("div")

  type.innerHTML = insert
  box.appendChild(type)
}
function print(insert) {

  var type = document.createElement("span")
  type.innerHTML = insert
  box.appendChild(type)
}
function warn(insert) {

  var type = document.createElement("div")
  type.innerHTML = '<span style="color: yellow;">' + insert + "</span>"
  box.appendChild(type)
}
function error(insert) {
  var type = document.createElement("div")
  type.innerHTML = '<span style="color: red;">' + insert + "</span>"
  box.appendChild(type)
}
function good(insert) {
  var type = document.createElement("div")
  type.innerHTML = '<span style="color: springgreen;">' + insert + "</span>"
  box.appendChild(type)
}
function br() {
  var type = document.createElement("br")
  box.appendChild(type)
}