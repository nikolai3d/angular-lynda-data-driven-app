/*global gApp */
/*global Firebase */

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

        $scope.whichMeeting = $routeParams.mId;
        $scope.whichUser = $routeParams.uId;
        
        var fbMeetingRef = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings/' + 
        $scope.whichMeeting + '/checkins');
        
        var checkinsList = $firebaseArray(fbMeetingRef);
        
        $scope.currentCheckins = checkinsList;
        
        
        $scope.addCheckin = function() {
            var checkinsInfo = $firebaseArray(fbMeetingRef);
            var checkinEntry = {
                firstname: $scope.user.firstname, 
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                date: Firebase.ServerValue.TIMESTAMP
            }; //checkinEntry
            
            checkinsInfo.$add(checkinEntry);
            
        } //addCheckin
    } //Controller
]);