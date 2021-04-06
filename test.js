const word2num = require("../utils/word2num");
const wordsNumberConverter = require("../utils/WordsNumberConverter");
const { units } = require("../services/digits_dicts.js");
const { magnitude } = require("../services/digits_dicts");

const testCases = [
  //["vierzehn", 14],
];

testCases.forEach((testCaseUnit) => {
  let input = testCaseUnit[0];
  let expected = testCaseUnit[1];
  let results = word2num.parseNumber(input);
  if (results !== expected) {
    console.log("Not working");
    console.log("Input: ", input);
    console.log("Result: ", results);
    console.log("Expected:", expected);
  }
});

const testCasesSentences = [
  [
    "wie lange hast du geschlafen neun stunden",
    "wie lange hast du geschlafen 9 stunden",
  ],
  ["vierzehn", "14"],
  ["Holst du mich ab", "Holst du mich ab"],
  [
    "leonardo da vinci allee zweiunddreissig frankfurt",
    "leonardo da vinci allee 32 frankfurt",
  ],
  [
    "leuchte dreiunddreissig frankfurt fünf dreißig",
    "leuchte 33 frankfurt 5 30",
  ],
  [
    "um fünfzehn uhr dreißig Kölner strasse sechsundvierzig",
    "um 15 uhr 30 Kölner strasse 46",
  ],
  ["fuenfzehn fuenfundzwanzig", "15 25"],
  [
    "für zwei Wohnungen habe ich jeweils zweitausend bezahlt",
    "für 2 Wohnungen habe ich jeweils 2000 bezahlt",
  ],
  ["dreitausendzweihundertelf", "3211"],
  ["ein zwei drei", "1 2 3"],
  ["zweiundsiebzig", "72"],
  ["zwölftausenddreihundertvier und eintausendvier", "12304 und 1004"],
  ["erste Januar", "1. Januar"],
  [
    "zweite dritte vierte fünfte sechste siebte achte neunte zehnte",
    "2. 3. 4. 5. 6. 7. 8. 9. 10.",
  ],
  [
    "dreißigste April und dreiundzwanzigste November",
    "30. April und 23. November",
  ],
  ["elfte", "11."],
  ["zwölfte", "12."],
  ["dreizehnte", "13."],
  ["fünfzigste", "50."],
  ["sechsundsechzigste", "66."],
  ["hundert € neunundneunzig", "100 € 99"],
  ["neunzehn hundert", "19 100"],
  ["neunzehnhundert", "1900"],
];

testCasesSentences.forEach((testCase) => {
  let input = testCase[0];
  let expected = testCase[1];
  let words = input.split(/[\s-]+/);
  //function map is generating a new list based on a older list and some computation
  let output = words.map((t) => word2num.parseNumber(t) || t);
  let result = output.join(" ");
  if (result !== expected) {
    console.log("Not working");
    console.log("Input: ", input);
    console.log("Expected:", expected);
    console.log("Result: ", result);
  }
});

const testCasesRegex = [
  // ["neunzehn hundert", "1900"],
];

testCasesRegex.forEach((testCase) => {
  let input = testCase[0];
  let expected = testCase[1];
  let words = input.split(/[\s-]+/);
  let output = words.map((t) => word2num.parseNumber(t) || t);
  let result = output.join(" ");
  result = word2num.parseRegex(result, units);
  if (result !== expected) {
    console.log("Not working");
    console.log("Input: ", input);
    console.log("Expected:", expected);
    console.log("Result: ", result);
  }
});

const testCasesRegexSimple = [
  ["19 100 10", "1910"],
  ["11 100 ", "1100"],
  ["1 2 3", "1 2 3"],
  ["100 55", "155"],
  ["200 55", "255"],
  ["2000 200", "2200"],
  ["2000 20", "2020"],
  ["2000 500 55", "2555"],
  ["200 1000", "200000"],
  ["100 50", "150"],
  ["100 50 1000", "150000"],
  [
    "ich bin am 30. April 19 100 91 geboren",
    "ich bin am 30. April 1991 geboren",
  ],
  ["50 1000 30", "50030"],
  ["ich bin am", "ich bin am"],
];

testCasesRegexSimple.forEach((testCase) => {
  let input = testCase[0];
  let expected = testCase[1];

  let result = word2num.parseRegex(input, units);
  if (result !== expected) {
    console.log("--------------------------");
    console.log("Not working");
    console.log("Input: ", input);
    console.log("Expected:", expected);
    console.log("Result: ", result);
  }
});
