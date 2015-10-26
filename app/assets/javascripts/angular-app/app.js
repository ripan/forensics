window.forensicsApp = angular.module('forensicsApp', ['templates', 'ui.router', 'controllers', 'filters', 'services', 'chart.js']);

window.controllers = angular.module('controllers', []);
window.services = angular.module('services', ['ngResource']);
window.filters = angular.module('filters', []);

forensicsApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/directions");
  //
  // Now set up the states
  $stateProvider


    // Directions
    .state('directions', {
      url: "/directions",
      templateUrl: "assets/directions/index.html",
      data: { pageTitle: 'Directions' },
    })  
    .state('directions#new', {
      url: "/directions/new",
      templateUrl: "assets/directions/new.html",
      data: { pageTitle: 'New Direction' },
    })
    .state('directions#edit', {
      url: "/directions/:id/edit",
      templateUrl: "assets/directions/edit.html",
      data: { pageTitle: 'Edit Direction' },
    })      
    .state('directions#show', {
      url: "/directions/:id",
      templateUrl: "assets/directions/show.html",
      data: { pageTitle: 'Direction Details' },
    })

}]);
