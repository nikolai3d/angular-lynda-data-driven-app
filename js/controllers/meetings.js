gApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
    function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

        var fbRef = new Firebase(FIREBASE_URL);
        var fbAuth = $firebaseAuth(fbRef);

        fbAuth.$onAuth(function(iAuthUserData) {
            if (iAuthUserData) {
                var meetingsDBRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');

                var meetingsInfo = $firebaseArray(meetingsDBRef); //We'll push meeting info into this

                $scope.ourMeetings = meetingsInfo;

                $scope.addMeeting = function() { //Called from Add Meeting form's submit
                    var addMeetingPromise = meetingsInfo.$add({
                        name: $scope.meetingname,
                        date: Firebase.ServerValue.TIMESTAMP
                    }); //add started

                    addMeetingPromise.then(function() {
                        $scope.meetingname = '';
                    }); //promise, add done

                }; //addMeeting
            }; //User authenticated
        }); //$onAuth
    } //Controller
]);