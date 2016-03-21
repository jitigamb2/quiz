var app = angular.module('quizApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'components/home/homeView.html',
			controller: 'homeCtrl',
			resolve: {
				quizList: function (quizService) {
					console.log(quizService);
					return quizService.getQuizNames();
				},
				pastQuizList: function (quizService) {
					//return quizService.getPastQuizzes();
				}
			}
		})
		.state('quiz', {
			url: '/quiz/:quizName',
			templateUrl: 'components/quiz/views/quizContainerView.html',
			controller: 'quizCtrl',
			resolve: {
				questions: function (quizService, $stateParams) {
					console.log($stateParams.quizName);
					var name = $stateParams.quizName;
					return quizService.getQuestions(name);
				}
			},
		})
		.state('quiz.view', {
			parent: 'quiz',
			views: {
				'list': {
					templateUrl: 'components/quiz/views/questionListWrapperView.html'
				},
				'detail': {
					templateUrl: 'components/quiz/views/questionDetailView.html'
				}
			}
		})
		.state('results', {
			url: '/results',
			templateUrl: 'components/results/resultsView.html',
			controller: 'ResultsCtrl',
			params: {
				quizName: '',
				quiz: ''	
			},
			resolve: {
				answers: function (quizService, $stateParams) {
					var quizName = $stateParams.quizName;
					var quiz = $stateParams.quiz;
					return quizService.getAnswers(quizName, quiz);
				},
				questions: function (quizService, $stateParams) {
					var name = $stateParams.quizName
					return quizService.getQuestions(name);
				} 	
			}
		})
})


// app.run(function ($rootScope, $state) {
	
// 	$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
// 		console.log('error', error);
// 	});
	
// 	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
// 		if(toState.name === 'quiz') {
// 			event.preventDefault();
// 			$state.go('quiz.view', toParams)
// 		}
// 	})
// });