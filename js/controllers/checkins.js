/*global gApp */
/*global Firebase */

gApp.controller('CheckInsController', [
    '$scope',
    '$rootScope',
    '$location',
    '$firebaseObject',
    '$firebaseArray',
    '$routeParams', //For URL parameters (extra data passed with checkins.html route) 
    'FIREBASE_URL',
    function(
        $scope,
        $rootScope,
        $location,
        $firebaseObject,
        $firebaseArray,
        $routeParams,
        FIREBASE_URL) {

        $scope.whichMeeting = $routeParams.mId;
        $scope.whichUser = $routeParams.uId;

        var fbMeetingRef = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings/' +
            $scope.whichMeeting + '/checkins');

        var checkinsList = $firebaseArray(fbMeetingRef);

        $scope.currentCheckins = checkinsList; //Because of three-way data binding, as users are checking in, 
        //the list will update on everybody's screens (checkinslist.html)


        $scope.addCheckin = function() {
            var checkinsInfo = $firebaseArray(fbMeetingRef);
            var checkinEntry = {
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                date: Firebase.ServerValue.TIMESTAMP
            }; //checkinEntry

            var checkinAddedPromise = checkinsInfo.$add(checkinEntry);

            checkinAddedPromise.then(function() {
                $location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichMeeting + '/checkinslist');
            }); //on checkin add send the user to the checkins list. 
        }; //addCheckin

        $scope.deleteCheckin = function(id) {
            var fbCheckinRef = new Firebase(FIREBASE_URL + 
            'users/' + $scope.whichUser + 
            '/meetings/' + $scope.whichMeeting + 
            '/checkins/' + id);

            var fbRecord = $firebaseObject(fbCheckinRef);

            fbRecord.$remove(id);
        }; //deleteCheckin
    } //Controller
]);