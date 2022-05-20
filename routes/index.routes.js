const router = require('express').Router();

const otherSentenceRouter = require('./otherSentences.routes');
const mySubjectRouter = require('./mySubject.routes');

router.use('/otherSentences', otherSentenceRouter);
router.use('/mySubject', mySubjectRouter);

module.exports = router;