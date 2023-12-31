 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
 import { getDatabase, ref, get, set, push} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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

 //table Elements Id 

 const knowledgeDutiesText = document.getElementById('knowledge-duties-text');
 const productivityText = document.getElementById('productivity-text');
 const accuracyText = document.getElementById('accuracy-text');
 const attendanceText = document.getElementById('attendance-text');
 const punctualityText = document.getElementById('punctuality-text');
 const efficiencyText = document.getElementById('efficiency-text');
 const prioritiesText = document.getElementById('priorities-text');
 const communicationText = document.getElementById('communication-text');
 const adaptilityText = document.getElementById('adaptility-text');
 const flexibilityText = document.getElementById('flexibility-text');
 const cooperativeText = document.getElementById('cooperative-text');

 // table comments

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

const evaluationRef = ref(db, 'eval')


get(evaluationRef).then((snapshot) => {
    if (snapshot.exists) {
        const evaluations = snapshot.val()
    for (const evaluationId in evaluations) {
    const evaluation = evaluations[evaluationId] 
    const scores = {
      knowledgeDuties: evaluation.performance_indicators_1,
      productivity: evaluation.KOF_2,
      accuracy: evaluation.Accuracy_3,
      attendance: evaluation.Attendance_4,
      punctuality: evaluation.Punctuality_5,
      efficiency: evaluation.Effectiveness_6,
      priorities: evaluation.Prioritize_7,
      communication: evaluation.interpersonal_8,
      adaptility: evaluation.adaptility_9,
      flexibility: evaluation.flexibility_10,
      cooperative: evaluation.cooperative_11
    }
    const comments = {
      comment1: evaluation.comment_1,
      comment2: evaluation.comment_2,
      comment3: evaluation.comment_3,
      comment4: evaluation.comment_4,
      comment5: evaluation.comment_5,
      comment6: evaluation.comment_6,
      comment7: evaluation.comment_7,
      comment8: evaluation.comment_8,
      comment9: evaluation.comment_9,
      comment10: evaluation.comment_10,
      comment11: evaluation.comment_11,
    }
        createUserBox(evaluation.name, evaluation.appraisalPeriod, evaluation.date, evaluation.position, evaluation.average, scores, comments, evaluationId)
      
    }
  }
})

const modalContainer = document.querySelector('.board');

for (let a = 1; a < 12; a++) {
  const commentOpenRow = document.getElementById(`comment-open${a}`);
  console.log(commentOpenRow)
  commentOpenRow.addEventListener("click", function() {
    const commentTd3 = document.getElementById(`comments-td-${a}`)
    commentTd3.classList.toggle('reveal-comment')
    console.log("clicked")
    console.log(commentTd3)
  })
}

