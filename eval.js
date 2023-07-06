
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJOnw15u6nymfMu2xocawWBj08VIKM_O4",
  authDomain: "philam-evaluation-database.firebaseapp.com",
  databaseURL: "https://philam-evaluation-database-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "philam-evaluation-database",
  storageBucket: "philam-evaluation-database.appspot.com",
  messagingSenderId: "435913174368",
  appId: "1:435913174368:web:5909549a8e1fd573e2c205"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

//buttons
const submitBtn = document.getElementById('submit-btn');


//inputs 
const nameInput = document.getElementById('employee-name');
const positionInput = document.getElementById('position');
const appraisalPeriodInput = document.getElementById('appraisal-period');
const dateInput = document.getElementById('date-input');

//Choices

const choicesButtons = document.querySelectorAll('.choices')

//Comments

const comments = document.querySelectorAll('[id^="comment-"]');


//Table Elements
const scoreTds = document.querySelectorAll('[id^="score"]');
const averageTd = document.getElementById('average-td')
//User Database

const respondantRef = ref(db, 'eval')

submitBtn.addEventListener("click",function(){
  saveData()
  resetForm();
  showTab(0);

  window.location.href = "respond.html"
});

choicesButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const choice = event.target
    const questionId = choice.getAttribute('data-question')

    const scoreTd = document.getElementById(`score${questionId}`);

    const selectedChoice = choice.innerText

    const score = calculateScore(selectedChoice);

    // averageTd.innerText = calculateAverageOfChoices(score)

    scoreTd.innerText = score;

   calculateAverageOfChoices()
  
  });

});

choicesButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add('selected')
  })
})



function calculateScore(choice) {
  let score;

  switch(choice) {
    case "One":
    score = 1;
    break;
    case "Two":
    score = 2;
    break;
    case "Three":
    score = 3;
    break;
    case "Four":
    score = 4;
    break;
  }
  return score;
}

function saveData() {
  const newRespondantRef = push(ref(db, 'eval'))
 
  set(newRespondantRef, {
    name: nameInput.value,
    position: positionInput.value,
    appraisalPeriod: appraisalPeriodInput.value,
    date: dateInput.value,
    performance_indicators_1: scoreTds[0].innerText,
    comment_1: comments[0].value,
    KOF_2: scoreTds[1].innerText,
    comment_2:  comments[1].value,
    Accuracy_3: scoreTds[2].innerText,
    comment_3:  comments[2].value,
    Attendance_4: scoreTds[3].innerText,
    comment_4:  comments[3].value,
    Punctuality_5: scoreTds[4].innerText,
    comment_5:  comments[4].value,
    Effectiveness_6: scoreTds[5].innerText,
    comment_6:  comments[5].value,
    Prioritize_7: scoreTds[6].innerText,
    comment_7:  comments[6].value,
    interpersonal_8:scoreTds[7].innerText,
    comment_8:  comments[7].value,
    adaptility_9:scoreTds[8].innerText,
    comment_9:  comments[8].value,
    flexibility_10: scoreTds[9].innerText,
    comment_10:  comments[9].value,
    cooperative_11: scoreTds[10].innerText,
    comment_11:  comments[10].value,
    average: averageTd.innerText,
    prepared_by: "" ,
    date_prepared: ""
  
  })
  alert("Form Submitted")
  resetForm()
}


function calculateAverageOfChoices() {
  const scores = Array.from(scoreTds).map((scoreTd) => parseInt(scoreTd.innerText));

  const sum = scores.reduce((accumulator, score) => accumulator + score, 0);
  const average = sum / scores.length;
  
  averageTd.innerText = isNaN(average) ? '' : average.toFixed(2);
}


function resetForm() {
  nameInput.value = "";
  positionInput.value = "";
  appraisalPeriodInput.value ="";
  dateInput.value = "";

  scoreTds.forEach((scoreTd) => {
    scoreTd.innerText =""
  })
 comments.forEach((comment) => {
  comment.value = ""
 })
 averageTd.innerText = ""
   
 currentStep = 0;
  }


//Nav Toggle

const toggleBtn = document.querySelector('.toggle-btn') 
const linksContainer = document.querySelector('.menu')

toggleBtn.addEventListener('click', function() {
    linksContainer.classList.toggle('active')
})


//show Step
var steps = document.querySelectorAll('.step');
console.log(steps)

let currentStep = 0;

showTab(currentStep);

function showTab(n) {
  // Hide all steps
  steps.forEach(step => {
    step.style.display = "none";
  });

  // Display the current step
  steps[n].style.display = "flex";

  
}

function nextPrev() {
  // Hide the current step
  steps[currentStep].style.display = "none";

  // Update the current step
  currentStep += 1;

  if (currentStep >= steps.length) {
    currentStep = steps.length - 1; // Set current step to the last step
  }

  if (currentStep === 1) {
    steps[1].style.display = "flex"; // Show the third step
  } else {
    steps[currentStep].style.display = "flex"; // Show the next step
  }

  console.log('next');
}


const nextBtn = document.querySelectorAll('.next-btn');

console.log(nextBtn)

nextBtn.forEach((button) => {
   button.addEventListener("click", function () {
    if (currentStep === 1) {
      validateForm();
    } else if  (currentStep === 0 && nameInput.textContent === "") {
      alert('Please Fill in Name.')
    }  else {
      nextPrev();
    }

   })
})


//Back Button

const backBtn = document.getElementById('back-page-btn') 
const backBtn2 = document.getElementById('back-page-btn2')

backBtn2.addEventListener("click", function() {
  // Hide the current step
  steps[currentStep].style.display = "none";
  
  // Update the current step
  currentStep -= 1;
  
  if (currentStep < 0) {
    currentStep = 0; // Set current step to the first step
  }
  
  // Show the previous step
  steps[currentStep].style.display = "flex";
});
backBtn.addEventListener("click", function() {
  // Hide the current step
  steps[currentStep].style.display = "none";
  
  // Update the current step
  currentStep -= 1;
  
  if (currentStep < 0) {
    currentStep = 0; // Set current step to the first step
  }
  
  // Show the previous step
  steps[currentStep].style.display = "flex";
});

//Restart Button

const restartFormBtn = document.getElementById('restart-form-btn')


restartFormBtn.addEventListener("click", function() {
  resetForm();
  showTab(0);
});

const choicesBtns = document.querySelectorAll('.choice')


choicesBtns.forEach(function(button) {
  button.addEventListener("click", function() {
    const currentChoice = button;
    const currentChoicesDiv = button.parentNode;

    currentChoicesDiv.querySelectorAll('.choice').forEach(choice => {
       choice.classList.remove('border-button');
    });
    currentChoice.classList.add('border-button');
  });
});



function validateForm() {
  let isValid = true;

  const questions = document.querySelectorAll('.question');

  questions.forEach((question) => {
    const choices = question.querySelectorAll('.choices');
    let isChoiceSelected = false;

    choices.forEach((choice) => {
      if (choice.classList.contains('selected')) {
        isChoiceSelected = true;
      }
    });

    if (!isChoiceSelected) {
      isValid = false;
    }
  });

  if (isValid) {
   nextPrev()
  } else {
    alert('Please answer all the questions.');
  }
}
