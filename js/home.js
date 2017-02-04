function scrollToTop() {
    // location.reload();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}


function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function addToLink(articlesarray) {
    console.log(articlesarray);
    for(var i = 0; i < articlesarray.length; ++i) {
        articlesarray[i].link = '../'+ articlesarray[i].link;
    }
}

function add2ToLink(articlesarray) {
    console.log(articlesarray);
    for(var i = 0; i < articlesarray.length; ++i) {
        articlesarray[i].link = '../../'+ articlesarray[i].link;
    }
}

setBackgroundImage = function (imgUrl) {
    $(".jumbotron").css("background", "url('" + imgUrl + "') no-repeat center center");
    $(".jumbotron").css("background-size", "cover");
}

var app = angular.module('OutdoorAdvCrew', ['ngSanitize']);

app.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
});
