app.directive('viewer', ['$window', function ($window) {

    return {
        link: link,
        restrict: 'E',
        template: '<div id="viewer-main" style={{mainStyle}}>' +
                '<div id="viewer-left" style={{leftStyle}}>' +
                    '<div class="title-div-big">{{innerTitle}}</div> ' +
                    '<hr> ' +
                    '<br><br> ' +
                    '<div ng-repeat="article in articles" class="viewer-thumbnails"> ' +
                        '<a ng-href={{article.link}}><img ng-src={{article.imageSrc}}></a><br><br> ' +
                        '<a ng-href={{article.link}}><p class="title-bree smaller-line-height">{{article.title}}</p></a> ' +
                        '<p class="article-date">{{article.date}}</p> ' +
                        '<p>{{article.intro}}<a ng-href={{article.link}} style="color: #20457c;"> Click to read more...</a></p> ' +
                        '<hr> ' +
                        '<br> ' +
                    '</div> ' +
                '</div>' +
                '<div id="viewer-right" style={{rightStyle}}> ' +
                '<hr/> ' +
                '<div class="sidebar-title-div-bree">Featured Articles</div> ' +
                    '<hr/> ' +
                    '<div class="sidebar-featured"> ' +
                        '<div ng-repeat="article in featured" class="viewer-thumbnails-right"> ' +
                            '<article class="vw-img-cell"><a ng-href={{article.link}}><img ng-src={{article.imageSrc}}></a></article> ' +
                            '<article class="vw-text-cell">' +
                                '<a ng-href={{article.link}}><p class="sidebar-article-title">{{article.title}}</p></a> ' +
                                '<p class="sidebar-article-date">{{article.date}}</p> ' +
                            '</article>' +
                        '</div> ' +
                    '</div> ' +
                    '<hr/> ' +
                '</div>' +
            '</div>'

    };

    function link(scope, element, attrs) {
        const CHANGE_MARGIN = 880;
        const NARROW_MARGIN = 420;

        window.outerWidth > CHANGE_MARGIN ? scope.wide = true : scope.wide = false;
        window.outerWidth < NARROW_MARGIN ? scope.narrow = true : scope.narrow = false;

        scope.leftStyle = getLeftStyle();
        scope.rightStyle = getRightStyle();
        scope.mainStyle = getMainStyle();

        angular.element($window).bind('resize', function() {
            if($window.outerWidth < CHANGE_MARGIN && scope.wide) {
                scope.changed = true;
                scope.wide = false;
            }
            else if($window.outerWidth > CHANGE_MARGIN && !scope.wide) {
                scope.changed = true;
                scope.wide = true;
            }
            else scope.changed = false;

            if($window.outerWidth < NARROW_MARGIN && !scope.narrow) {
                scope.narrowChanged = true;
                scope.narrow = true;
            }
            else if($window.outerWidth > NARROW_MARGIN && scope.narrow) {
                scope.narrowChanged = true;
                scope.narrow = false;
            }
            else scope.narrowChanged = false;

            if(scope.changed || scope.narrowChanged) {
                console.log('changed!!');
                scope.leftStyle = getLeftStyle();
                scope.rightStyle = getRightStyle();
                scope.mainStyle = getMainStyle();
            }

            scope.$digest();
        });

        function getLeftStyle() {
            return scope.wide ?
                'width:45%;padding:3%;margin:2em 0 0 12%;' :
                getNarrowLeftStyle();
        }

        function getNarrowLeftStyle() {
            return scope.narrow ?
                'width:90%;padding:5%;margin:2em 0 0 0;' :
                'width:74%;padding:4%;margin:2em auto 0 auto;';
        }

        function getRightStyle() {
            return scope.wide ? '' : 'display:none;';
        }

        function getMainStyle() {
            return scope.wide ? 'display:flex;justify-content:space-around' : '';
        }
    }
}]);