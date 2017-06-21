var titleWide = false, titleChanged = false;

app.directive('articleBody', ['$window', function ($window) {
    return {
        link: link,
        restrict: 'E',
        template:
        '<div class="jumboimg jumbo-top" id="jumbo-main" style={{bgImg}}> '+
        '   <h1 dynamic="jumboTitle" style="{{topOffset}}"></h1>' +
        '</div>'
    };

    // TODO: bind scope values to attrs cuz rn they're undefined
    function link(scope, element, attrs) {
        // console.log(attrs);
        window.outerWidth > 740 ? titleWide = true : titleWide = false;
        scope.jumboTitle = renderTitle();
        scope.factor = attrs.jumboType == 'sub' ? .75 : 1;
        scope.topOffset = getTopOffset();
        // scope.jumboHeight = getHeight() + scope.bgImg;
        scope.bgImg = '';
        scope.article = {};

        //scope.bgImage = 'background: url(\''+attrs.jumboImg+'\') no-repeat top center; background-size: cover;';
        scope.bgStyle = scope.jumboHeight;// + scope.bgImage;

        scope.getArticle = function () {
            console.log('id: ' + id);

            var ref = firebase.database().ref().child('articles').child(id);
            ref.once('value').then(function (obj) {
                scope.article = obj.val();
                console.log(scope.article);
                scope.bgImg = getHeight() + 'background: url(\''+scope.article.jumbotronImageUrl+'\') no-repeat top center; background-size: cover;';
                scope.$apply(scope.bgImg);
            });
        }
        scope.getArticle();

        angular.element($window).bind('resize', function() {
            if($window.outerWidth < 740 && titleWide) {
                titleChanged = true;
                titleWide = false;
            }
            else if($window.outerWidth > 740 && !titleWide) {
                titleChanged = true;
                titleWide = true;
            }
            else titleChanged = false;

            if(titleChanged) {
                scope.jumboTitle = renderTitle();
                scope.bgStyle = getHeight() + scope.bgImg;
                scope.topOffset = getTopOffset();
            }

            scope.$digest();
        });

        function renderTitle() {
            return titleWide ? '<div id="ji-title-wide">'+attrs.jumboTitleBg+'</div>' : '<div id="ji-title-small">'+attrs.jumboTitleSm+'</div>';
        }

        function getHeight() {
            return titleWide ? 'height:'+42*scope.factor+'em;' : 'height:'+32*scope.factor+'em;';
        }

        function getTopOffset() {
            return titleWide ? 'position: relative;top:'+12.3*scope.factor+'em;' : 'position: relative;top:'+7.4*scope.factor+'em;';
        }

    }
}]);