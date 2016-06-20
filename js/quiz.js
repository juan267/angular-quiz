(function(){

 var app = angular.module('myQuiz', [])

 app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

    $scope.score = 0
    $scope.activeQuestion = -1
    $scope.percentage = 0

    $http.get('quiz_data.json')
      .then(function(quizData){
        $scope.myQuestions = quizData.data
        $scope.totalQuestions = $scope.myQuestions.length
      })

    $scope.selectedAnswer = function(qIndex, aIndex) {
      var questionState = $scope.myQuestions[qIndex].questionState

      if (questionState !== 'Answered') {
        $scope.myQuestions[qIndex].selectedAnswer = aIndex
        var correctAnswer = $scope.myQuestions[qIndex].correct
        $scope.myQuestions[qIndex].correctAnswer = correctAnswer
        if (aIndex === correctAnswer) {
          $scope.score++
          $scope.myQuestions[qIndex].correctness = 'correct'
        } else {
          $scope.myQuestions[qIndex].correctness = 'incorrect'
        }

        $scope.myQuestions[qIndex].questionState = 'Answered'
      }

      $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1)
    }

    $scope.isSelected = function(qIndex, aIndex) {
      return $scope.myQuestions[qIndex].selectedAnswer === aIndex
    }

    $scope.isCorrect = function(qIndex, aIndex) {
      return $scope.myQuestions[qIndex].correctAnswer === aIndex
    }

    $scope.selectContinue = function(){
      return $scope.activeQuestion += 1
    }

    $scope.createShareLinks = function(percentage) {
      var url = 'http://makeitreal.camp'

      var emailLInk = "<a class='btn email' href='mailto:?subject=Try to beat my quiz socre!&amp;body=I scored a "+percentage+"% on this quiz about Saturn. Try to beat my score at " + url + "'>Email a Friend</a>"

      var twitterLink = "<a class='btn twitter' target='_blank' href='http://twitter.com/share?text=I scored a"+percentage+"&amp;'>Tweet my Score</a>"

      var newMarkup = emailLInk + twitterLink

      return $sce.trustAsHtml(newMarkup)
    }

 }])

})();


$(document).ready(function() {
  var cont = 0;

  $("#add").click(function(){

    $('ul').append(' <li class="elements">Elemento '  + cont +' </li>');
    cont=cont+1;

    $("li").click(function(){
      console.log(this)
      if ($(this).hasClass('marked')) {
        $(this).removeClass('marked');
      } else {
        $(this).addClass('marked') ;
      }

    });

  });

});



