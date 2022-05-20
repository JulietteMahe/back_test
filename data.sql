CREATE DATABASE subject_line_tester;


CREATE TABLE my_sentence (
    -> id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    -> sentence VARCHAR(255) NOT NULL,
    -> score INT
    -> );

/* 
sentence from my_sentence is the input from the subject-line-tester form 
score will be calculated in the back-end, from our algo
*/

CREATE TABLE other_sentences (
    -> id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    -> sentence VARCHAR(255) NOT NULL,
    -> score INT
    -> );

/* 
sentence from other_sentences is the alternatives sentences fetch from GPT3
score will be calculated in the back-end, from our algo
*/

INSERT INTO other_sentences(sentence, score) VALUES ('des phrases', 32);
INSERT INTO other_sentences(sentence, score) VALUES ('et si je tapais une phrase très longue', 78);
INSERT INTO other_sentences(sentence, score) VALUES ('je fais', 84);