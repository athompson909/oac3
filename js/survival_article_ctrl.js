app.controller('SurvivalArticleCtrl', [
    '$scope',
    function($scope){

      $scope.article = {};
      $scope.id = getParameterByName('id', null);
      $scope.getArticle = function() {
        console.log('id: '+id);

        var ref = firebase.database().ref().child('survivalArticles').child(id);
        ref.once('value').then(function(obj) {
          $scope.article = obj.val();
          $scope.$apply(function() {
            setBackgroundImage($scope.article.jumbotronImageUrl);
          });
        });
      }
      $scope.getArticle();

      $scope.featured = [];
      var ref2 = firebase.database().ref().child('featured');
      ref2.once('value').then(function(obj) {
        $scope.featured = obj.val();
        $scope.$apply(function() {
          add2ToLink($scope.featured);
        });
      });
    }
]);
