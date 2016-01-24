/**
 * Created by Nishanth on 1/13/2016.
 */
(function(){
    'use strict';

angular.module('application')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider){

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push('httpServiceInterceptor');

        $stateProvider

            .state('/', {
                url: '/',
                controller: 'mainController',
                templateUrl: './index.html'
            })


            .state('start',{
                url: '/start/',
                controller: 'mainController',
                templateUrl: './views/start.html'
            })

            .state('signup',{
                url: '/signup',
                controller: 'mainController',
                templateUrl: './views/signup.html'
            })

            .state('login',{
                url: '/login',
                controller: 'mainController',
                templateUrl: './views/login1.html'
            })

            .state('profile',{
                url: '/profile',
                controller: 'mainController',
                templateUrl: './views/profile1.html',
                resolve : {
                    authenticate : authenticate
                }
            })

            .state('edit',{
                url: '/editProfile',
                controller: 'mainController',
                templateUrl: './views/editProfile.html',
                resolve : {
                    authenticate : authenticate
                }
            });


        authenticate.$inject = ['$q', '$cookies', '$rootScope'];
        function authenticate($q, $cookies, $rootScope) {
            if ($cookies.get('token')) {
                console.log("entered");
                return $q.when({authenticated: true});
            }
            else {
                console.log("reject");
                $rootScope.loginError = "Please Log In to Continue";
                return $q.reject({authenticated: false})
            }
        }
    })

})();