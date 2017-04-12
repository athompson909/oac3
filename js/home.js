// this doesn't work
// var showOverlay = true;
// setTimeout(function() {
//     showOverlay = true;
// }, 1200000);// waiting 20 minutes

/*
TODO: stick this all into the home controller
... make the width of the div be dependent on screen width
 */

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function () {
        // if(showOverlay) {

            openNav();
        // }
    }, 8000);
});


function openNav() {
    showOverlay = false;
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// function removeHint(elem) {
//
//     if(elem.value = 'Email address') {
//         elem.value = '';
//         elem.style.color = '#000'
//     }
// }
//
// function returnHint(elem) {
//
//     if (elem.value == '') {
//         elem.value = 'Email address';
//         elem.style.color = '#ccc';
//     }
// }



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
    if (!results) return 0;//return null;
    if (!results[2]) return 0;//return '';
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

// TODO: eliminate this function
setBackgroundImage = function (imgUrl) {
    $(".jumbotron").css("background", "url('" + imgUrl + "') no-repeat center center");
    $(".jumbotron").css("background-size", "cover");
}

var app = angular.module('OutdoorAdvCrew', ['ngSanitize', 'firebase']);

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

app.directive('footerCustom', function($compile) {
   return {
       link: function (scope, ele, attrs) {
           scope.$watch(attrs.dynamic, function (html) {
               ele.html(html);
               $compile(ele.contents())(scope);
           });
       },
       restrict: 'E',
       template: '<footer>' +
       '<div class="footer-top">' +
        '<div id="fleftnav">' +
            '<a href="contact.html">Contact us</a><br>' +
            '<a href="promote.html">Promote with us</a><br>' +
            '<a href="javascript:void(0)" onclick="openNav()">Stay in the loop</a><br>' +
        '</div>' +
        '<div id="frightnav">' +
            '<a href="https://www.instagram.com/outdooradventurecrew/"><img src="images/socialmedia/instagram.png"></a>' +
                '<a href="https://www.facebook.com/outdooradventurecrew"><img src="images/socialmedia/facebook.png"></a>' +
                '<a href="https://www.youtube.com/channel/UCrQJ1WjL2YMK7ksa8xsg03g"><img src="images/socialmedia/youtube.png"></a>' +
                '<a href="https://www.pinterest.com/adventurecrew10"><img src="images/socialmedia/pinterest.png"></a>' +
        '</div>' +
        '</div>' +
        '<hr style="margin-top:12em">' +
        '<div class="col-sm-12 text-center" id="copyright">Copyright &copy 2016 | Outdoor Adventure Crew | this site developed and maintained by Adam Thompson' +
        '</div>' +
        '</footer>'
   }
});