const searchInput = document.getElementById("inputbtn");
const searchbtn = document.getElementById("btn");

const easychart = document.querySelector(".data-container-easy");
const mediumchart = document.querySelector(".data-container-medium");
const hardchart = document.querySelector(".data-container-hard");

// select chart outofData button
const outofData = document.querySelectorAll(".outofData");


//put data on cards
const overallData = document.querySelectorAll(".data-1");
searchInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
      userResponse();
    }
})
searchbtn.addEventListener("click", userResponse);

async function userResponse() {
  let userInput = searchInput.value.trim();
  if (!userInput) {
    alert("Input can't be Empyt");
    return;
  }
  searchbtn.disabled = true;
  searchInput.value = "";
  searchbtn.innerHTML = "Searching...";
  console.log("User input:", userInput);

  // try catch functions to handle data errors
  try {
    const { data } = await sendData(userInput);
    console.log("API response data:", data);
    percentcal(data); // Call this if you want to update charts
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    searchbtn.textContent = "Search";
    searchbtn.disabled = false;
  }

}

async function sendData(userInput) {
  console.log("Before fetching");
  const res = await fetch('/leetcode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInput })
  });
  console.log("After fetching");

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();
  return { data };
}

// Optional: Update charts based on response data
function percentcal(data) {
  const acSubmissionNum = data.matchedUser.submitStats.acSubmissionNum;

// overall submission data of users 
const overall = acSubmissionNum[0].submissions;
const overallEasy = acSubmissionNum[1].submissions;
const overallMedium = acSubmissionNum[2].submissions;
const overallHard = acSubmissionNum[3].submissions;

//put values in overall submission
overallData[0].innerHTML = overall;
overallData[1].innerHTML = overallEasy;
overallData[2].innerHTML = overallMedium;
overallData[3].innerHTML = overallHard;

console.log("overall",overall)
console.log("overallEasy",overallEasy)
console.log("overallMedium",overallMedium)
console.log("overallHard",overallHard)

  
  // total Questions count property find out ki hai
  const allQuestionsCountEasy = data.allQuestionsCount[1];
  const allQuestionsCountMedium = data.allQuestionsCount[2];
  const allQuestionsCountHard = data.allQuestionsCount[3];

  console.log("allQuestionsCountEasy:", allQuestionsCountEasy.count)
  console.log("allQuestionsCountMedium ", allQuestionsCountMedium.count)
  console.log("allQuestionsCountHard ",allQuestionsCountHard.count)



//jo humne submit kiya hai
  const easyStats = acSubmissionNum[1];
  const mediumStats = acSubmissionNum[2];
  const hardStats = acSubmissionNum[3];

  console.log("easyStats", easyStats.count)
  console.log("mediumStats ", mediumStats.count)
  console.log("hardStats ", hardStats.count)
  
  const easyPercent = (easyStats.count / allQuestionsCountEasy.count) * 100 || 0;
  const mediumPercent = (mediumStats.count / allQuestionsCountMedium.count) * 100 || 0;
  const hardPercent = (hardStats.count / allQuestionsCountHard.count) * 100 || 0;
  
  console.log("easyPercent new ", easyPercent.toFixed(1))
  console.log("mediumPercent new ", mediumPercent.toFixed(1))
  console.log("hardPercent new ", hardPercent.toFixed(1))

  const easyPercentData = (easyStats.count + "/"+ allQuestionsCountEasy.count);
  const mediumPercentData = (mediumStats.count +"/"+ allQuestionsCountMedium.count);
  const hardPercentData = (hardStats.count + "/"+ allQuestionsCountHard.count);

  console.log("easyPercentData ", easyPercentData)
  console.log("mediumPercentData ", mediumPercentData)
  console.log("hardPercentData ", hardPercentData)

  outofData[0].textContent = easyPercentData;
  outofData[1].textContent = mediumPercentData;
  outofData[2].textContent = hardPercentData;  

  easychart.style.setProperty("--chart1", `${easyPercent.toFixed(1)}%`);
  mediumchart.style.setProperty("--chart2", `${mediumPercent.toFixed(1)}%`);
  hardchart.style.setProperty("--chart3", `${hardPercent.toFixed(1)}%`);
}
