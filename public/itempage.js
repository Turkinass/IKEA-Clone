
//retreving query
var currentUrl = new URL(window.location.href);
var q = currentUrl.searchParams.get("q");
document.getElementById("pagetitle").innerHTML = q +" - IKEA";

// placing item info into the page
var docRef = db.collection("items").doc(q);
docRef.get().then(function(doc) {
    document.getElementById("itemnam").innerHTML = doc.data().name;
    document.getElementById("itemdsc").innerHTML = doc.data().desc;
    document.getElementById("search-result-price").innerHTML = doc.data().price;
    document.getElementById("item-photo1").setAttribute("src", doc.data().img1);
    document.getElementById("item-photo2").setAttribute("src", doc.data().img2);

});



