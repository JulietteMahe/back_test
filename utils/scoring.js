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

const scoringBeta = (phrase) => {
    let titi = phrase.length;
    return titi;
}

module.exports = {
    scoringSentences
}