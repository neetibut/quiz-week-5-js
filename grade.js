import fs from "fs";

// ✅ Check if answers.md exists
const answersFile = "README.md";
try {
  await fs.promises.access(answersFile);
} catch (error) {
  console.error("❌ answers.md not found.");
  console.log("[autograding-result] File Existence Check: 0/1");
  process.exit(1);
}

// Read student answers
const content = await fs.promises.readFile(answersFile, "utf-8");

// ✅ Define correct answers
const correctAnswers = {
  1: "C", // Data types
  2: "C", // Variables
  3: "A"  // Conditionals
};

let totalScore = 0;
const maxScore = Object.keys(correctAnswers).length;

// ✅ Extract student answers using regex
const regex = /## 📌 Question (\d+):.*?\n\n\*\*Answer:\*\* *(A|B|C|D)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const questionNumber = parseInt(match[1]);
  const studentAnswer = match[2].trim().toUpperCase();

  if (correctAnswers[questionNumber] === studentAnswer) {
    console.log(`✅ Question ${questionNumber} is correct.`);
    totalScore += 1;
    console.log(`[autograding-result] Question ${questionNumber}: 1/1`);
  } else {
    console.error(`❌ Question ${questionNumber} is incorrect. Expected: ${correctAnswers[questionNumber]}, Got: ${studentAnswer}`);
    console.log(`[autograding-result] Question ${questionNumber}: 0/1`);
  }
}

// ✅ Final Score Output for GitHub Classroom
console.log(`[autograding-result] Total Score: ${totalScore}/${maxScore}`);

process.exit(totalScore === maxScore ? 0 : 1);
