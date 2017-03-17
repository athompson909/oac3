app.controller('HomeCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.jumbotronWelcome = 'Sup??? welcome to...';
        $scope.jumbotronTitle = 'Outdoor Adventure Crew';

        $scope.advlog = {};
        $scope.gearrev = {};
        $scope.survtip = {};

        $scope.getMostRecent = function() {
            $http.get("http://localhost:8080/home?type=advlog")
                .then(function(response) {
                    console.log(response);
                    $scope.advlog = response.data;
                });

            $http.get("http://localhost:8080/home?type=gearrev")
                .then(function(response) {
                    console.log(response);
                    $scope.gearrev = response.data;
                });

            $http.get("http://localhost:8080/home?type=survtip")
                .then(function(response) {
                    console.log(response);
                    $scope.survtip = response.data;
                });
        };

        $scope.getMostRecent();



        $scope.featured = [];
        var ref2 = firebase.database().ref().child('featured');
        ref2.once('value').then(function (obj) {
            $scope.featured = obj.val();
            $scope.$apply();
        });
    }
]);
// old ys title: https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/Yellowstone%2Ftitle_cropped_ys.jpg?alt=media&token=638b6cb9-7d87-4858-8f93-5d0ae331042c
// and then the more planar one: https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/Yellowstone%2Ftitle.jpg?alt=media&token=836feebb-2810-4277-9b7c-dc7c16bf77a5
