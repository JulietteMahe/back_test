const connection = require("../db-config");
const db = connection.promise();

// Fetch all alternative sentences, ordered by score , highest to lowest
const findAll = () => {
    return db
        .query("SELECT * FROM other_sentences ORDER BY score DESC")
        .then(([result]) => result)
        .catch((err) => {
            console.log(err);
            return err;
        });
}

module.exports = {
    findAll
}