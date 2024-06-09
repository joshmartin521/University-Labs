var nums = [0,1,2,3,3,5]
var nums2 = [1,2,3,4,8,8]
function increase(myNumber1, shelfID, num)
{
    document.getElementById(myNumber1).innerText = parseInt(document.getElementById(myNumber1).innerText) + 1;
    if(parseInt(document.getElementById(myNumber1).innerText) >=nums[num])
    {
        document.getElementById(myNumber1).style.backgroundColor = 'green';
    }
        if(parseInt(document.getElementById(myNumber1).innerText) <nums[num])
    {
        document.getElementById(myNumber1).style.backgroundColor = 'red';
    }
    if(parseInt(document.getElementById(myNumber1).innerText) >=nums2[num])
    {
        document.getElementById(myNumber1).style.backgroundColor = 'red';
    }
    updateShelfHeight(shelfID);
}

function decrease(myNumber1, shelfID, num)
{
    if(parseInt(document.getElementById(myNumber1).innerText)>0){
    document.getElementById(myNumber1).innerText = parseInt(document.getElementById(myNumber1).innerText) - 1;
    if(parseInt(document.getElementById(myNumber1).innerText) >=nums[num])
    {
        document.getElementById(myNumber1).style.backgroundColor = 'green';
    }
        if(parseInt(document.getElementById(myNumber1).innerText) <nums[num])
    {
        document.getElementById(myNumber1).style.backgroundColor = 'red';
    }
    if(parseInt(document.getElementById(myNumber1).innerText) >= nums2[num])
    {
        document.getElementById(myNumber1).style.backgroundColor = 'red';
    }
    updateShelfHeightDown(shelfID);
}
}

var shelfHeights = {
    shelf1: 100,
    shelf2: 80,
    shelf3: 80,
    shelf4: 80,
    shelf5: 80,
    shelf6: 80
};

function updateShelfHeight(shelfId) {
    var shelf = document.getElementById(shelfId);
    var currentIndex = parseInt(shelfId.slice(-1));

    shelfHeights[shelfId] += 5;
    updateBorder(shelf, shelfHeights[shelfId]);

    var n = 10;

    for (var i = currentIndex + 1; i <= 6; i++) {
        var currentShelfId = 'shelf' + i;
        var currentShelf = document.getElementById(currentShelfId);
        updateBorderWidth(currentShelf, n);
    }
}

function updateShelfHeightDown(shelfId) {
    var shelf = document.getElementById(shelfId);

    shelfHeights[shelfId] -= 5;
    updateBorder(shelf, shelfHeights[shelfId]);

    var n = -10;

    var currentIndex = parseInt(shelfId.slice(-1));
    for (var i = currentIndex + 1; i <= 6; i++) {
        var currentShelfId = 'shelf' + i;
        var currentShelf = document.getElementById(currentShelfId);
        updateBorderWidth(currentShelf, n);
    }
}
        
function updateBorder(shelf, height) {
    var style = window.getComputedStyle(shelf);
    var bottom = style.borderBottom.split(" ");
    var remainingStyles1 = bottom.slice(1).join(" ");
    var left = style.borderLeft.split(" ");
    var remainingStyles2 = left.slice(1).join(" ");
    var right = style.borderRight.split(" ");
    var remainingStyles3 = right.slice(1).join(" ");
    shelf.style.borderBottom = height + "px " + remainingStyles1;
    shelf.style.borderLeft = height + "px " + remainingStyles2;
    shelf.style.borderRight = height + "px " + remainingStyles3;
}

function updateBorderWidth(shelf, n) {
    var style = window.getComputedStyle(shelf);
    var curWidth = parseInt(style.width);
    shelf.style.width = curWidth + n +"px";
}

function change(one, two)
{
    one.style.backgroundColor = 'orange';
    two.style.backgroundColor = 'grey';
    
    if(one.id == "adult")
    {
        nums = [0,1,2,3,3,5]
        nums2 = [1,2,3,4,8,8]
    }
    if(one.id == "child")
    {
        nums = [0,0,2,5,3,5];
        nums2 = [1,2,3,6,6,8];  
    }
}