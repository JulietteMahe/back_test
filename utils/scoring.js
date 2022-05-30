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

// Ici monte les différentes parties du scoring avant de les assembler

let str = "Join us for a fun day in Europa park 😀 !";
let tempScore = 0;

// 1.Length 20%

function stringLength(str) {
    if ((str.length > 30) && (str.length < 52)){
        tempScore += 10
    } else {
        tempScore += 0
    }
    return tempScore;
}
console.log(stringLength(str));

function wordCount(str) {
    if ((str.split(" ").length > 6) && (str.split(" ").length > 6)){
        tempScore += 10
    } else {
        tempScore += 0
    }
    return tempScore;
}
console.log(wordCount(str));

//  2.Syntax 35%

function allCaps(str) {
    if (str.toUpperCase() === str){
        true
        tempScore -= 10
    } else {
        false
        tempScore += 10
    }
    return tempScore;
}
console.log(allCaps(str));

function allLowerC(str) {
    if (str.allLowerC() === str){
        true
        tempScore -= 10
    } else {
        false
        tempScore += 10
    }
    return tempScore;
}
console.log(allLowerC(str));

function includeExclam(str) {
    if (str.includes("!")){
        tempScore -= 10  // BAD
    } else {
        tempScore =+ 0   // No impact
    }
    return tempScore;
}
console.log(includeExclam(str));

function countOccurenceQ(str, word) {
    if ((str.split("?").length-1) === 1) {
        tempScore +=10
    } else if ((str.split("?").length-1) === 1) {
        tempScore -= 10
    } else {
        tempScore =+ 0
    }
    return tempScore;
}
console.log(countOccurenceQ(str, "?"));

/*function emojiOccurence(str)*/




module.exports = {
    scoringSentences
}