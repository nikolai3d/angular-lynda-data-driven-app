/*global gApp */
/*global Firebase */

gApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
    function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

        var fbRef = new Firebase(FIREBASE_URL);
        var fbAuth = $firebaseAuth(fbRef);

        fbAuth.$onAuth(function(iAuthUserData) {
            if (iAuthUserData) {
                var meetingsDBRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');

                var meetingsInfo = $firebaseArray(meetingsDBRef); //We'll push meeting info into this

                //This array is now synchronized, and will change as the records are added/deleted
                //This is FireBase feature called "three-way data binding". Very cool.

                $scope.ourMeetings = meetingsInfo;

                var updateMeetingCount = function(){
                    $rootScope.howManyMeetings = meetingsInfo.length;
                };

                var meetingsDataLoadedPromise = meetingsInfo.$loaded(); //promise which is 
                    //fulfilled whenever data arrives from the database;
                
                meetingsDataLoadedPromise.then(updateMeetingCount); //promise handler 
                    //This fires when data is loaded from the database.
                
                meetingsInfo.$watch(updateMeetingCount);
                    //This fires when data is changed by the application.

                $scope.addMeeting = function() { //Called from Add Meeting form's submit
                    var addMeetingPromise = meetingsInfo.$add({
                        name: $scope.meetingname,
                        date: Firebase.ServerValue.TIMESTAMP
                    }); //add started

                    addMeetingPromise.then(function() {
                        $scope.meetingname = '';
                    }); //promise, add done

                }; //addMeeting
                
                $scope.deleteMeeting = function(iMeetingHash) {
                    meetingsInfo.$remove(iMeetingHash);
                }; //deleteMeeting
            } //User authenticated
        }); //$onAuth
    } //Controller
]);