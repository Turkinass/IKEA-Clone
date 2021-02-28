const itemsContainer = document.querySelector('#items-container');

let itemsNum = 1;

//retreving query
var currentUrl = new URL(window.location.href);
var q = currentUrl.searchParams.get("q");
document.getElementById("pagetitle").innerHTML = q +" - Search - IKEA";
document.getElementById("query").innerHTML = q;


// getting data
db.collection('items').where("tags", "array-contains", q).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderItem(doc);
        itemsNum++;
    });
});

// create element & render item
function renderItem(doc){
    let item = document.createElement('div');
    item.setAttribute("id", "item");
    itemsContainer.appendChild(item);

    let itemImgDiv = document.createElement('div');
    itemImgDiv.setAttribute("id", "item-img-div");
    item.appendChild(itemImgDiv);

    let aTag = document.createElement('a');
    aTag.setAttribute("href", "itempage.html?q="+doc.id);
    itemImgDiv.appendChild(aTag);

    let itemImg = document.createElement('img');
    itemImg.setAttribute("id", "item-img");
    itemImg.setAttribute("onmouseover", "this.src='"+ doc.data().img2 + "'");
    itemImg.setAttribute("onmouseout", "this.src='"+ doc.data().img1 + "'");
    itemImg.setAttribute("src", doc.data().img1);
    aTag.appendChild(itemImg);


    let itemData = document.createElement('div');
    itemData.setAttribute("id", "item-data");
    item.appendChild(itemData);

    let itemName = document.createElement('a');
    itemName.setAttribute("href", "itempage.html?q="+doc.id);
    itemName.setAttribute("id", "item-name");
    itemName.textContent = doc.data().name;
    itemData.appendChild(itemName);

    let itemDesc = document.createElement('p');
    itemDesc.setAttribute("id", "item-desc");
    itemDesc.textContent = doc.data().desc;
    itemData.appendChild(itemDesc);

    let itemCurrency = document.createElement('p');
    itemCurrency.setAttribute("id", "item-currency");
    itemCurrency.textContent = "SR";
    itemData.appendChild(itemCurrency);

    let itemPrice = document.createElement('p');
    itemPrice.setAttribute("id", "item-price");
    itemPrice.textContent = doc.data().price;
    itemData.appendChild(itemPrice);

    let variationText = document.createElement('p');
    variationText.setAttribute("id", "morevariants-text");
    if(doc.data().variant1 != ""){
        variationText.textContent = "More variants";
    }  
    itemData.appendChild(variationText);

    let aTag1 = document.createElement('a');
    aTag1.setAttribute("href", "itempage.html?q="+doc.id);
    itemData.appendChild(aTag1);

    let variationImg1 = document.createElement('img');
    if(doc.data().variant1 != ""){
        variationImg1.setAttribute("id", "variation-img");
    }    
    variationImg1.setAttribute("src", doc.data().variant1);
    aTag1.appendChild(variationImg1);

    let aTag2 = document.createElement('a');
    aTag2.setAttribute("href", "itempage.html?q="+doc.id);
    itemData.appendChild(aTag2);

    let variationImg2 = document.createElement('img');
    if(doc.data().variant2 != ""){
        variationImg2.setAttribute("id", "variation-img");
    }    
    variationImg2.setAttribute("src", doc.data().variant2);
    aTag2.appendChild(variationImg2);

    let aTag3 = document.createElement('a');
    aTag3.setAttribute("href", "itempage.html?q="+doc.id);
    itemData.appendChild(aTag3);

    let variationImg3 = document.createElement('img');
    if(doc.data().variant3 != ""){
        variationImg3.setAttribute("id", "variation-img");
    }
    variationImg3.setAttribute("src", doc.data().variant3);
    aTag3.appendChild(variationImg3);
}

// display items number
document.getElementById("itemsNumber").innerHTML = itemsNum;
