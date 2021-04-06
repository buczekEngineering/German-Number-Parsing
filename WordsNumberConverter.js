const { units } = require("../services/digits_dicts.js");
const { magnitude } = require("../services/digits_dicts.js");

const WordsNumberConverter = () => {
  let text;

  const convertTextToNumber = (text) => {
    let words = text.split(/[\s-]+/);
    let output = words.map((t) => parseNumber(t) || t);
    let result_string = output.join(" ");
    console.log("result string", result_string);
    if (checkIfDigits(result_string)) {
      return result_string;
    } else {
      return parseRegex(result_string, units);
    }
  };

  const parseNumber = (word) => {
    let total = 0;
    let suffix;
    let isSuffix = false;
    word = word.toLowerCase();
    const normal_words = ["eine", "einen", "eines", "einer", "einem"];
    if (normal_words.includes(word)) {
      return word;
    }
    if (word === "ein") {
      return word;
    }
    if (word === "null") {
      return "0";
    }

    if (magnitude[word]) {
      return magnitude[word];
    }
    ////the end of simple cases
    while (word) {
      let prefix = findPrefix(word, units);
      if (!prefix) {
        return null; // when no more words/prefixes are found we go out from while
      }

      word = word.substring(prefix.length);
      suffix = findSuffix(word);
      if (suffix) {
        isSuffix = true;
        word = word.substring(suffix.length);
      }

      if (word.startsWith("und")) {
        word = word.substring(3);
        let nextPrefix = findPrefix(word, units);
        if (nextPrefix) {
          word = word.substring(nextPrefix.length);
          total += units[prefix] + units[nextPrefix];
        }
        suffix = findSuffix(word);
        if (suffix) {
          isSuffix = true;
          word = word.substring(suffix.length);
        }
      } else {
        let magnitudePrefix = findPrefix(word, magnitude);
        if (magnitudePrefix) {
          //check if there is more numbers in it
          word = word.substring(magnitudePrefix.length);

          total += units[prefix] * magnitude[magnitudePrefix];
        } else if (!word) {
          total += units[prefix];
        }
      }
    }
    if (isSuffix) {
      return total.toString() + ".";
    } else return total; // end of while
  };

  const findPrefix = (text, dict) => {
    let match;
    let ele;
    for (ele in dict) {
      if (text.startsWith(ele)) {
        if (!match || ele.length > match.length) {
          match = ele;
        }
      }
    }
    return match;
  };
  const findSuffix = (text) => {
    let suffixList = [
      "en",
      "e",
      "em",
      "er",
      "es",
      "er",
      "te",
      "ter",
      "ten",
      "tem",
      "tes",
      "ste",
      "ster",
      "sten",
      "stem",
    ];

    if (suffixList.includes(text)) {
      return text;
    }
  };

  const checkIfDigits = (text) => {
    const pattern = /(?<![0-9])[0-9]{1}( [0-9]{1})+/;
    let isMatch = text.match(pattern);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  };

  const parseRegex = (text, units) => {
    let total;
    let pattern = /\b(?<number1>\d+){1}\s{1}(?<number2>\d+){1}\s*(?<number3>\d+)?/;
    let isMatch = text.match(pattern);

    if (isMatch) {
      let groups = text.match(pattern).groups;
      let number1 = groups.number1;
      number1 = parseInt(number1);
      let number2 = groups.number2;
      number2 = parseInt(number2);
      let number3 = groups.number3;
      number3 = parseInt(number3);
      const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let firstUnits = Object.values(units).includes(parseInt(number1));
      //let firstMagnitude = Object.values(magnitude).includes(parseInt(number1));

      if (firstUnits && !digits.includes(number1)) {
        if (number1 < number2) {
          total = number1 * number2;
          if (number3) {
            total = total + number3;
            return text.replace(pattern, total);
          }
          return text.replace(pattern, total);
        }
      }
      /* if (
        firstUnits &&
        digits.includes(number1) &&
        digits.includes(number2) &&
        digits.includes(number3)
      ) {
        return text;
      } */
      if (number1 >= 100) {
        if (number1 > number2) {
          total = number1 + number2;

          if (!number3) {
            return text.replace(pattern, total);
          }
          if (number3 > total) {
            total = total * number3;
          } else {
            total += number3;
          }
        } else {
          total = number1 * number2;
        }
        return text.replace(pattern, total);
      }
    } else return text;
  };

  return {
    convertTextToNumber: convertTextToNumber,
  };
};
module.exports = WordsNumberConverter();
