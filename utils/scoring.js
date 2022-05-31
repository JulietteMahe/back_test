const { emojiPattern } = require("./emojiPattern");

const scoringSentences = (resultArray, sentence) => {
    const finalArray = [];
    const tempScore = scoringBeta(sentence)

    let mySubject = {
        sentence : sentence,
        score: tempScore,
    }
    finalArray.push(mySubject);

    resultArray.forEach((element) => {
        const tempScore = scoringBeta(element)
        let otherSubjects = {
            sentence : element,
            score: tempScore,
        } 
        finalArray.push(otherSubjects);       
    });
    return finalArray;
}

// Scoring à finaliser ci-dessous

const scoringBeta = (phrase) => {
    let finalScore = phrase.length;
    return finalScore;
}

// Below the different parts of algo before assembling them

///////////////////// GLOBAL VAR /////////////////////

//Below the string to study
let str = "RE: Jjjjjj tttttt ffffff ffffff aaaaaa wwwwwww 😇 !";

//Below the main scoring var
let tempScore = 0;
let tempWeight = 0;

//////////////////// WEIGHT VAR //////////////////////

// Below the LENGTH weight var
let lengthWeight = 5;
let wordsWeight = 2;

// Below the SYNTAX weight var
let capsWeight = 2;
let lowerCWeight = 1;
let exclamWeight = 2;
let qWeight = 1;
let emojiWeight = 3;

// Below the SEMANTICS weight var
let forwardWeight = 4;

//////////////////////////////////////// 1.LENGTH

///////////////////  String length

function stringLength(str) {
    let lengthScore = 0;
    
    // test includes emoji because emoji modify total case (between 2 et 4 case for 1 emoji)
    
    if (emojiPattern.test(str) == true) {
        if ((str.length > 32) && (str.length < 54)){
            lengthScore += 0.9
        } else {
            lengthScore += 0.4
        }
    } else {
        if ((str.length > 30) && (str.length < 52)){
            lengthScore += 0.9
        } else {
            lengthScore += 0.4
        }
    }
    return (lengthScore * lengthWeight);
}
tempScore += stringLength(str)
tempWeight += lengthWeight


///////////////////  Word count

function countWords(str) {
    let wordsCount = 0;

    // test includes emoji because emoji modify total word count (between 1 and 4 word for 1 emoji)

    if (emojiPattern.test(str) == true) {
        if ((str.split(" ").length > 7) && (str.split(" ").length < 12) ){
            wordsCount += 0.9
        } else {
            wordsCount += 0.4
        }
    } else {
        if ((str.split(" ").length > 6) && (str.split(" ").length < 10 )){
            wordsCount += 0.9
        } else {
            wordsCount += 0.4
        }
    }
    return (wordsCount * wordsWeight);
}
tempScore += countWords(str)
tempWeight += wordsWeight



//////////////////////////////////// 2.SYNTAX

///////////////////  allCaps 

function allCaps(str) {
    let capsScore = 0;
    let newStr = str.toUpperCase();
    
    if (newStr === str){
        capsScore += 0.10
    } else {
        capsScore += 0.90
    }
    return (capsScore * capsWeight);
}
tempScore += allCaps(str)
tempWeight += capsWeight


///////////////////  All lower case

function allLowerC(str) {
    let allLowerScore = 0;
    let newStr = str.toLowerCase();

    if (newStr === str){
        allLowerScore += 0.33
    } else {
        allLowerScore += 1
    }
    return (allLowerScore * lowerCWeight);
}
tempScore += allLowerC(str)
tempWeight += lowerCWeight

///////////////////  includeExclam

function includeExclam(str) {
    let exclamScore = 0;

    if (str.includes("!")){
        exclamScore += 0.1  // BAD
    } else {
        exclamScore += 0.5   // No impact   
    }
    return (exclamScore * exclamWeight);
}
tempScore += includeExclam(str)
tempWeight += exclamWeight


///////////////////  countOccurenceQ

function countOccurenceQ(str, word) {
    let qScore = 0;

    if ((str.split("?").length-1) === 1) {
        qScore += 1
    } else if ((str.split("?").length-1) > 1) {
        qScore += 0.1
    } else {
        qScore += 0.5
    }
    return (qScore * qWeight);
}
tempScore += countOccurenceQ(str)
tempWeight += qWeight


////////////////// emojiOccurence

function emojiOccurence(str) {
    let emojiScore = 0;
    emojiCount = ((str || '').match(emojiPattern) || []).length;

    if (emojiCount === 0){
        emojiScore += 0.5
    } else if (emojiCount === 1){
        emojiScore += 0.8
    } else {
        emojiScore += 0.1
    }
    return (emojiScore * emojiWeight);
}
tempScore += emojiOccurence(str)
tempWeight += emojiWeight


////////////////////////////////////////// 3. SEMANTICS

function forwardEmail(str) {
    let forwardScore = 0;

    if (str.includes("RE:" || "FWD:" || "Re:" || "Fwd:")){
        forwardScore += 0.1  // BAD
    } else {
        forwardScore += 1  
    }
    return (forwardScore * forwardWeight);
}
tempScore += forwardEmail(str)
tempWeight += forwardWeight

function includeSpam(str) {
    
}

////////////////////// TOTAL SCORE must be between 1 and 100
function totalProp (str) {
    return totalScore = (tempScore / tempWeight) * 100;
}

console.log("total score is");
console.log(totalProp(str));

module.exports = {
    scoringSentences
}