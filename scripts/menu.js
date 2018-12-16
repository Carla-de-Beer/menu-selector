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
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const description = document.createTextNode(course[i].name);

    label.className += "para1Bold";
    checkbox.type = "checkbox";
    checkbox.id = "checkbox-" + course[i].name;
    checkbox.value = course[i].name;
    checkbox.style.marginRight = "10px";
    //$("input").checkboxradio(); // Problem wih clearing the jQueryUI checkboxes

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
        _setUIComponents(selection1, "list1");
        _showCostSoFarBill1(util.calculateDinerBill(allItems, selection1));
      } else if (!isDiner1 && isDiner2) {
        if (event.srcElement.checked) {
          selection2.push(course[i].name);
        } else {
          const index = selection2.indexOf(course[i].name);
          if (index !== -1) {
            selection2.splice(index, 1);
          }
        }
        _setUIComponents(selection2, "list2");
        _showCostSoFarBill2(util.calculateDinerBill(allItems, selection2));
      }
    });

    const priceParagraph = document.createElement("p");
    priceParagraph.textContent = "£" + util.intToFloat(course[i].price);
    priceParagraph.style.marginLeft = "25px";

    const courseDiv = document.getElementById(id);
    courseDiv.appendChild(label);
    courseDiv.appendChild(priceParagraph);
    courseDiv.appendChild(document.createElement("br"));
  }
}

function _setUIComponents(selection, listID) {
  const list = document.getElementById(listID);
  const menuList = util.splitArrayIntoString(selection);
  list.textContent = menuList;
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

function _resetCheckboxStates(selection) {
  // First set to false all previous selections
  $("input[type=checkbox]").each(function () {
    this.checked = false;
  });
  // Now select the ones pertaining the diner in question
  for (let i = 0, l = selection.length; i < l; ++i) {
    document.getElementById("checkbox-" + selection[i]).checked = true;
  }
}

/* =========================================================== */
/* event handlers                                              */
/* =========================================================== */

function onSelectDiner1() {
  isDiner1 = true;
  isDiner2 = false;
  _resetCheckboxStates(selection1);
}

function onSelectDiner2() {
  isDiner1 = false;
  isDiner2 = true;
  _resetCheckboxStates(selection2);
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
        message =
          `No courses were selected for ${diner}. You need to add at least two courses for two people, ` +
          "of which one needs to be a main course.";
      } else if (selection.length < 2) {
        message =
          `Only one course was selected for ${diner}. You need to add at least two courses for two people, ` +
          "of which one needs to be a main course.";
      }
      util.createDialog(title, message);
    });
    return;
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
        const message =
          "Sorry, but we seem to have run out of cheesecake! We only have one piece left. " +
          "Please choose from another dessert menu item and recalculate your bill.";
        util.createDialog(title, message);
        return;
      }
      // Check for seafood combination
      if (
        _.indexOf(selection, "Prawn cocktail") > -1 &&
        _.indexOf(selection, "Salmon fillet") > -1
      ) {
        const title = "Oops ...";
        const message =
          "Sorry, but we don't allow the combination of the prawn cocktail and the salmon fillet in any one menu order! " +
          "Please choose from another starter and mains menu combination and recalculate your bill.";
        util.createDialog(title, message);
        return;
      }
    }

    const bill = document.getElementById("billTotal");
    const total = util.calculateTotalBill(allItems, selection1, selection2);
    bill.textContent = `Total bill: £ ${util.intToFloat(total)}.`;
    bill.style.color = "red";

  }
}