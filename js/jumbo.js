var titleWide = false, titleChanged = false;

app.directive('jumboImgHeader', ['$window', function ($window) {
    return {
        link: link,
        restrict: 'E',
        template:
            '<div class="jumboimg jumbo-top" id="jumbo-main" style={{jumboHeight}}> '+
            '   <h1 dynamic="jumboTitle"></h1>' +
            '</div>'
    };

    function link(scope, element, attrs) {
        window.outerWidth > 740 ? titleWide = true : titleWide = false;
        scope.jumboTitle = renderTitle();
        scope.jumboHeight = getHeight();

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
                scope.jumboHeight = getHeight();
            }

            scope.$digest();
        });

        function renderTitle() {
            return titleWide ? '<div id="ji-title-wide">#jointhecrew</div>' : '<div id="ji-title-small">Outdoor<br/>&nbsp;&nbsp;&nbsp;Adventure<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Crew<br/></div>';
        }

        function getHeight() {
            return titleWide ? 'height:42em;' : 'height:32em;';
        }

    }
}]);