let currentDraggedItem;

const tierInput = document.getElementById("tier");

const itemContainers = document.getElementsByClassName("item-container");

const tierLists = document.querySelectorAll(".tier-list");

const submitBtn = document.getElementById("submit");

const imageFrom = document.getElementById("image-form");

for (const itemContainer of itemContainers) {
  setUpItemContainerForDrag(itemContainer);
}

function setUpItemContainerForDrag(itemContainer) {
  itemContainer.addEventListener("dragstart", (event) => {
    console.log("hello bro");
    // console.log(event);
    // console.log(itemContainer);
    // console.log(event.target);
    // console.log(event.target.parentNode);
    currentDraggedItem = event.target.parentNode;

    itemContainer.addEventListener("dblclick", (event) => {
      parentNode = event.target.parentNode;
      const nonTierSection = document.getElementById("non-tier-section");
      nonTierSection.appendChild(parentNode);
    });
  });
}

// tierLists.forEach(setUpDropZoneInTierList);

imageFrom.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("form submitted");

  const imageitemInput = document.getElementById("image-item");

  if (imageitemInput.value === "") {
    alert("Please enter a valid image url");
    return;
  }

  const imageUrl = imageitemInput.value;

  createTierListItem(imageUrl);
  imageitemInput.value = "";
});

submitBtn.addEventListener("click", (event) => {
  console.log("button is clicked");
  event.preventDefault(); //stops the default behaviour of the event

  //To get acess of the element on which this event was fired

  // console.log(event);

  const target = event.target;
  console.log(target);

  if (tierInput.value === "") {
    alert("Plese enter a tier name");
    return;
  }

  createTierList(tierInput.value);
  tierInput.value = "";
});

function createTierList(tierListName) {
  const newTierList = document.createElement("div");
  newTierList.classList.add("tier-list");

  const heading = document.createElement("div"); //Try to randomly assign color to this heading
  heading.classList.add("heading");

  const textContainer = document.createElement("div");
  textContainer.textContent = tierListName;

  heading.appendChild(textContainer);

  const newTierListItems = document.createElement("div");
  newTierListItems.classList.add("tier-list-items");

  newTierList.appendChild(heading);
  newTierList.appendChild(newTierListItems);

  setUpDropZoneInTierListItem(newTierListItems);

  const TierSection = document.getElementById("tier-list-section");
  TierSection.appendChild(newTierList);
}

function createTierListItem(imageUrl) {
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("item-container");
  imageDiv.setAttribute("draggable", "true");
  setUpItemContainerForDrag(imageDiv);

  const img = document.createElement("img");
  img.src = imageUrl;

  imageDiv.appendChild(img);

  const nonTierSection = document.getElementById("non-tier-section");

  nonTierSection.appendChild(imageDiv);
}

function setUpDropZoneInTierListItem(tierListItem) {
  // console.log("set-Up-Zone", tierListItem);
  tierListItem.addEventListener("drop", (event) => {
    event.preventDefault(); //stops the default behaviour of the event which is to not allow drop
  });

  tierListItem.addEventListener("dragover", function (event) {
    // console.log(event.target);
    // event.target.appendChild(currentDraggedItem);

    console.log("event coming up", event);
    console.log("Vitra Image ayo hai hosiyar");

    if (this !== currentDraggedItem.parentNode) {
      this.appendChild(currentDraggedItem);
    }
  });
}
