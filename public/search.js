var input = document.getElementById("myInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchbtn").click();
  }
});

function getInputValue() {
  var inputVal = document.getElementById("myInput").value;

  var resultsUrl = new URL(window.location.href);
  // resultsUrl.pathname = "public/searchpage.html";
  resultsUrl.pathname = "searchpage.html";
  resultsUrl.searchParams.set("q", inputVal);
  window.location.href = resultsUrl;
}
