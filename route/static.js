const express=require('express');
const router=express.Router();
const {fetchLeetcodeData}=require('../service/leetcodefetch');
router.get('/', (req, res) => {
    res.render('home');
});
router.get('/display',fetchLeetcodeData);
module.exports=router;