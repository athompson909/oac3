// this doesn't work
var showOverlay = true;
// setTimeout(function() {
//     showOverlay = true;
// }, 1200000);// waiting 20 minutes

/*
TODO: stick this all into the home controller
... make the width of the div be dependent on screen width
 */

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
           scope.instagramImg = attrs.prefix + 'images/socialmedia/instagram.png';
           scope.facebookImg = attrs.prefix + 'images/socialmedia/facebook.png';
           scope.youtubeImg = attrs.prefix + 'images/socialmedia/youtube.png';
           scope.pinterestImg = attrs.prefix + 'images/socialmedia/pinterest.png';

           scope.contactLink = attrs.prefix + 'contact.html';
           scope.promoteLink = attrs.prefix + 'promote.html';
           scope.promoLink = attrs.prefix + 'promo';

           scope.$watch(attrs.dynamic, function (html) {
               ele.html(html);
               $compile(ele.contents())(scope);
           });
       },
       restrict: 'E',
       template: '<footer>' +
       '<div class="footer-top">' +
        '<div id="fleftnav">' +
            '<div class="fleftnav-link"><a ng-href={{contactLink}}>Contact us</a></div>' +
            '<div class="fleftnav-link"><a ng-href={{promoteLink}}>Promote with us</a></div>' +
            '<div class="fleftnav-link"><a href="javascript:void(0)" onclick="openNav()">Stay in the loop</a></div>' +
            '<div class="fleftnav-link"><a ng-href={{promoLink}}>Special offers</a></div>' +
        '</div>' +
        '<div id="frightnav">' +
            '<a href="https://www.instagram.com/outdooradventurecrew/"><img src={{instagramImg}}></a>' +
            '<a href="https://www.facebook.com/outdooradventurecrew"><img src={{facebookImg}}></a>' +
            '<a href="https://www.youtube.com/channel/UCrQJ1WjL2YMK7ksa8xsg03g"><img src={{youtubeImg}}></a>' +
            '<a href="https://www.pinterest.com/adventurecrew10"><img src={{pinterestImg}}></a>' +
        '</div>' +
        '</div>' +
        '<hr style="margin-top:12em">' +
        '<div class="col-sm-12 text-center" id="copyright">Copyright &copy 2016 | Outdoor Adventure Crew | this site developed and maintained by Adam Thompson' +
        '</div>' +
        '</footer>'
   }
});

var wide = false, changed = false;
var expanded = false;
var emailSent = false;


// TODO: make it so that the overlay changes if screen width changes: priority: low
app.directive('emailOverlay', [
    '$window',
    '$firebaseArray',
    function ($window, $firebaseArray) {
        return {
            link: link,
            restrict: 'E',
            template: '<div id="myNav" class="overlay">'+
                        '<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>' +
                        '<form class="overlay-content" style={{emailInviteStyle}} name="emailForm">' +
                            '<h3>Sign up for UPDATES on trips, promotions and giveaways from Outdoor Adventure Crew!<br/>#jointhecrew</h3>' +
                            '<input type="email" style={{emailStyle+overlayInnerStyle}} name="emailInput" ng-model="email" ng-focus="removeHint()" ng-blur="showHint()" required><br/>' +
                            '<input type="submit" style={{overlayInnerStyle}} id="submit-button" ng-click="update(email)" value="Yes, I want updates!" name="emailSubmit"/>' +
                        '</form>' +
                        '<div class="thankyou-overlay" style={{thankyouStyle}}>' +
                        '<h3 style={{overlayInnerText}}>Thank you for signing up!  We hope you enjoy receiving our updates!</h3>' +
                        '</div>' +
                    '</div>'
        };


    function link(scope, element, attrs) {
        window.outerWidth > 740 ? wide = true : wide = false;

        var ref = firebase.database().ref().child("emails");
        scope.emailList = $firebaseArray(ref);
        console.log(scope.emailList);

        scope.email = 'Email address';
        scope.emailStyle="color:#ccc;";
        scope.emailInviteStyle="display:block;";
        scope.thankyouStyle="display:none;";
        scope.emailInviteStyle = getEmailInviteStyle(wide);
        scope.thankyouStyle = getThankyouStyle(wide);
        scope.overlayInnerStyle = getOverlayInnerStyle(wide);

        scope.update = function(email) {
            if(validateEmail(email)) {
                console.log(email);
                scope.emailList.$add(email);
                scope.email = '';
                emailSent = true;

                scope.emailInviteStyle = getEmailInviteStyle(wide);
                scope.thankyouStyle = getThankyouStyle(wide);
                scope.overlayInnerStyle = getOverlayInnerStyle(wide);

                setTimeout(function() {
                    closeNav();
                }, 2000);
            }
        };

        scope.removeHint = function() {
            scope.emailStyle="color:#000;";
            scope.email = '';
        };

        scope.showHint = function() {
            if(scope.email == '') {
                scope.emailStyle="color:#ccc;";
                scope.email = 'Email address';
            }
        };
        scope.showHint();


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
                scope.emailInviteStyle = getEmailInviteStyle(wide);
                scope.thankyouStyle = getThankyouStyle(wide);
                scope.overlayInnerStyle = getOverlayInnerStyle(wide);
                changed = false;
            }

            scope.$digest();
        });

    }

    function getEmailInviteStyle(homeWide) {
        return homeWide ?
            (emailSent ? 'display:none' :'display:block;top:15%;width:75%;height:30%;font-size:32px;')
            : (emailSent ? 'display:none' : 'display:block;top:20%;width:80%;height:60%;font-size:18px;');
    }

    function getThankyouStyle(homeWide) {
        return homeWide ?
            (emailSent ? 'display:block;top:15%;width:75%;height:30%;font-size:32px;' : 'display:none;')
            : (emailSent ? 'display:block;top:20%;width:80%;height:60%;font-size:18px' : 'display:none;');
    }

    function getOverlayInnerStyle(homeWide) {
        return homeWide ? '' : 'font-size:18px;line-height:22px;';
    }
}]);