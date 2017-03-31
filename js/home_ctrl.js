app.controller('HomeCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.jumbotronWelcome = 'Sup??? welcome to...';
        $scope.jumbotronTitle = 'Outdoor Adventure Crew';

        $scope.advlog = {
            title: "Grand Canyon South Rim!",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/thumbnail%20images%2Fgcsr.jpg?alt=media&token=d1cf6fb2-2066-4ec1-9795-7ed271e954cd",
            link: "blog/article/index.html?id=2"
        };
        $scope.gearrev = {
            title: "Alpine Liesure Co. Gear Review",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/thumbnail%20images%2Falcr.jpg?alt=media&token=1ca79755-8d57-4fe6-b15a-816475472b05",
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
    }
]);
// old ys title: https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/Yellowstone%2Ftitle_cropped_ys.jpg?alt=media&token=638b6cb9-7d87-4858-8f93-5d0ae331042c
// and then the more planar one: https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/Yellowstone%2Ftitle.jpg?alt=media&token=836feebb-2810-4277-9b7c-dc7c16bf77a5