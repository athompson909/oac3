app.controller('BlogCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.jumbotronTitle = "Adventure Log";
        $scope.innerTitle = "Our adventures";

        $scope.articles = [];
        var ref = firebase.database().ref().child('allArticles');
        ref.once('value').then(function (obj) {
            $scope.articles = obj.val();
            $scope.$apply(function () {
                addToLink($scope.articles);
            });
        });

        $scope.featured = [];
        var ref2 = firebase.database().ref().child('featured');
        ref2.once('value').then(function (obj) {
            $scope.featured = obj.val();
            $scope.$apply(function () {
                addToLink($scope.featured);
            });
        });

    }
]);
