var wide = false, changed = false;
var expanded = false;

app.directive('headerCustom', ['$window', function ($window) {
    return {
        link: link,
        restrict: 'E',
        template: '<div id="header-area"><header><a class="header-left" id="h-l" href="index.html">{{headerTitle}}</a><div class="header-right" id="h-r" dynamic="headerRight"></div></header>  <div class="pulldown-menu" id="p-m" style={{menuStyle}}><div><a href="blog">Adventure Log</a></div><div><a href="gearrev">Reviews</a></div><div><a href="survival">Survival Guide</a></div></div>  </div>'
    };

    function link(scope, element, attrs) {
        window.outerWidth > 740 ? wide = true : wide = false;
        scope.headerTitle = renderTitle();
        scope.headerRight = renderRightSide();
        scope.menuStyle = 'display:none;height:0';

        angular.element($window).bind('resize', function() {
            if($window.outerWidth < 740 && wide) {
                changed = true;
                wide = false;
            }
            else if($window.outerWidth > 740 && !wide) {
                changed = true;
                wide = true;
            }
            else changed = false;

            if(changed) {
                scope.headerTitle = renderTitle();
                scope.headerRight = renderRightSide();
            }

            scope.$digest();
        });

        function renderTitle() {
            return wide ? 'Outdoor Adventure Crew' : '#jointhecrew';
        }

        scope.expandMenu = function() {
            console.log('expanding')
            if(expanded) {
                scope.menuStyle = 'display:none;height:0';
                expanded = false;
            }
            else {
                scope.menuStyle = 'display:block;height:auto;';
                expanded = true;
            }
        }

        function renderRightSide() {
            return wide ?
                '<a href="blog">Adventure Log</a><a href="gearrev">Reviews</a><a href="survival">Survival Guide</a>'
                : '<div class="menu-icon collapsible-header" ng-click="expandMenu()"><div class="mc-line"></div><div class="mc-line"></div><div class="mc-line"></div></div>';
        }

    }
}]);