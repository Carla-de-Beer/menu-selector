"use strict";

let data = {};
let allItems = [];
const selection1 = [];
const selection2 = [];
let isDiner1 = true;
let isDiner2 = false;
const util = new UtilHelper(); /* eslint no-undef: 0 */ // --> OFF

readData();

function readData() {
  "use strict";
  util.loadJSON("mockdata/menu-data.json", response => {
    // Add eventListeners to UI buttons
    let button = document.getElementById("diner1");
    button.addEventListener("click", onSelectDiner1, false);

    button = document.getElementById("diner2");
    button.addEventListener("click", onSelectDiner2, false);

    button = document.getElementById("finaliseOrder");
    button.addEventListener("click", onFinaliseOrder, false);

    data = JSON.parse(response);
    const starters = data.starters;
    const mains = data.mains;
    const desserts = data.desserts;
    //console.log(data);

    _createFlatList();
    _buildCourse(starters, "starters");
    _buildCourse(mains, "mains");
    _buildCourse(desserts, "desserts");
  });
}

/* =========================================================== */
/* internal methods                                            */
/* =========================================================== */

function _buildCourse(course, id) {
  "use strict";
  for (let i = 0, l = course.length; i < l; ++i) {
    const button1 = document.createElement("button");
    button1.innerHTML = "Select";
    button1.id = "select-" + course[i].name;
    button1.style.visibility = "hidden";

    const button2 = document.createElement("button");
    button2.id = "deselect-" + course[i].name;
    button2.style.visibility = "hidden";
    button2.innerHTML = "Deselect";

    // ------------------- EventListener BUTTON1 => SELECT
    button1.addEventListener("click", () => {
      // Add selections to array and set button enablement 
      let count = 0;
      if (isDiner1 && !isDiner2) {
        count = _setUIComponents(selection1, course[i].name, "list1");
        const total = util.calculateDinerBill(allItems, selection1);
        _showCostSoFarBill1(total);
      } else if (!isDiner1 && isDiner2) {
        count = _setUIComponents(selection2, course[i].name, "list2");
        const total = util.calculateDinerBill(allItems, selection2);
        _showCostSoFarBill2(total);
      }

      // Update paragraph
      const para1 = document.getElementById(course[i].name);
      if (count === 0) {
        para1.textContent = course[i].name;
      } else {
        para1.textContent = course[i].name + ": " + count + " selected";
      }
    });

    // ------------------- EventListener BUTTON2 => DESELCT
    button2.addEventListener("click", () => {
      // Add selections to array and set button enablement 
      let count = 0;
      if (isDiner1 && !isDiner2) {
        selection1.splice(course[i].name);
        // Count number of occurrences of item in array
        count = util.countOccurrences(selection1, course[i].name);
        const total = util.calculateDinerBill(allItems, selection1);
        _showCostSoFarBill2(total);
      } else if (!isDiner1 && isDiner2) {
        selection2.splice(course[i].name);
        // Count number of occurrences of item in array
        count = util.countOccurrences(selection2, course[i].name);
        const total = util.calculateDinerBill(allItems, selection2);
        _showCostSoFarBill2(total);
      }

      if (count < 1) {
        // Set selection button states to prevent duplicate selections
        const selectButton = document.getElementById("select-" + course[i].name);
        selectButton.disabled = false;
      }

      // Update paragraph
      const para1 = document.getElementById(course[i].name);
      if (count === 0) {
        para1.textContent = course[i].name;
      } else {
        para1.textContent = course[i].name + ": " + count + " selected";
      }
    });

    const paragraph1 = document.createElement("p");
    paragraph1.id = course[i].name;
    paragraph1.textContent = course[i].name;
    paragraph1.className += "para1Bold";

    const paragraph2 = document.createElement("p");
    paragraph2.textContent = "£" + util.intToFloat(course[i].price);

    const courseDiv = document.getElementById(id);
    courseDiv.appendChild(paragraph1);
    courseDiv.appendChild(paragraph2);
    courseDiv.appendChild(button1);
    courseDiv.appendChild(button2);
    courseDiv.appendChild(document.createElement("br"));
  }
}

function _showCostSoFarBill1(total) {
  const bill = document.getElementById("billDiner1");
  bill.textContent = `Bill for Diner1: £ ${util.intToFloat(total)}.`;
}

function _showCostSoFarBill2(total) {
  const bill = document.getElementById("billDiner2");
  bill.textContent = `Bill for Diner1: £ ${util.intToFloat(total)}.`;
}

