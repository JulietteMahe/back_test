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

module.exports = {
    scoringSentences
}