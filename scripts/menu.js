let data = {};
let allItems = [];
let selection1 = [];
let selection2 = [];
let isDiner1 = true;
let isDiner2 = false;
const util = new UtilHelper(); /* eslint no-undef: 0 */ // --> OFF

const enums = Object.freeze({
  /* eslint-disable-line */
  course: {
    starters: "starters",
    mains: "mains",
    desserts: "desserts"
  },
  elementID: {
    checkbox: "checkbox-"
  }
});

// Enter code here
readData();

/* =========================================================== */
/* event handlers                                              */
/* =========================================================== */

function onSelectDiner1() {
  isDiner1 = true;
  isDiner2 = false;
  resetCheckboxStates(selection1);
}

function onSelectDiner2() {
  isDiner1 = false;
  isDiner2 = true;
  resetCheckboxStates(selection2);
}

function onFinaliseOrder() {
  // Combine selections
  let itemsSelected = [];
  itemsSelected = selection1;
  itemsSelected = [itemsSelected, selection2];
  const isOkDiner1 = orderValidation(itemsSelected, selection1, "Diner 1");
  if (isOkDiner1) {
    const isOkDiner2 = orderValidation(itemsSelected, selection2, "Diner 2");
    if (isOkDiner2) {
      writeFinalBill();
    }
  }
}

function onReset() {
  // Clear global variables
  selection1 = [];
  selection2 = [];
  isDiner1 = true;
  isDiner2 = false;

  // Reset UI features
  document.getElementById("billDiner1").textContent = "Bill for Diner 1: N/A";
  document.getElementById("billDiner2").textContent = "Bill for Diner 2: N/A";
  document.getElementById("list1").textContent = "Nothing selected yet";
  document.getElementById("list2").textContent = "Nothing selected yet";
  let bill = document.getElementById("billTotal"); /* eslint-disable-line */
  bill.textContent = "Total bill: N/A";
  bill.setAttribute("style", "color: #77787E");

  // Set to false all previous selections
  $("input[type=checkbox]").each(function() /* eslint-disable-line */ {
    this.checked = false;
  });
}

/* =========================================================== */
/* internal methods                                            */
/* =========================================================== */

function readData() {
  util.loadJSON("mockdata/menu-data.json", response => {
    init();

    // Load data
    data = JSON.parse(response);

    createFlatList();

    const { starters, mains, desserts } = data;
    buildCourse(starters, enums.course.starters);
    buildCourse(mains, enums.course.mains);
    buildCourse(desserts, enums.course.desserts);
  });
}

function init() {
  // Add eventListeners to UI buttons
  let button = document.getElementById("diner1");
  button.addEventListener("click", onSelectDiner1, false);

  button = document.getElementById("diner2");
  button.addEventListener("click", onSelectDiner2, false);

  button = document.getElementById("finaliseOrder");
  button.addEventListener("click", onFinaliseOrder, false);

  button = document.getElementById("reset");
  button.addEventListener("click", onReset, false);

  // Add jQueryUI icon to reset button
  $("#reset")
    .button({
      icons: {
        primary: "ui-icon-arrowrefresh-1-e"
      }
    })
    .click(function(event) /* eslint-disable-line */ {
      event.preventDefault();
    });
  // Dynamically set the width of the rest button to match that of the button above
  const buttonWidth = $("#finaliseOrder").outerWidth();
  $("#reset").css({
    width: buttonWidth
  });
}

function createFlatList() {
  allItems = [];
  allItems = data.starters;
  allItems = allItems.concat(data.mains);
  allItems = allItems.concat(data.desserts);
}

function buildCourse(course, id) {
  for (let i = 0, l = course.length; i < l; ++i) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const description = document.createTextNode(course[i].name);

    label.className += "para1Bold";
    checkbox.type = "checkbox";
    checkbox.id = enums.elementID.checkbox + course[i].name;
    checkbox.value = course[i].name;
    checkbox.className += "checkbox";
    // $("input").checkboxradio(); // Problem wih clearing the jQueryUI checkboxes

    label.appendChild(checkbox);
    label.appendChild(description);

    // Checkbox eventListener
    checkbox.addEventListener("change", event => {
      if (isDiner1 && !isDiner2) {
        if (event.srcElement.checked) {
          selection1.push(course[i].name);
        } else {
          const index = selection1.indexOf(course[i].name);
          if (index !== -1) {
            selection1.splice(index, 1);
          }
        }
        setUIComponents(selection1, "list1");
        showCostSoFarBill1(util.calculateDinerBill(allItems, selection1));
      } else if (!isDiner1 && isDiner2) {
        if (event.srcElement.checked) {
          selection2.push(course[i].name);
        } else {
          const index = selection2.indexOf(course[i].name);
          if (index !== -1) {
            selection2.splice(index, 1);
          }
        }
        setUIComponents(selection2, "list2");
        showCostSoFarBill2(util.calculateDinerBill(allItems, selection2));
      }
    });

    const priceParagraph = document.createElement("p");
    priceParagraph.textContent = `£ ${util.intToFloat(course[i].price)}`;
    priceParagraph.className += "priceParagraph";

    const courseDiv = document.getElementById(id);
    courseDiv.appendChild(label);
    courseDiv.appendChild(priceParagraph);
    courseDiv.appendChild(document.createElement("br"));
  }
}

