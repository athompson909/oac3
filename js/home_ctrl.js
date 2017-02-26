var baseUrl = "file:///Users/adamthompson/Documents/personal/oacclone/oac2/nonrouteversion/";

app.controller('HomeCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.jumbotronWelcome = 'Sup??? welcome to...';
        $scope.jumbotronTitle = 'Outdoor Adventure Crew';

        $scope.advlog = {
            title: "Traveling Down",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/grandcanyon%2Fthumbnail.png?alt=media&token=0b3539ed-c036-42b9-9742-a39d23937cb4",
            link: "blog/article/index.html?id=2"
        };
        $scope.gearrev = {
            title: "Alpine Liesure Co. Gear Review",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/alpineliesureco%2Ftitle_cropped_alpine.jpg?alt=media&token=042ee269-f637-4088-a6c5-5d742b75797d",
            link: "gearrev/article/index.html?id=0"
        };
        $scope.survtip = {
            title: "3 Utah County Adventures you NEED to try this winter",
            image: "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/winteractivitiessurvguide%2Ftitle_cropped.jpg?alt=media&token=78634308-07d9-42eb-9f42-b755261f9b77",
            link: "survival/article/index.html?id=0"
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