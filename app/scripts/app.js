/**
 * Modified by Shariq on 11/1/2017.
 */

var app = angular.module('site-pages', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'home.html'
      })
      .when('/skills', {
        templateUrl: 'skills.html'
      })
      .when('/work', {
        templateUrl: 'work.html'
      })
      .when('/contact', {
        templateUrl: 'contact.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope) {
  
});

app.controller('moonsCtrl', function($scope) {
  var year = '1990';
  var today = new Date();
  var age = today.getFullYear() - year;
  var moonsToday = age * 12;
  $scope.numbMoons = {
    moons: moonsToday
  };
});

app.controller('skillsCtrl', function($scope) {
  
  var Felist = [['WEB', 10, ''],['HTML5', 4, ''], ['CSS3', 4, ''], ['JavaScript', 3.5, ''], ['jQuery', 3, ''], ['Gulp', 3, ''], ['Grunt', 3, ''], ['Git', 3.5, ''], ['WordPress', 4, ''], ['Shopify', 2.5, ''], ['Magento', 2.5, ''], ['Sass', 3.5, ''], ['Angular', 2.5, ''], ['Bootstrap', 4.5, ''], ['MDL', 4, ''], ['WSK', 2.5, ''], ['HubSpot', 3, ''], ['php', 2, ''], ['Awesomness', 5, '']];
  var Elist = [['Emails', 10, ''],['Responsive Emails', 4, 'a'], ['SFMC (Exact Target)', 4, 's'], ['Bronto', 3.5, 's'], ['Dotmailer', 3, 's'], ['Klaviyo', 3, 's'], ['MailChimp', 3, 's'], ['Ampscript', 3.5, 's'], ['Workflows', 4, 's'], ['Automations', 2.5, 's'], ['Segments', 2.5, 's'], ['Campaign Sends', 3.5, 's'], ['Click Dimensions', 2.5, 'j'], ['Magento Transctional Emails', 4.5, 'j']];

  const skillsGridWeb = document.getElementById('skillsWeb');
  const skillsGridEmail = document.getElementById('skillsEmails');
  const skillTip = document.getElementById('skillTooltip');
  var skillsWidth = skillsGridWeb.offsetWidth;
  var windowWidth = window.innerWidth;

  WordCloud(skillsGridWeb, {
    list:Felist,
    gridSize: 6,
    weightFactor: 5,
    shape: 'square',
    origin: [+50, 0],
    rotateRatio: 0.5,
    rotationSteps: 2,
    classes: 'skill--web',
  });

  WordCloud(skillsGridEmail, {
    list:Elist,
    gridSize: 6,
    weightFactor: 5,
    shape: 'square',
    origin: [-50, 0],
    rotateRatio: 0.5,
    rotationSteps: 2,
    classes: 'skill--email',
  });
});
