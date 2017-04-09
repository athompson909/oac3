var titleWide = false, titleChanged = false;

// TODO: change main jumbo img url!!!!!!

app.directive('jumboImgHeader', ['$window', function ($window) {
    return {
        link: link,
        restrict: 'E',
        template:
            '<div class="jumboimg jumbo-top" id="jumbo-main" style={{bgStyle}}> '+
            '   <h1 dynamic="jumboTitle"></h1>' +
            '</div>'
    };

    function link(scope, element, attrs) {
        console.log(attrs);
        window.outerWidth > 740 ? titleWide = true : titleWide = false;
        scope.jumboTitle = renderTitle();
        scope.jumboHeight = getHeight();

        scope.bgImage = 'background: url(\''+attrs.jumboImg+'\') no-repeat top center; background-size: cover;';
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
            }

            scope.$digest();
        });

        function renderTitle() {
            return titleWide ? '<div id="ji-title-wide">'+attrs.jumboTitleBg+'</div>' : '<div id="ji-title-small">'+attrs.jumboTitleSm+'</div>';
        }

        function getHeight() {
            return titleWide ? 'height:42em;' : 'height:32em;';
        }

    }
}]);