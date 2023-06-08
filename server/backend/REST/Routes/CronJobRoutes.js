const router = require('express').Router();
const multer = require('multer');


const ResponseHelper = require('../helpers/ResponseHelper');
const { run_tasks } = require('../../CronJobs/TaskManager');

const upload = multer();

router.use('/run-tasks', upload.none());
router.get('/run-tasks', async (req, res) => {
    try {
        await run_tasks();
    } catch (e) {
        console.log('error in run tasks', e);
    }
    // return info as result
    return ResponseHelper.api_res(res, null, 'done', null, ResponseHelper.statuses.success, 200);
});

module.exports = router;