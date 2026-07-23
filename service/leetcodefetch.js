async function fetchLeetcodeData(req, res) {
const username = req.body.username;
    const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            operationName: "userContestRankingInfo",
            variables: {
                username: username
            },
            query: `
            query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
            attendedContestsCount
            rating
             globalRanking
             totalParticipants
                topPercentage
                badge {
                 name
                }
                }
  userContestRankingHistory(username: $username) {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
}
`

        })
        


    });
    const data = await response.json();
        const history = data.data.userContestRankingHistory;
       const last5=history.slice(-5).reverse();
        
        res.render("display", {
    last5
});
}
   
module.exports = { fetchLeetcodeData };