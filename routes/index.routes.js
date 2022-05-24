const router = require('express').Router();

const mySubjectRouter = require('./mySubject.routes');

router.use('/mySubject', mySubjectRouter);

module.exports = router;