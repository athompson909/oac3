app.controller('ContactCtrl', [
    '$scope',
    function($scope) {
        var imgUrl = "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/contact-us-jumbo%20(1).jpg?alt=media&token=07002b8b-e477-4f19-b310-fa006c5592fb";
        var bgimg = $('.jumbo-img');
        bgimg.css("background", "url('" + imgUrl + "') no-repeat center center");
        bgimg.css("background-size", "cover");
    }
]);

app.controller('PromoteCtrl', [
    '$scope',
    function($scope) {
        var imgUrl = "https://firebasestorage.googleapis.com/v0/b/outdooradventurecrew-a3400.appspot.com/o/contact-us-jumbo%20(1).jpg?alt=media&token=07002b8b-e477-4f19-b310-fa006c5592fb";
        var bgimg = $('.jumbo-img');
        bgimg.css("background", "url('" + imgUrl + "') no-repeat center center");
        bgimg.css("background-size", "cover");
    }
]);
