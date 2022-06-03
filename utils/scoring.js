const { emojiPattern } = require("./emojiPattern");
const { spamList } = require("./spamList");

const scoringSubjectLine = (resultArray, sentence) => {
    const finalArray = [];
    const tempScore = scoringBeta(sentence)

    let mySubjectLine = {
        sentence : sentence,
        score: tempScore,
    }
    finalArray.push(mySubjectLine);

    resultArray.forEach((element) => {
        const tempScore = scoringBeta(element)
        let otherSubjectsLines = {
            sentence : element,
            score: tempScore,
        } 
        finalArray.push(otherSubjectsLines);       
    });
    console.log(finalArray);
    return finalArray;
}


//////////////////////////////////////////// SCORING BETA //////////////////////////////////////////

const scoringBeta = (phrases) => {
    let tempScores = 0;
    let tempWeight = 0;

// Below the LENGTH weight var
    let lengthWeight = 5;
    let wordsWeight = 5;

// Below the SYNTAX weight var
    let capsWeight = 2;
    let lowerCWeight = 1;
    let exclamWeight = 2;
    let qWeight = 1;
    let emojiWeight = 3;

// Below the SEMANTICS weight var
    let forwardWeight = 4;
    let spamWeight = 5;

    tempScores += stringLength(phrases, lengthWeight)
    tempWeight += lengthWeight

    tempScores += countWords(phrases, wordsWeight)
    tempWeight += wordsWeight

    tempScores += allCaps(phrases, capsWeight)
    tempWeight += capsWeight

    tempScores += allLowerC(phrases, lowerCWeight)
    tempWeight += lowerCWeight

    tempScores += includeExclam(phrases, exclamWeight)
    tempWeight += exclamWeight

    tempScores += countOccurenceQ(phrases, qWeight)
    tempWeight += qWeight

    tempScores += emojiOccurence(phrases, emojiWeight)
    tempWeight += emojiWeight

    tempScores += forwardEmail(phrases, forwardWeight)
    tempWeight += forwardWeight

    tempScores += spamOccurence(phrases, spamWeight)
    tempWeight += spamWeight

    let finalScore = Math.round((tempScores / tempWeight) * 100);
    return finalScore ;
}



////////////////////////////////////////// FUNCTIONS  //////////////////////////////////////////

//Below the string to study
let str = "Come check our new arrivals for summer 👗👗"; 
//score test 81

//////////////////////////////////////// 1.LENGTH

///////////////////  String length

function stringLength(str, lengthWeight) {
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


///////////////////  Word count

function countWords(str, wordsWeight) {
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
    return (wordsCount * wordsWeight);
}


//////////////////////////////////// 2.SYNTAX

///////////////////  allCaps 

function allCaps(str, capsWeight) {
    let capsScore = 0;
    let newStr = str.toUpperCase();
    
    if (newStr === str){
        capsScore += 0.10
    } else {
        capsScore += 0.90
    }
    return (capsScore * capsWeight);
}


///////////////////  All lower case

function allLowerC(str, lowerCWeight) {
    let allLowerScore = 0;
    let newStr = str.toLowerCase();

    if (newStr === str){
        allLowerScore += 0.33
    } else {
        allLowerScore += 1
    }
    return (allLowerScore * lowerCWeight);
}


///////////////////  includeExclam

function includeExclam(str, exclamWeight) {
    let exclamScore = 0;

    if (str.includes("!")){
        exclamScore += 0.1  // BAD
    } else {
        exclamScore += 0.5   // No impact   
    }
    return (exclamScore * exclamWeight);
}


///////////////////  countOccurenceQ

function countOccurenceQ(str, qWeight, word) {
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


////////////////// emojiOccurence

function emojiOccurence(str, emojiWeight) {
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



////////////////////////////////////////// 3. SEMANTICS

function forwardEmail(str, forwardWeight) {
    let forwardScore = 0;
    let newStr = str.toLowerCase();

    if (newStr.includes("re" || "fwd" || "FWD" || "RE" || "Re" || "Fwd")){
        forwardScore += 0.01  // BAD
    } else {
        forwardScore += 1  
    }
    console.log(forwardScore);
    return (forwardScore * forwardWeight);
}


function spamOccurence(str, spamWeight) {
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
    return (spamScore * spamWeight);
}


module.exports = {
    scoringSubjectLine
}