const fetch = require("node-fetch");

async function getUser(username) {
    const query = {
        query: `
      {
        matchedUser(username: "${username}") {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `
    };

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-requested-with': 'XMLHttpRequest'
            },
            body: JSON.stringify(query)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        return userData.data;

    } catch (err) {
        console.error('Error fetching LeetCode data:', err.message);
        // You can choose to throw the error or return null
        throw err;
    }
}

module.exports = getUser;
