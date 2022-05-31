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

// Ici je monte les différentes parties du scoring avant de les assembler

let str = "Jjjjjj tttttt ffffff ffffff aaaaaa wwwwwww 😇 !";

let tempScore = 0;
let tempScoreLength = 0;
let tempScoreSyntax = 0;
let tempScoreSemantic = 0;


//////////////////////  1.Length 20% score from 0,01 to 0,99

//  String length -> functionning, lack weight

function stringLength(str) {
    let lengthScore = 0;
    // test includes emoji because emojies modify total case (between 2 et 4 case for 1 emoji)
    
    if (emojiPattern.test(str) == true) {
        if ((str.length > 32) && (str.length < 54)){
            lengthScore += 1
        } else {
            lengthScore += 0,5
        }
    } else {
        if ((str.length > 30) && (str.length < 52)){
            lengthScore += 1
        } else {
            lengthScore += 0,5
        }
    }
    return lengthScore;
}
//console.log(stringLength(str));
tempScoreLength += stringLength(str)
console.log(tempScoreLength);


//  Word count -> fonctionnelle , manque la pondération

function countWords(str) {
    let wordsCount = 0;
    // test include emoji car modifie le word count total (entre 1 et 4 word pour 1 emoji)

    if (emojiPattern.test(str) == true) {
        if ((str.split(" ").length > 7) && (str.split(" ").length < 12) ){
            wordsCount += 1
        } else {
            wordsCount += 0,5
        }
    } else {
        if ((str.split(" ").length > 6) && (str.split(" ").length < 10 )){
            wordsCount += 1
        } else {
            wordsCount += 0,5
        }
    }
    return wordsCount;
}
console.log(countWords(str))
console.log(tempScoreLength);
tempScoreLength += countWords(str)
console.log(tempScoreLength);
tempScoreLength / 2
console.log("length score is");
console.log(tempScoreLength / 2);


////////////////////// 2.Syntax 35%


//  All caps -> fonctionnelle , manque la pondération

function allCaps(str) {
    let capsScore = 0;
    let newStr = str.toUpperCase();
    if (newStr === str){
        capsScore += 0,25
    } else {
        capsScore += 0,75
    }
    return capsScore;
}
//console.log(allCaps(str));
tempScoreSyntax += allCaps(str)
//console.log(tempScore);



//  All lower case -> fonctionnelle , manque la pondération

function allLowerC(str) {
    let allLowerScore = 0;
    let newStr = str.toLowerCase();
    if (newStr === str){
        allLowerScore += 0,25
    } else {
        allLowerScore += 0,75
    }
       
    return allLowerScore;
}
//console.log(allLowerC(str));
tempScoreSyntax += allLowerC(str)
//console.log(tempScore);


//  Nombre de ! -> fonctionnelle , manque la pondération

function includeExclam(str) {
    let exclamScore = 0;
    if (str.includes("!")){
        exclamScore += 0,1  // BAD
    } else {
        exclamScore += 0,50   // No impact
    }
    return exclamScore;
}
//console.log(includeExclam(str));
tempScoreSyntax += includeExclam(str)
//console.log(tempScore);



//  Nombre de ? -> fonctionnelle , manque la pondération

function countOccurenceQ(str, word) {
    let qScore = 0;
    if ((str.split("?").length-1) === 1) {
        qScore += 0,75
    } else if ((str.split("?").length-1) > 1) {
        qScore += 0,25
    } else {
        qScore += 0,5
    }
    return qScore;
}
//console.log(countOccurenceQ(str));
tempScoreSyntax += countOccurenceQ(str)
//console.log(tempScore);



//  Nombre d'emoji -> fonctionnelle , manque la pondération

function emojiOccurence(str) {
    let emojiScore = 0;
    emojiCount = ((str || '').match(emojiPattern) || []).length;
    if (emojiCount === 0){
        emojiScore += 0,5
    } else if (emojiCount === 1){
        emojiScore += 0,75
    } else {
        emojiScore += 0,25
    }
    return emojiScore;
}
//console.log(emojiOccurence(str));
tempScoreSyntax = (tempScoreSyntax + emojiOccurence(str)) / 5
//console.log("syntax score is");
//console.log(tempScoreSyntax);


/// TOTAL SCORE must be between 1 and 100
/*function totalProp (str) {
    return totalScore = (((tempScoreLength) * 0,40) + ((tempScoreSyntax) *0,60));
}*/

/*console.log("total score is");
console.log(totalProp(str));*/

module.exports = {
    scoringSentences
}