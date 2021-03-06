var titleWide = false, titleChanged = false;

// TODO: change main jumbo img url!!!!!!

// TODO: NOTE: only works with ArticleCtrl ...move to that file?

app.directive('articleJumboImgHeader', ['$window', function ($window) {
    return {
        link: link,
        restrict: 'E',
        template:
        '<div class="jumboimg jumbo-top" id="jumbo-main" style={{bgStyle}}> '+
        '   <h1 dynamic="jumboTitle" style="{{topOffset}}"></h1>' +
        '</div>'
    };

    function link(scope, element, attrs) {
        // console.log(attrs);
        window.outerWidth > 740 ? titleWide = true : titleWide = false;
        scope.jumboTitle = renderTitle();
        scope.factor = attrs.jumboType == 'sub' ? .75 : 1;
        scope.topOffset = getTopOffset();
        scope.jumboHeight = getHeight();

        console.log('in dir');
        console.log(scope.article);

        scope.bgImage = 'background: url(\''+scope.article.jumbotronImageUrl+'\') no-repeat top center; background-size: cover;';
        scope.bgStyle = scope.jumboHeight + scope.bgImage;

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
                scope.bgStyle = getHeight()+scope.bgImage;
                scope.topOffset = getTopOffset();
            }

            scope.$digest();
        });

        function renderTitle() {
            return titleWide ? '<div id="ji-title-wide">'+scope.article.jumbotronTitle+'</div>' : '<div id="ji-title-small">'+scope.article.jumbotronTitle+'</div>';
        }

        function getHeight() {
            return titleWide ? 'height:'+42*scope.factor+'em;' : 'height:'+32*scope.factor+'em;';
        }

        function getTopOffset() {
            return titleWide ? 'position: relative;top:'+12.3*scope.factor+'em;' : 'position: relative;top:'+7.4*scope.factor+'em;';
        }

    }
}]);