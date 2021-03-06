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


        $scope.sortOrder = "date";
        $scope.sortDirection = null;
        $scope.query = "";
        $scope.randomRecordID = "";


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

        $scope.pickRandom = function() {
            var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
            $scope.randomRecordID = checkinsList.$keyAt(whichRecord);
        }; //pickRandom Pick the Winner!

        $scope.resetRandom = function() {
            $scope.randomRecordID = "";
        }; //resetRandom

        $scope.awardFormToggle = function(myCheckin) {
            myCheckin.show = !myCheckin.show;

            if (myCheckin.userState == 'expanded') {
                myCheckin.userState = '';
            }
            else {
                myCheckin.userState = 'expanded';
            } //This gets fed to list item's classes through ng-class directive.
        }; //awardFormToggle

        $scope.giveAward = function(myCheckin, myGift) {
            var fbCheckinAwardsRef = new Firebase(FIREBASE_URL +
                'users/' + $scope.whichUser +
                '/meetings/' + $scope.whichMeeting +
                '/checkins/' + myCheckin.$id + '/awards');

            var checkinsArray = $firebaseArray(fbCheckinAwardsRef);

            var myData = {
                name: myGift,
                date: Firebase.ServerValue.TIMESTAMP
            };

            checkinsArray.$add(myData);
        }; //giveAward 

        $scope.deleteAward = function(checkinID, awardKey) {
            var fbCheckinAwardToDeleteRef = new Firebase(FIREBASE_URL +
                'users/' + $scope.whichUser +
                '/meetings/' + $scope.whichMeeting +
                '/checkins/' + checkinID + '/awards/' + awardKey);

            var fbCheckinAwardToDeleteRecord = $firebaseObject(fbCheckinAwardToDeleteRef);

            fbCheckinAwardToDeleteRecord.$remove(awardKey);


        };

    } //Controller
]);