class UtilHelper {
  constructor() {}

  loadJSON(filePath, callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", filePath, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState === XMLHttpRequest.DONE) {
        if (xobj.status === 200 || xobj.status === XMLHttpRequest.UNSENT) {
          callback(xobj.responseText);
        }
      }
    };
    xobj.send(null);
  }

  intToFloat(num) {
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
      return parseFloat(num).toFixed(2);
    }
    return "";
  }

  splitArrayIntoString(array) {
    if (
      arguments[0] === undefined ||
      arguments[0] === null ||
      array.constructor !== Array
    ) {
      return null;
    }
    let result = "";
    for (let i = 0, l = array.length; i < l; ++i) {
      result += array[i];
      if (i !== array.length - 1) {
        result += ", ";
      }
    }
    return result;
  }

  countOccurrences(array, value) {
    if (
      arguments[0] === undefined ||
      arguments[0] === null ||
      arguments[0].constructor !== Array
    ) {
      return null;
    }
    let numFound = 0;
    for (let i = 0, l = array.length; i < l; ++i) {
      if (array[i] === value) {
        numFound++;
      }
    }
    return numFound;
  }

  calculateDinerBill(allItems, selection) {
    if (
      arguments[0] === undefined ||
      arguments[0] === null ||
      arguments[1] === undefined ||
      arguments[1] === null
    ) {
      return null;
    } else if (
      arguments[0].constructor !== Array ||
      arguments[1].constructor !== Array
    ) {
      return null;
    }

    let total = 0.0;
    for (let i = 0, l = selection.length; i < l; ++i) {
      const foundItem = _.find(allItems, entry => {
        return entry.name === selection[i];
      });
      if (foundItem !== undefined) {
        total += foundItem.price;
      }
    }
    return total;
  }

  calculateTotalBill(allItems, selection1, selection2) {
    if (
      arguments[0] === undefined ||
      arguments[0] === null ||
      arguments[1] === undefined ||
      arguments[1] === null ||
      arguments[2] === undefined ||
      arguments[2] === null
    ) {
      return null;
    } else if (
      arguments[0].constructor !== Array ||
      arguments[1].constructor !== Array ||
      arguments[2].constructor !== Array
    ) {
      return null;
    }

    // Add all of the menu items to one array for a single loop
    const combinedSelection = [];
    combinedSelection.push.apply(combinedSelection, selection1);
    combinedSelection.push.apply(combinedSelection, selection2);
    let total = 0.0;
    for (let i = 0, l = combinedSelection.length; i < l; ++i) {
      const foundItem = _.find(allItems, entry => {
        return entry.name === combinedSelection[i];
      });
      if (foundItem !== undefined) {
        total += foundItem.price;
      }
    }
    return total;
  }

  createDialog(title, message) {
    if (
      arguments[0] === undefined ||
      arguments[0] === null ||
      arguments[1] === undefined ||
      arguments[1] === null
    ) {
      return;
    }

    $("#dialog")
      .attr("title", title)
      .dialog();
    $("#dialog").text(message);
    $("#dialog").dialog({
      height: "auto",
      width: 550,
      autoOpen: false,
      modal: true,
      position: "center",
      draggable: false,
      buttons: {
        Ok: function() {
          $(this).dialog("close");
          $(this).dialog("option", "hide");
        }
      }
    });
    $("#dialog").dialog("option", "title", title);
    $("#dialog").dialog("open");
  }
}

try {
  module.exports = UtilHelper; /* eslint no-undef: 0 */ // --> OFF
} catch (err) {}
