function Convert() {
  //Get the text from the plainText input. 
  var plaintextInput = formatPlainText($('#plaintextInput').val().split('\n'));
  var Questions = [];

   
   for (var i = 0; i < plaintextInput.length; i++) {
      if (plaintextInput[i] != '') {
         var Question = {
            questionType: "",
            maxScoreValue: 1,
            questionText: "",
            hintText: "none",
            hintMedia: "none",
            answers: []
         }
         var Answer = {
            answerText: "",
            feedBack: "",
            scoreValue: 0
         }
         for (var j = 0; (plaintextInput[i + j] != '') && (i + j != plaintextInput.length); j++) {
            if (j === 0) {
               Question.questionText = plaintextInput[i];
            } else {
               Answer.questionText = plaintextInput[i + j];
            Question.answers.push(Answer); 
            }
            
         }
         Questions.push(Question);
         i = i + j;
      }
      
   }
   
    console.log(Questions);



  //Default 'General' settings for the quiz. 
  var quizObject = {
    General: {
      QuizName: "Activity Title",
      HeadingLevel: 1,
      instructions: "none",
      feedbackType: "continuous",
      forceCorrect: false,
      repeatOnComplete: true,
      allowNone: false,
      allowPrevious: true,
      showHints: false,
      allowPartial: true,
      randomize: true,
      subtractWrong: false,
      preQuizText: "none",
      preQuizMedia: "none",
      postQuizText: "none",
      postQuizMedia: "none"
    }
  };
  //Output a formatted JSON version of the quizObject to the jsonOutput textarea. 
  $('#jsonOutput').val(JSON.stringify(quizObject, null, "\t"));
}

//Searches through array of strings and removes empty lines if there's more than one of them in a row. 
function formatPlainText(array) {
  var previousEnter = false;
  var redundantLines = [];
  
  for (var i = 0; i < array.length; i++) {
      //Sets any lines that are JUST spaces to ''
    if (isSpaces(array[i])) {
        array[i] = '';
    }
   
     //Trim lines
    array[i] = array[i].trim();
    
    if (array[i] === '' && !previousEnter) {
      previousEnter = true;
    } else if (array[i] === '' && previousEnter) {
      redundantLines.push(i);
    } else if (array[i] != '') {
      previousEnter = false;
    }
  }

  for (var j = redundantLines.length; j > 0; j--) {
    array.splice(redundantLines[j - 1], 1);

  }
  //After clean up, removes the leading or trailing newline, if there is one. 
    if (array[array.length - 1] === '') {
        array.splice(array.length - 1, 1);
    }
  if (array[0] === '') {
    array.splice(0, 1);
  }
  return array;
}

function isSpaces(testString) {
    var justSpaces = /^\s+$/;
    if (justSpaces.test(testString)) {
        return true;
    }
    return false;
}