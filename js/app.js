var gApp = angular.module('myApp', ['ngRoute', 'firebase'])
    .constant('FIREBASE_URL', 'https://angdata-nikolai3d.firebaseio.com/');

//This entire block is for trapping the error condition, in case a route does not resolve.
//We use it to detect unauthenticated attempts to access #/success.html route
gApp.run(['$rootScope',
    '$location',
    function($rootScope, $location) {
        $rootScope.$on('$routeChangeError',
            function(event, next, previous, error) {
                if (error == 'AUTH_REQUIRED') {
                    $rootScope.message = 'Sorry, you must log in to access that page';
                    $location.path('/login');
                } //listener
            }); //listener binding
    } //.run function 
]);

gApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
    }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
    }).when('/checkins/:uId/:mId', {
        templateUrl: 'views/checkins.html',
        controller: 'CheckInsController'
    }).when('/meetings', {
        templateUrl: 'views/meetings.html',
        controller: 'MeetingsController',
        resolve: {
            //No idea how it works yet. Just does, for now... 
            currentAuth: function(Authentication) {
                return Authentication.requireAuthentication();
            }
        } //resolve
    }).otherwise({
        redirectTo: '/login'
    });
}]);


gApp.controller('appController', ['$scope', function($scope) {
    $scope.message = "Welcome to my App";
}]);