function ConvertILQ() {
  //Get the text from the plainText input. 
  var plaintextInput = formatPlainText($('#plaintextInput').val().split('\n'));
  var Questions = [];
  var defaultCorrectFeedback = "That is correct! ";
  var defaultIncorrectFeedback = "That is not correct. ";

  for (var i = 0; i < plaintextInput.length; i++) {
    if (plaintextInput[i] != '') {
      var maxScoreValue = 0;
      var Question = {
        questionType: "Multiple Choice",
        maxScoreValue: 1,
        questionText: "",
        hintText: "none",
        hintMedia: "none",
        answers: []
      }
      for (var j = 0;
        (plaintextInput[i + j] != '') && (i + j != plaintextInput.length); j++) {
        var Answer = {
          answerText: "",
          feedBack: "",
          scoreValue: 0
        }
        var inputString = plaintextInput[i + j];
        var subStringSample = inputString.substr(0, 1);
        if (j === 0) {
          Question.questionText = inputString;
        } else {
          switch (subStringSample) {
            case "*":
              inputString = inputString.slice(1);
              Answer.answerText = inputString;
              Answer.scoreValue = 1;
              Question.answers.push(Answer);
              break;
            case "@":
              if (inputString.substr(0, 2) == "@@") {
                inputString = inputString.slice(2);
                for (var k = 0; k < Question.answers.length; k++) {
                  if (Question.answers[k].feedBack === "")
                    Question.answers[k].feedBack = inputString;

                }
              } else {
                inputString = inputString.slice(1);
                Question.answers[Question.answers.length - 1].feedBack = inputString;
              }

              break;
            default:
              Answer.answerText = inputString;
              Question.answers.push(Answer);
          }
        }
      }
      for (var k = 0; k < Question.answers.length; k++) {
        if (Question.answers[k].scoreValue === 0) {
          Question.answers[k].feedBack = defaultIncorrectFeedback.concat(Question.answers[k].feedBack).trim();
        } else {
          Question.answers[k].feedBack = defaultCorrectFeedback.concat(Question.answers[k].feedBack).trim();
          maxScoreValue++;
        }

      }
      if (maxScoreValue > 1) {
        Question.questionType = "All That Apply";
        Question.maxScoreValue = maxScoreValue;
      }
      Questions.push(Question);
      i = i + j;
    }
  }

  //Default 'General' settings for the quiz. 
  var quizObject = {
    General: {
      QuizName: "Activity Title",
      HeadingLevel: 1,
      instructions: "none",
      feedBackType: "continuous",
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
    },
    Questions: Questions
  };
  //Output a formatted JSON version of the quizObject to the jsonOutput textarea. 
  $('#jsonOutput').val(JSON.stringify(quizObject, null, 2));
  document.getElementById('downloadButton').disabled = false;
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quizObject, null, 2));
  var dlAnchorElem = document.getElementById('downloadButton');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", quizObject.General.QuizName + ".json");
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
