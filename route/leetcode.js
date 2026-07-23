const express=require('express');
const router=express.Router();
const {fetchLeetcodeData}=require('../service/leetcodefetch');
router.post('/',fetchLeetcodeData);
module.exports=router;