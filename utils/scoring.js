const { emojiPattern } = require("./emojiPattern");
const { spamList } = require("./spamList");

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
    //console.log(finalArray);
    return finalArray;
}


// Scoring à finaliser ci-dessous

const scoringBeta = (phrases) => {

    stringLength(phrases)
    tempScores += stringLength(phrases)
    tempWeight += lengthWeight

    countWords(phrases)
    tempScores += countWords(phrases)
    tempWeight += wordsWeight

    allCaps(phrases)
    tempScores += allCaps(phrases)
    tempWeight += capsWeight

    allLowerC(phrases)
    tempScores += allLowerC(phrases)
    tempWeight += lowerCWeight

    includeExclam(phrases)
    tempScores += includeExclam(phrases)
    tempWeight += exclamWeight

    countOccurenceQ(phrases, "?")
    tempScores += countOccurenceQ(phrases)
    tempWeight += qWeight

    emojiOccurence(phrases)
    tempScores += emojiOccurence(phrases)
    tempWeight += emojiWeight

    forwardEmail(phrases)
    tempScores += forwardEmail(phrases)
    tempWeight += forwardWeight

    spamOccurence(phrases)
    tempScores += spamOccurence(phrases)
    tempWeight += spamWeight

    let finalScore = (tempScores / tempWeight) * 100;
    return finalScore ;
}


///////////////////// GLOBAL VAR /////////////////////

//Below the string to study
let str = "Come check our new arrivals";

//Below the main scoring var
let tempScores = 0;
let tempWeight = 0;

//////////////////// WEIGHT VAR //////////////////////

// Below the LENGTH weight var
let lengthWeight = 5;
let wordsWeight = 4;

// Below the SYNTAX weight var
let capsWeight = 2;
let lowerCWeight = 1;
let exclamWeight = 2;
let qWeight = 1;
let emojiWeight = 3;

// Below the SEMANTICS weight var
let forwardWeight = 4;
let spamWeight = 5;

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
    console.log("stringLength");
    return (lengthScore * lengthWeight);
}
tempScores += stringLength(str)
tempWeight += lengthWeight


///////////////////  Word count

function countWords(str) {
    let wordsCount = 0;

    // test includes emoji because emoji modify total word count (between 1 and 4 word for 1 emoji)

    if (emojiPattern.test(str) == true) {
        if ((str.split(" ").length > 7) && (str.split(" ").length < 12) ){
            wordsCount += 0.9
        } else {
            wordsCount += 0.01
        }
    } else {
        if ((str.split(" ").length > 6) && (str.split(" ").length < 10 )){
            wordsCount += 0.9
        } else {
            wordsCount += 0.01
        }
    }
    console.log("countWords");
    return (wordsCount * wordsWeight);
}
tempScores += countWords(str)
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
    console.log("allCaps");
    return (capsScore * capsWeight);
}
tempScores += allCaps(str)
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
    console.log("allLowerC");
    return (allLowerScore * lowerCWeight);
}
tempScores += allLowerC(str)
tempWeight += lowerCWeight

///////////////////  includeExclam

function includeExclam(str) {
    let exclamScore = 0;

    if (str.includes("!")){
        exclamScore += 0.1  // BAD
    } else {
        exclamScore += 0.5   // No impact   
    }
    console.log("includeExclam");
    return (exclamScore * exclamWeight);
}
tempScores += includeExclam(str)
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
    console.log("countOccurenceQ");
    return (qScore * qWeight);
}
tempScores += countOccurenceQ(str)
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
    console.log("emojiOccurence");
    return (emojiScore * emojiWeight);
}
tempScores += emojiOccurence(str)
tempWeight += emojiWeight


////////////////////////////////////////// 3. SEMANTICS

function forwardEmail(str) {
    let forwardScore = 0;

    if (str.includes("RE:" || "FWD:" || "Re:" || "Fwd:")){
        forwardScore += 0.1  // BAD
    } else {
        forwardScore += 1  
    }
    console.log("forwardEmail")
    return (forwardScore * forwardWeight);
}
tempScores += forwardEmail(str)
tempWeight += forwardWeight


function spamOccurence(str) {
    let spamScore = 0;
    let spamCount = 0;
    spamList.forEach((item) => {
        if (str.includes(item.keyword)){
            spamCount += 1;
        }
    });
    if (spamCount === 0){
        spamScore += 1
    } else if (spamCount <= 2){
        spamScore += 0.5
    } else {
        spamScore += 0.1
    }
    console.log("spamOccurence");
    return (spamScore * spamWeight);
}
tempScores += spamOccurence(str)
tempWeight += spamWeight

//console.log((tempScores / tempWeight) * 100);

module.exports = {
    scoringSentences
}