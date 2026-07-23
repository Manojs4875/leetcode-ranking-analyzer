const express=require('express');
const {fetchLeetcodeData}=require('./service/leetcodefetch');
const app=express();
app.set('view engine', 'ejs');
const port=8000;
const leetcoderouter=require('./route/leetcode');
const staticroute=require('./route/static');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", staticroute);
app.use("/submit", leetcoderouter);
app.use("/display", staticroute);

//run server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});