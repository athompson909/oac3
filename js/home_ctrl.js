app.controller('HomeCtrl', [
    '$scope',
    '$window',
    '$firebaseArray',
    function ($scope, $window, $firebaseArray) {
        setTimeout(function () {
            if(showOverlay) {
                // openNav();
            }
        }, 20000);

        // TODO: remove
        $scope.jumbotronWelcome = 'Sup??? welcome to...';
        $scope.jumbotronTitle = 'Outdoor Adventure Crew';

        $scope.changed = false;
        $scope.wide = window.outerWidth > 740;
        // console.log($scope.wide);

        // email related stuff
        var ref = firebase.database().ref().child("emails");
        $scope.emailList = $firebaseArray(ref);
        // console.log($scope.emailList);
        var emailSent = false;

        $scope.email = 'Email address';
        $scope.emailStyle="color:#ccc;";
        $scope.emailInviteStyle="display:block;";
        $scope.thankyouStyle="display:none;";
        $scope.emailInviteStyle = getEmailInviteStyle($scope.wide);
        $scope.thankyouStyle = getThankyouStyle($scope.wide);
        $scope.overlayInnerStyle = getOverlayInnerStyle($scope.wide);

        $scope.update = function(email) {
            if(validateEmail(email)) {
                // console.log(email);
                $scope.emailList.$add(email);
                $scope.email = '';
                emailSent = true;

                $scope.emailInviteStyle = getEmailInviteStyle($scope.wide);
                $scope.thankyouStyle = getThankyouStyle($scope.wide);
                $scope.overlayInnerStyle = getOverlayInnerStyle($scope.wide);

                setTimeout(function() {
                    closeNav();
                }, 2000);
            }
        };

        $scope.removeHint = function() {
            $scope.emailStyle="color:#000;";
            $scope.email = '';
        };

        $scope.showHint = function() {
            if($scope.email == '') {
                $scope.emailStyle="color:#ccc;";
                $scope.email = 'Email address';
            }
        };
        $scope.showHint();


        $scope.thumbnailRowStyle = getThumbnailRowStyle($scope.wide);
        $scope.thumbnailStyle = getThumbnailStyle($scope.wide);


        $scope.advlog = {
            title: "Grand Canyon South Rim!",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/thumbnail%20images%2Fgcsr.jpg?alt=media&token=d1cf6fb2-2066-4ec1-9795-7ed271e954cd",
            link: "blog/article/index.html?id=2"
        };
        $scope.gearrev = {
            title: "Journey Water Bottles Review",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/journeywaterbottle%2Ftitle.jpg?alt=media&token=9126771c-e51e-48f8-b2dc-3931f7f60efa",
            link: "gearrev/article/index.html?id=0"
        };
        $scope.survtip = {
            title: "Doughnut Falls",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/doughnut%20falls%2Fdf-thumbnail.jpg?alt=media&token=9db1d823-84e5-4343-9529-1fb122e4c387",
            link: "blog/article/index.html?id=3"
        };

        $scope.featured = [];
        var ref2 = firebase.database().ref().child('featured');
        ref2.once('value').then(function (obj) {
            $scope.featured = obj.val();
            $scope.$apply();
        });

        angular.element($window).bind('resize', function() {
            if($window.outerWidth < 740 && $scope.wide) {
                $scope.changed = true;
                $scope.wide = false;
            }
            else if($window.outerWidth > 740 && !$scope.wide) {
                $scope.changed = true;
                $scope.wide = true;
            }
            else $scope.changed = false;

            if($scope.changed) {
                $scope.thumbnailStyle = getThumbnailStyle($scope.wide);
                $scope.thumbnailRowStyle = getThumbnailRowStyle($scope.wide);
                $scope.emailInviteStyle = getEmailInviteStyle($scope.wide);
                $scope.thankyouStyle = getThankyouStyle($scope.wide);
                $scope.overlayInnerStyle = getOverlayInnerStyle($scope.wide);
                changed = false;
            }

            $scope.$digest();
        });

        function getThumbnailStyle(homeWide) {
            console.log('changing wide?='+homeWide)
            return homeWide ? 'width:32%'
                : 'width:100%;margin-bottom: 4em;';
        }

        function getThumbnailRowStyle(homeWide) {
            return homeWide ? 'display:flex;justify-content:space-between'
                : 'display:block;margin: 0 10%';
        }

        function getEmailInviteStyle(homeWide) {
            return homeWide ?
                (emailSent ? 'display:none' :'display:block;top:15%;width:75%;height:30%;font-size:32px;')
                : (emailSent ? 'display:none' : 'display:block;top:20%;width:80%;height:60%;font-size:18px;');
        }

        function getThankyouStyle(homeWide) {
            return homeWide ?
                (emailSent ? 'display:block;top:15%;width:75%;height:30%;font-size:32px;' : 'display:none;')
                : (emailSent ? 'display:block;top:20%;width:80%;height:60%;font-size:18px' : 'display:none;');
        }

        function getOverlayInnerStyle(homeWide) {
            return homeWide ? '' : 'font-size:18px;line-height:22px;';
        }
    }
]);
// old ys title: https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/Yellowstone%2Ftitle_cropped_ys.jpg?alt=media&token=638b6cb9-7d87-4858-8f93-5d0ae331042c
// and then the more planar one: https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/Yellowstone%2Ftitle.jpg?alt=media&token=836feebb-2810-4277-9b7c-dc7c16bf77a5