function setUIComponents(selection, listID) {
  const list = document.getElementById(listID);
  const menuList = util.splitArrayIntoString(selection);
  list.textContent = menuList;
}

function showCostSoFarBill1(total) {
  const bill = document.getElementById("billDiner1");
  bill.textContent = `Bill for Diner1: £ ${util.intToFloat(total)}.`;
}

function showCostSoFarBill2(total) {
  const bill = document.getElementById("billDiner2");
  bill.textContent = `Bill for Diner1: £ ${util.intToFloat(total)}.`;
}

function resetCheckboxStates(selection) {
  // First set to false all previous selections
  $("input[type=checkbox]").each(function() /* eslint-disable-line */ {
    this.checked = false;
  });
  // Now select the ones pertaining the diner in question
  for (let i = 0, l = selection.length; i < l; ++i) {
    document.getElementById(
      enums.elementID.checkbox + selection[i]
    ).checked = true;
  }
}

function showSelectionErrorMessage(selection, diner) {
  // Show error dialog in the event of no selections made
  $(function() /* eslint-disable-line */ {
    const title = `Add selections for ${diner}`;
    let message = "";
    if (selection.length < 1) {
      message = `No courses were selected for ${diner}. You need to add at least two courses for two people, one of which needs to be a main course.`;
      util.createDialog(title, message);
    }
    message = `Only one course was selected for ${diner}. You need to add at least two courses for two people, one of which needs to be a main course.`;
    util.createDialog(title, message);
  });
}

function orderValidation(itemsSelected, selection, diner) {
  let isOk = true;
  // Dialog error messages for insufficent selection size
  if (selection.length < 2) {
    showSelectionErrorMessage(selection, diner);
    return (isOk = false);
  } else if (selection.length >= 2) {
    // Show error dialog in the event of no mains selections made
    let countMains = 0;
    for (let i = 0, l = selection.length; i < l; ++i) {
      if (
        _.find(data.mains, entry => {
          return entry.name === selection[i];
        }) !== undefined
      ) {
        countMains++;
      }
    }
    if (countMains < 1) {
      showMainsIncorrectErrorMessage(diner);
    }
    // This means we are ok to go - just need to make two more checks ...
    if (util.countOccurrences(itemsSelected, "Cheesecake") === 2) {
      showCheesecakeErrorMessage();
    }
    // Check for seafood combination
    if (
      _.indexOf(selection, "Prawn cocktail") > -1 &&
      _.indexOf(selection, "Salmon fillet") > -1
    ) {
      showSeafoodCombinationErrorMessage();
    }
  }
  return isOk;
}

function showMainsIncorrectErrorMessage(diner) {
  // Show error dialog in the event of insufficient mains selection made
  const title = "Your mains selection is incomplete";
  let message = "";
  message = `You have not selected a main course item for ${diner}.`;
  util.createDialog(title, message);
  return (isOk = false);
}

function showCheesecakeErrorMessage() {
  const title = "Oops ...";
  const message =
    "Sorry, but we seem to have run out of cheesecake! We only have one piece left. Please choose from another dessert menu item and recalculate your bill.";
  util.createDialog(title, message);
  return (isOk = false);
}

function showSeafoodCombinationErrorMessage() {
  const title = "Oops ...";
  const message =
    "Sorry, but we don't allow the combination of the prawn cocktail and the salmon fillet in any one menu order! Please choose from another starter and mains menu combination and recalculate your bill.";
  util.createDialog(title, message);
  return (isOk = false);
}

function writeFinalBill() {
  const bill = document.getElementById("billTotal");
  const total = util.calculateTotalBill(allItems, selection1, selection2);
  bill.textContent = `Total bill: £ ${util.intToFloat(total)}.`;
  bill.style.color = "red";
}
