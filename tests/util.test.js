const UtilHelper = require("../scripts/util");

// ===========================================================
// 1. intToFloat test cases                                   
// ===========================================================
test("1.1 intToFloat test: valid number", () => {
  const util = new UtilHelper();
  const result = util.intToFloat(3);
  expect(result).toBe("3.00");
});

test("1.2 intToFloat test: valid number", () => {
  const util = new UtilHelper();
  const result = util.intToFloat(3.5);
  expect(result).toBe("3.50");
});

test("1.3 intToFloat test: valid number", () => {
  const util = new UtilHelper();
  const result = util.intToFloat(3.6677);
  expect(result).toBe("3.67");
});

test("1.4 intToFloat test: valid number string", () => {
  const util = new UtilHelper();
  const result = util.intToFloat("3");
  expect(result).toBe("3.00");
});

test("1.5 intToFloat test: invalid string", () => {
  const util = new UtilHelper();
  const result = util.intToFloat("x");
  expect(result).toBe("");
});

test("1.6 intToFloat test: empty string", () => {
  const util = new UtilHelper();
  const result = util.intToFloat("");
  expect(result).toBe("");
});

test("1.7 intToFloat test: null", () => {
  const util = new UtilHelper();
  const result = util.intToFloat(null);
  expect(result).toBe("");
});

test("1.8 intToFloat test: undefined", () => {
  const util = new UtilHelper();
  const result = util.intToFloat(undefined);
  expect(result).toBe("");
});

// ===========================================================
// 2. splitArrayIntoString test cases                                   
// ===========================================================
test("2.1 splitArrayIntoString test: valid array", () => {
  const util = new UtilHelper();
  const result = util.splitArrayIntoString([4, 5, 6]);
  expect(result).toBe("4, 5, 6");
});

test("2.2 splitArrayIntoString test: valid array", () => {
  const util = new UtilHelper();
  const result = util.splitArrayIntoString(["4", "5", "6"]);
  expect(result).toBe("4, 5, 6");
});

test("2.3 splitArrayIntoString test: number", () => {
  const util = new UtilHelper();
  const result = util.splitArrayIntoString(56);
  expect(result).toBeNull();
});

test("2.4 splitArrayIntoString test: empty string", () => {
  const util = new UtilHelper();
  const result = util.splitArrayIntoString("");
  expect(result).toBeNull();
});

test("2.5 splitArrayIntoString test: null", () => {
  const util = new UtilHelper();
  const result = util.splitArrayIntoString(null);
  expect(result).toBeNull();
});

test("2.6 splitArrayIntoString test: undefined", () => {
  const util = new UtilHelper();
  const result = util.splitArrayIntoString(undefined);
  expect(result).toBeNull();
});

// ===========================================================
// 3. countOccurrences test cases                                   
// ===========================================================
test("3.1 countOccurrences test: valid array data", () => {
  const util = new UtilHelper();
  const result = util.countOccurrences([4, 5, 6], 4);
  expect(result).toBeTruthy();
});

test("3.2 countOccurrences test: valid array data", () => {
  const util = new UtilHelper();
  const result = util.countOccurrences([4, 5, 6], 54);
  expect(result).toBeFalsy();
});

test("3.3 countOccurrences test: invalid number", () => {
  const util = new UtilHelper();
  const result = util.countOccurrences(456, 54);
  expect(result).toBeNull();
});

test("3.4 countOccurrences test: empty string", () => {
  const util = new UtilHelper();
  const result = util.countOccurrences("");
  expect(result).toBeNull();
});

test("3.5 countOccurrences test: null", () => {
  const util = new UtilHelper();
  const result = util.countOccurrences(null);
  expect(result).toBeNull();
});

test("3.6 countOccurrences test: undefined", () => {
  const util = new UtilHelper();
  const result = util.countOccurrences(undefined);
  expect(result).toBeNull();
});

// ===========================================================
// 4. calculateDinerBill test cases                                   
// ===========================================================
// "4.1 calculateDinerBill test: valid array data"
// "4.2 calculateDinerBill test: valid array data"
// "4.3 calculateDinerBill test: invalid number"
// "4.4 calculateDinerBill test: empty string"

// test("4.1 calculateDinerBill test: valid array data", () => {
//   // Check that an incoming number is correctly converted
//   const util = new UtilHelper();
//   const allItems = [{
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
//   ];
//   const result = util.calculateDinerBill(allItems, ["A", "B"]);
//   expect(result).toBeTruthy();
// });

test("4.5 calculateDinerBill test: null", () => {
  const util = new UtilHelper();
  const result = util.calculateDinerBill(null);
  expect(result).toBeNull();
});

test("4.6 calculateDinerBill test: undefined", () => {
  const util = new UtilHelper();
  const result = util.calculateDinerBill(undefined);
  expect(result).toBeNull();
});

// ===========================================================
// 5. calculateTotalBill test cases                                   
// ===========================================================
// "5.1 calculateTotalBill test: valid array data"
// "5.2 calculateTotalBill test: valid array data"
// "5.3 calculateTotalBill test: invalid number"
// "5.4 calculateTotalBill test: empty string"

test("5.5 calculateTotalBill test: null", () => {
  const util = new UtilHelper();
  const result = util.calculateTotalBill(null);
  expect(result).toBeNull();
});

test("5.6 calculateTotalBill test: undefined", () => {
  const util = new UtilHelper();
  const result = util.calculateTotalBill(undefined);
  expect(result).toBeNull();
});

// ===========================================================
// 6. createDialog test cases                                   
// ===========================================================
test("6.1 calculateTotalBill test: null", () => {
  const util = new UtilHelper();
  const result = util.createDialog(null);
  expect(result).toBeUndefined();
});

test("6.2 calculateTotalBill test: undefined", () => {
  const util = new UtilHelper();
  const result = util.createDialog(undefined);
  expect(result).toBeUndefined();
});