function createUserBox(username, appraisal, date, position, average, scores, comments, id) {
        const userList = document.querySelector('.list ul');
      
        // Create the necessary HTML elements
        const userBox = document.createElement('div');
        userBox.classList.add('user-box');
      
        const nameBox = document.createElement('div');
        nameBox.classList.add('name-box');
      
        const usernameElement = document.createElement('h1');
        usernameElement.classList.add("filter-name")
        usernameElement.textContent = username;
        nameBox.appendChild(usernameElement);

        const badge =  `<h4>${date} <span class="label">${average}</span></h4>`;

        

        nameBox.insertAdjacentHTML("beforeend", badge);
        

          const revealDetailsBox = document.createElement('div');
          revealDetailsBox.classList.add('reveal-details-box');
        
          const hr = document.createElement('hr');
          const positions = document.createElement('h2');
          positions.textContent = position;

          const appraisalPeriod = document.createElement('h2');
          appraisalPeriod.textContent = appraisal; // Modify as per your data structure
          const dateHired = document.createElement('h3');
          dateHired.textContent = 'Date Hired:' + " " + date; // Modify as per your data structure
          const detailsButton = document.createElement('button');
          detailsButton.textContent = 'Details';
          detailsButton.classList.add('detail-btn')
        
          const printButton = document.createElement('button');
          printButton.textContent = 'Print';
          printButton.classList.add('print-btn')
          // Add event listener to the details button if needed
        
          // Append the elements to the user box
          revealDetailsBox.appendChild(hr);
          revealDetailsBox.appendChild(positions);
          revealDetailsBox.appendChild(appraisalPeriod);
          revealDetailsBox.appendChild(dateHired);
          revealDetailsBox.appendChild(detailsButton);
          revealDetailsBox.appendChild(printButton);
        
          userBox.appendChild(nameBox);
          userBox.appendChild(revealDetailsBox);
        
          // Append the user box to the user list
          userList.appendChild(userBox);


    
//Modal


         nameBox.addEventListener("click", function() {
            const allRevealDetailsBoxes = document.querySelectorAll('.reveal-details-box');
            const allUserBoxes = document.querySelectorAll('.user-box');
          
            userBox.classList.toggle('color')
            allRevealDetailsBoxes.forEach(function(detailsBox) {
              if (detailsBox === revealDetailsBox) {
                detailsBox.classList.toggle('reveal');
              } else {
                detailsBox.classList.remove('reveal');
              }
              
            });
            if (window.innerWidth > 1200) {
            const tableEl = document.getElementById('tableEl');
            modalContainer.style.display = "block";
            tableEl.classList.add('reveal-table')
            knowledgeDutiesText.textContent = scores.knowledgeDuties;
            productivityText.textContent = scores.productivity;
            accuracyText.textContent = scores.accuracy;
            attendanceText.textContent = scores.attendance;
            punctualityText.textContent = scores.punctuality;
            efficiencyText.textContent = scores.efficiency;
            prioritiesText.textContent = scores.priorities;
            communicationText.textContent = scores.communication;
            adaptilityText.textContent = scores.adaptility;
            flexibilityText.textContent =  scores.flexibility;
            cooperativeText.textContent =  scores.cooperative;

            for (let i = 1; i <= 11; i++) {
             const commentKey = `comment${i}`;
            const commentValue = comments[commentKey];
             const commentTd = document.getElementById(commentKey);
            commentTd.textContent = commentValue;
             } 
           }

              allUserBoxes.forEach(function(box) {
                if (box !== userBox) {
                  box.classList.remove('color');
                }
              })
             })
             printButton.addEventListener('click', function() {
         
              const username = usernameElement.textContent;
            
              const printURL = `print.html?id=${encodeURIComponent(id)}`;
            
              window.location.href = printURL;
             
            });
            
          detailsButton.addEventListener('click', function() {
            const tableEl = document.getElementById('tableEl');
            modalContainer.style.display = "block";

            
            
            tableEl.classList.add('reveal-table')
            knowledgeDutiesText.textContent = scores.knowledgeDuties;
            productivityText.textContent = scores.productivity;
            accuracyText.textContent = scores.accuracy;
            attendanceText.textContent = scores.attendance;
            punctualityText.textContent = scores.punctuality;
            efficiencyText.textContent = scores.efficiency;
            prioritiesText.textContent = scores.priorities;
            communicationText.textContent = scores.communication;
            adaptilityText.textContent = scores.adaptility;
            flexibilityText.textContent =  scores.flexibility;
            cooperativeText.textContent =  scores.cooperative;

            for (let b = 1; b <= 11; b++) {
              const commentKey = `comment${b}`;
              const commentValue = comments[commentKey];
              const commentTd = document.getElementById(commentKey);
              commentTd.textContent = commentValue;
            }
        })
  }
  


  const toggleBtn = document.querySelector('.toggle-btn');
  const navLinks = document.querySelector('.menu');
  
  toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
    });

  const closeModalBtn = document.querySelector('.close-btn') 

  closeModalBtn.addEventListener("click" ,function() {
    modalContainer.style.display = "none";
    document.body.classList.remove('modal-background');
  })


  const inputFilter = document.getElementById("filter");

  inputFilter.addEventListener("keyup", function() {
    const filter = inputFilter.value.toUpperCase();
    const names = document.querySelectorAll(".filter-name");
    const allUserBoxes = document.querySelectorAll('.user-box');
  
    for (let e = 0; e < allUserBoxes.length; e++) {
      const username = names[e].textContent.toUpperCase();
      const userBox = allUserBoxes[e];
  
      if (username.includes(filter)) {
        userBox.style.display = "block"; // Show the user box
      } else {
        userBox.style.display = "none"; // Hide the user box
      }
    }
  });
  
