// ===== GLOBAL PROPERTIES =====
var lat = 37.236917,
    lng = -113.453889,
    id = getParameterByName('id', null);
var site = {lat: lat, lng: lng};
var baseUrl = "../../index.html";

var titleWide = false, titleChanged = false;

// ===== FACEBOOK PLUGIN =====
window.fbAsyncInit = function () {
    FB.init({
        appId: '156803834800667',
        xfbml: true,
        version: 'v2.8'
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// ===== THE CONTROLLER =====
app.controller('ArticleCtrl', [
    '$scope',
    '$window',
    function ($scope, $window) {
        window.outerWidth > 700 ? titleWide = true : titleWide = false;
        $scope.baseUrl = baseUrl;
        $scope.featured = [];
        $scope.article = {};
        $scope.id = getParameterByName('id', null);

        $scope.jumboBg = '';
        $scope.jumboTitleStyle = '';
        $scope.jumboH1 = '';
        $scope.jumboH2 = '';

        // ===== INIT FUNCTIONS =====
        $scope.getArticle = function () {

            var ref = firebase.database().ref().child('articles').child(id);
            ref.once('value').then(function (obj) {
                $scope.article = obj.val();
                console.log($scope.article);
                $scope.jumboBg = 'background: url(\''+$scope.article.jumbotronImageUrl+'\') no-repeat center center;' +
                    'background-size: cover;' +
                    'height: 28em';
                $scope.jumboTitleStyle = 'position:relative;' +
                    'top: 50%;' +
                    'color: #fff;' +
                    'background-color: rgba(0,0,0,.4);' +
                    'font-family: \'Bree Serif\', serif';
                $scope.jumboH1 = getH1Height();
                $scope.jumboH2 = getH2Height();

            });
        };

        $scope.getFeatured = function() {
            var ref2 = firebase.database().ref().child('featured');
            ref2.once('value').then(function (obj) {
                $scope.featured = obj.val();
                $scope.$apply(function () {
                    add2ToLink($scope.featured);
                });
            });
        };
        // ===== END =====

        $scope.getArticle();
        $scope.getFeatured();


        angular.element($window).bind('resize', function() {
            if($window.outerWidth < 700 && titleWide) {
                titleChanged = true;
                titleWide = false;
            }
            else if($window.outerWidth > 700 && !titleWide) {
                titleChanged = true;
                titleWide = true;
            }
            else titleChanged = false;

            if(titleChanged) {
                $scope.jumboH1 = getH1Height();
                $scope.jumboH2 = getH2Height();
            }

            $scope.$digest();
        });

        function getH1Height() {
            return 'font-size:'+(titleWide ?'65':'42')+'px;' +
                'margin:0;' +
                'padding:20px 8px 0 20px;'+
                'line-height:'+(titleWide ?'63':'40')+'px;';
        }

        function getH2Height() {
            return 'font-size:'+(titleWide ?'30':'28')+'px;' +
                'margin:0;' +
                'padding:8px 8px 20px 20px;' +
                'font-weight:normal;' +
                'line-height:'+(titleWide ?'30':'29')+'px;';
        }


    }
]);


// ===== ARTICLE DIRECTIVES =====

app.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts, colorscheme, width) {
        return '<div class="fb-comments" ' +
            'data-href="' + href + '" ' +
            'data-numposts="' + numposts + '" ' +
            'data-colorsheme="' + colorscheme + '" ' +
            'data-width="' + width + '">' +
            '</div>';
    }


    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href = newValue;
                var numposts = attrs.numposts || 5;
                var colorscheme = attrs.colorscheme || 'light';
                var width = attrs.width || '100%';
                elem.html(createHTML(href, numposts, colorscheme, width));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});

app.directive("appMap", function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        link: function (scope, element, attrs) {
            var toResize, toCenter;
            var map;
            var currentMarkers;

            scope.center = {lat: 0, lng: 0};
            updateControl();


            var ref = firebase.database().ref().child('articles').child(id).child('mapsPosition');
            ref.once('value').then(function (obj) {
                var val = obj.val();
                scope.center.lat = val.lat;
                scope.center.lng = val.lng;
                scope.$apply(function () {
                    scope.center,
                        updateControl()
                });
            });

            // update zoom and center without re-creating the map
            scope.$watch("zoom", function () {
                if (map && scope.zoom)
                    map.setZoom(scope.zoom * 1);
            });

            scope.$watch("center", function () {
                if (map && scope.center)
                    map.setCenter(getLocation(scope.center));
            });

            // update the control
            function updateControl() {
                // get map options

                var options = {
                    center: new google.maps.LatLng(scope.center.lat, scope.center.lng),
                    zoom: 13
                };

                // create the map
                map = new google.maps.Map(element[0], options);
                var marker = new google.maps.Marker({position: scope.center, map: map});

            }

            // convert current location to Google maps location
            function getLocation(loc) {
                if (loc == null) return new google.maps.LatLng(40, -73);
                if (angular.isString(loc)) loc = scope.$eval(loc);
                return new google.maps.LatLng(loc.lat, loc.lon);
            }
        }
    };
});