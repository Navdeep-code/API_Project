window.onload = pageload;

//Pageload function
function pageload() {
  var keyword = document.getElementsByClassName("keyword");
  //Formating headings
  for (i = 0; i < keyword.length; i++) {
    var heading = keyword[i].innerHTML;
    let newkeyword = heading.charAt(0).toUpperCase() + heading.slice(1);
    keyword[i].innerHTML = newkeyword;

  }
}