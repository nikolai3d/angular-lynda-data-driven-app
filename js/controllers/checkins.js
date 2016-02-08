gApp.controller('CheckInsController', [
    '$scope',
    '$rootScope',
    '$firebaseObject',
    '$firebaseArray',
    '$routeParams', //For URL parameters (extra data passed with checkins.html route) 
    'FIREBASE_URL',
    function(
        $scope,
        $rootScope,
        $firebaseObject,
        $firebaseArray,
        $routeParams,
        FIREBASE_URL) {

        var fbRef = new Firebase(FIREBASE_URL);

    } //Controller
]);