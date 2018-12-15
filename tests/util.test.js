const UtilHelper = require("../scripts/util");

// ===========================================================
// 1. intToFloat test cases                                   
// ===========================================================
test("1.1 intToFloat test: number", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.intToFloat(3);
  expect(result).toBe("3.00");
});

test("1.2 intToFloat test: number", () => {
  // Check that an incoming float is correctly converted
  let util = new UtilHelper();
  let result = util.intToFloat(3.5);
  expect(result).toBe("3.50");
});

test("1.3 intToFloat test: number", () => {
  // Check that an incoming float is correctly converted
  let util = new UtilHelper();
  let result = util.intToFloat(3.6677);
  expect(result).toBe("3.67");
});

test("1.4 intToFloat test: number string", () => {
// Check with number value passed as string
  util = new UtilHelper();
  result = util.intToFloat("3");
  expect(result).toBe("3.00");
});

test("1.5 intToFloat test: string", () => {
    // Check with string value 
    util = new UtilHelper();
    result = util.intToFloat("x");
    expect(result).toBe("");
  });

test("1.6 intToFloat test: empty string", () => {
  // Check with string value 
  util = new UtilHelper();
  result = util.intToFloat("");
  expect(result).toBe("");
});

// ===========================================================
// 2. splitArrayIntoString test cases                                   
// ===========================================================
test("2.1 splitArrayIntoString test: array", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.splitArrayIntoString([4, 5, 6]);
  expect(result).toBe("4, 5, 6");
});

test("2.2 splitArrayIntoString test: array", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.splitArrayIntoString(["4", "5", "6"]);
  expect(result).toBe("4, 5, 6");
});

test("2.3 splitArrayIntoString test: number", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.splitArrayIntoString(56);
  expect(result).toBeNull();
});

test("2.4 splitArrayIntoString test: empty string", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.splitArrayIntoString("");
  expect(result).toBeNull();
});

// ===========================================================
// 3. countOccurrences test cases                                   
// ===========================================================
test("3.1 countOccurrences test: array", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.countOccurrences([4, 5, 6], 4);
  expect(result).toBeTruthy();
});

test("3.2 countOccurrences test: array", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.countOccurrences([4, 5, 6], 54);
  expect(result).toBeFalsy();
});

test("3.3 countOccurrences test: number", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.countOccurrences(456, 54);
  expect(result).toBeNull();
});

test("3.4 countOccurrences test: empty string", () => {
  // Check that an incoming number is correctly converted
  let util = new UtilHelper();
  let result = util.countOccurrences("");
  expect(result).toBeNull();
});

// ===========================================================
// 4. calculateDinerBill test cases                                   
// ===========================================================
// test("4.1 calculateDinerBill test: array", () => {
//   // Check that an incoming number is correctly converted
//   let util = new UtilHelper();
//   let allItems = [
//     {
//       "name": "A", 
//       "price": 3.0
//     },
//     {
//       "name": "B", 
//       "price": 5.5
//     },
//     {
//       "name": "C", 
//       "price": 10
//     }
// ]
//   let result = util.calculateDinerBill(allItems, ["A", "B"]);
//   expect(result).toBeTruthy();
// });



