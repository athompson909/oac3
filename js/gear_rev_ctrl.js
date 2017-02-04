app.controller('GearRevCtrl', [
    '$scope',
    function($scope) {
      $scope.jumbotronTitle = 'Our Reviews';
      $scope.articles = [];
      var ref = firebase.database().ref().child('allGearReviews');
      ref.once('value').then(function(obj) {
        $scope.articles = obj.val();
        $scope.$apply(function() {
          addToLink($scope.articles);
        });
      });

      $scope.featured = [];
      var ref2 = firebase.database().ref().child('featured');
      ref2.once('value').then(function(obj) {
        $scope.featured = obj.val();
        $scope.$apply(function() {
          addToLink($scope.featured);
        });
      });
    }
]);
