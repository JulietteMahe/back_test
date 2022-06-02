const router = require('express').Router();

const mySubjectRouter = require('./subject_line_tester.routes');

router.use('/subject_line_tester', mySubjectRouter);

module.exports = router;