function Convert() {
  //Get the text from the plainText input. 
  var plaintextInput = removeExtraLines($('#plaintextInput').val().split('\n'));
  var Questions = [];




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
function removeExtraLines(array) {
  var previousEnter = false;
  var redundantLines = [];

  for (var i = 0; i < array.length; i++) {

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
  //After clean up, removes the leading newline, if there is one. 
  if (array[0] === '') {
    array.splice(0, 1);
  }

  return array;
}