function _createFlatList() {
  allItems = [];
  allItems.push.apply(allItems, data.starters);
  allItems.push.apply(allItems, data.mains);
  allItems.push.apply(allItems, data.desserts);
}

function _resetButtonStates() {
  for (let i = 0, l = allItems.length; i < l; ++i) {
    const para1 = document.getElementById(allItems[i].name);
    para1.textContent = allItems[i].name;
    const selectButton = document.getElementById("select-" + allItems[i].name);
    selectButton.disabled = false;
  }
}

function _setButtonVisiblity() {
  for (let i = 0, l = allItems.length; i < l; ++i) {
    const button1 = document.getElementById("select-" + allItems[i].name);
    button1.style.visibility = "";
    const button2 = document.getElementById("deselect-" + allItems[i].name);
    button2.style.visibility = "";
  }
}

function _setUIComponents(selection, courseName, listID) {
  "use strict";
  // Method with side effects (not ideal)
  selection.push(courseName);
  // Count number of occurrences of item in array
  const count = util.countOccurrences(selection, courseName);
  if (count > 0) {
    // Set selection button states to prevent duplicate selections
    const selectButton = document.getElementById("select-" + courseName);
    selectButton.disabled = true;
    const list = document.getElementById(listID);
    const menuList = util.splitArrayIntoString(selection);
    list.textContent = menuList;
  }
  return count;
}

/* =========================================================== */
/* event handlers                                              */
/* =========================================================== */

function onSelectDiner1() {
  _resetButtonStates();
  _setButtonVisiblity();
  isDiner1 = true;
  isDiner2 = false;
}

function onSelectDiner2() {
  _resetButtonStates();
  _setButtonVisiblity();
  isDiner1 = false;
  isDiner2 = true;
}

function onFinaliseOrder() {
  // Combine selections
  const itemsSelected = [];
  itemsSelected.push.apply(itemsSelected, selection1);
  itemsSelected.push.apply(itemsSelected, selection2);
  _orderValidation(itemsSelected, selection1, "Diner 1");
  _orderValidation(itemsSelected, selection2, "Diner 2");
}

function _orderValidation(itemsSelected, selection, diner) {
  "use strict";
  // Dialog error messages for insufficent selection size
  if (selection.length < 2) {
    // Show error dialog in the event of no selections made
    $(function () {
      const title = `Add selections for ${diner}`;
      let message = "";
      if (selection.length < 1) {
        message = `No courses were selected for ${diner}. You need to add at least two courses for two people, ` +
          "of which one needs to be a main course.";
      } else if (selection.length < 2) {
        message = `Only one course was selected for ${diner}. You need to add at least two courses for two people, ` +
          "of which one needs to be a main course.";
      }
      util.createDialog(title, message);
    });
    return;
  } else if (selection.length >= 2) {
    // Show error dialog in the event of no mains selections made
    let countMains = 0;
    for (let i = 0, l = selection.length; i < l; ++i) {
      if (_.find(data.mains, entry => {
          return entry.name === selection[i];
        }) !== undefined) {
        countMains++;
      }
    }
    if (countMains < 1) {
      // Show error dialog in the event of insufficient mains selection made
      const title = "Your mains selection is incomplete";
      let message = "";
      message = `You have not selected a main course item for ${diner}.`;
      util.createDialog(title, message);
      return;
    } else {
      // This means we are ok to go - just need to make two more checks ...
      if (util.countOccurrences(itemsSelected, "Cheesecake") === 2) {
        const title = "Oops ...";
        const message = "Sorry, but we seem to have run out of cheesecake! We only have one piece left. " +
          "Please choose from another dessert menu item and recalculate your bill.";
        util.createDialog(title, message);
        return;
      }
      // Check for seafood combination
      if (_.indexOf(selection, "Prawn cocktail") > -1 && _.indexOf(selection, "Salmon fillet") > -1) {
        const title = "Oops ...";
        const message = "Sorry, but we don't allow the combination of the prawn cocktail and the salmon fillet in any one menu order! " +
          "Please choose from another starter and mains menu combination and recalculate your bill.";
        util.createDialog(title, message);
        return;
      }
    }

    const bill = document.getElementById("billTotal");
    const total = util.calculateTotalBill(allItems, selection1, selection2);
    bill.textContent = `Total bill: £ ${util.intToFloat(total)}.`;
  }
}