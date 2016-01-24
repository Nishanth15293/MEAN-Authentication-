/**
 * Created by Nishanth on 1/13/2016.
 */
angular.module('application')

    .controller('mainController',mainController);

    mainController.$inject=[
        '$scope',
        '$state',
        '$rootScope',
        '$cookies',
        'basicServiceFactory',
        '$http'
    ];

function mainController($scope,$state, $rootScope,  $cookies, basicServiceFactory, $http){
  //  $scope.user = $rootScope.user || basicServiceFactory.getUser();
    $scope.first = null;
    $scope.address = null;
    $scope.phone = null;
    $scope.last = null;
    if(!$scope.name){
        $scope.name = null;
    }
    if(!$scope.email){
        $scope.email = null;
    }
    if(!$scope.password){
        $scope.password = null;
    }


 //   console.log($scope.name);
    $scope.getData = function(){
   //     console.log("in function get data");
        $http.get('/data').then(function(response){
           // console.log(response);
     //       console.log("data printed to console");
        })
    };

    $scope.userSignUp = function() {
        console.log('user siging up');
        var payload = {
            'username': $scope.username,
            'password': $scope.password,
            'email': $scope.email
        };
        console.log($scope.username + $scope.password);
        if ($scope.username != null || $scope.password != null || $scope.email != null) {
            basicServiceFactory.post('/signup', payload).then(function (data) {

                console.log(data);
                console.log("posted successfully!!");
                if (data.redirect) {
                    //$location.path(data.redirect);
                    $state.go(data.redirect);

                }
            });
        }
    };

    $scope.login = function(){
        /*console.log("initiating post data function client side");
        console.log('sending email ' + $scope.email);
        console.log('sending pass ' + $scope.password);
        console.log('sending name ' + $scope.name);*/


        var payload ={email :$scope.email , password : $scope.password} ;
        basicServiceFactory.login('/login',payload).then(function(data){
               // console.log(res.data);
            if(data.errorMessage) {
                $rootScope.errorBody = data;
                console.log("Error Code: " + data.errorCode);
                console.log(data.errorMessage);
            }
            else {
               // $state.go('profile');
               // console.log(res);
                $http.get('/auth/verify').then(function(res){
                //    console.log(res.data);
                    if(data.error) {
                        $scope.errorBody = data;
                     //    console.log("Error Code: " + data.errorCode);
                        console.log("data");
                        console.log(data.error);
                    }
                    else{
                       // console.log($cookies.get('token'));
                       // console.log("user is " + $rootScope.user.phone);
                      //  console.log(res.data);
                        $state.go(res.data.redirect);
                    }
                })
            }


        })
    };

    $rootScope.logout = function(){
        basicServiceFactory.logout().then(function(){
            $state.go('logIn');
            });
    };

    $scope.editProfile = function(){
        var payload = $rootScope.user;
        console.log("sending edited");
        console.log(payload);
        $http.post('/auth/editProfile',payload).then(function(res){
            console.log("after edit");
                       // console.log(res.data);
            $state.go(res.data.redirect || 'profile');
        })

    }


}