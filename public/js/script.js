(function () {
    'use strict';

angular
	.module('App', ['ngResource','ui.bootstrap', 'ui.router', 'ui.navbar','ngRadialGauge','ngStorage' ,'ngMessages','ngAnimate', 'ngSanitize'])
	.config(config)
	.run(run);

function config ($stateProvider,$urlRouterProvider,$locationProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

   // Now set up the states
 $stateProvider 
 
   .state('/', {
        url: '/',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/login.html",
                controller: 'loginCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
    .state('login', {
        url: '/login',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/login.html",
                controller: 'loginCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
	 .state('logout', {
        url: '/logout',
        views: {
            'navbar': {
                templateUrl: "partials/navbarLogInOut.html",
                controller: null,
				controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/logout.html",
                controller: 'logoutCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
    .state('register', {
        url: '/register',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/register.html",
                controller: 'registerCtrl',
				controllerAs: 'vm'
            }
        }
    })
	
	.state('dash', {
        url: '/dash',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
				controllerAs: 'vm'
            },
            'body': {
				templateUrl: "partials/waterGaugeDash.html",
				controller: 'waterGaugeCtrl'
            }
        }
    })	
	
	.state('caixaDash_b1', {
        url: '/caixaDash_b1',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b1.html",
                controller: 'caixaDashCtrl_b1'
            }
        }
    })  
    
    .state('caixaDash_b2', {
        url: '/caixaDash_b2',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b2.html",
                controller: 'caixaDashCtrl_b2'
            }
        }
    })  

    .state('caixaDash_b3', {
        url: '/caixaDash_b3',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b3.html",
                controller: 'caixaDashCtrl_b3'
            }
        }
    }) 

   .state('caixaDash_b4a', {
        url: '/caixaDash_b4a',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b4a.html",
                controller: 'caixaDashCtrl_b4a'
            }
        }
    }) 

   .state('caixaDash_b4b', {
        url: '/caixaDash_b4b',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b4b.html",
                controller: 'caixaDashCtrl_b4b'
            }
        }
    }) 

    .state('cisternaDash_b2', {
        url: '/cisternaDash_b2',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/cisternaDash_b2.html",
                controller: 'cisternaDashCtrl_b2'
            }
        }
    })  
    
    .state('cisternaDash_b5', {
        url: '/cisternaDash_b5',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/cisternaDash_b5.html",
                controller: 'cisternaDashCtrl_b5'
            }
        }
    })      
    
    
    .state('caixaDash_b5a', {
        url: '/caixaDash_b5a',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b5a.html",
                controller: 'caixaDashCtrl_b5a'
            }
        }
    })

    .state('caixaDash_b5b', {
        url: '/caixaDash_b5b',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b5b.html",
                controller: 'caixaDashCtrl_b5b'
            }
        }
    })

    .state('caixaDash_b6a', {
        url: '/caixaDash_b6a',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b6a.html",
                controller: 'caixaDashCtrl_b6a'
            }
        }
    })

    .state('caixaDash_b6b', {
        url: '/caixaDash_b6b',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/caixaDash_b6b.html",
                controller: 'caixaDashCtrl_b6b'
            }
        }
    })

    .state('relcisternas', {
      url: '/relcisternas',
      
           views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relcisternas.html",
                controller: 'cisternasCtrl'
            }
        }
    })      
    
    .state('relcisterna2', {
      url: '/relcisterna2',
      
           views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relcisterna2.html",
                controller: 'cisternasCtrl2'
            }
        }
    })  
    
    .state('relatorio', {
      url: '/relatorio',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {     
              templateUrl: "partials/rel.html",
              controller: 'relCtrl'
            }
        }
    })
    
 

  .state('relbl1', {
      url: '/relbl1',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {     
                templateUrl: "partials/relbl1.html",
                controller: 'bl1Ctrl'
            }
        }
    })
    
  .state('relbl2', {
      url: '/relbl2',
              views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relbl2.html",
                controller: 'bl2Ctrl'
            }
        }     
    })
    
    
   .state('relbl3', {
      url: '/relbl3',
            views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relbl3.html",
                controller: 'bl3Ctrl'
            }
        }
    })

    .state('relbl4a', {
      url: '/relbl4a',
            views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relbl4a.html",
                controller: 'bl4aCtrl'
            }
        }
    })

    .state('relbl4b', {
      url: '/relbl4b',
            views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relbl4b.html",
                controller: 'bl4bCtrl'
            }
        }
    })

    .state('relbl5', {
      url: '/relbl5',
        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {     
                templateUrl: "partials/relbl5.html",
                controller: 'bl5Ctrl'
            }
        }
    })

    .state('relbl5b', {
      url: '/relbl5b',
            views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relbl5b.html",
                controller: 'bl5bCtrl'
            }
        }
    })

    .state('relbl6a', {
      url: '/relbl6a',
            views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relbl6a.html",
                controller: 'bl6aCtrl'
            }
        }
    })

    .state('relbl6b', {
      url: '/relbl6b',
            views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/relbl6b.html",
                controller: 'bl6bCtrl'
            }
        }
    })
    
    .state('espGourmet', {
        url: '/espGourmet',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/RadialGaugeDemo.html",
                controller: 'RadialGaugeDemoCtrl'
            }
        }
    })
    .state('singlescreen', {
        url: '/singlescreen',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/singlescreen.html",
                controller: 'singleScreenCtrl'
            }
        }
    })
    .state('monitor', {
        url: '/monitor',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/monitor.html",
                controller: 'monitorCtrl'
            }
        }
    })

    /*.state('switch', {
        url: '/switch',

        views: {
            'navbar': {
                templateUrl: "partials/navbar.html",
                controller: "navbarCtrl",
                controllerAs: 'vm'
            },
            'body': {
                templateUrl: "partials/switchDash.html",
                controller: "switchCtrl"
            }
        }
    });
    */
}   

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
 
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login','/logout','/'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/');
            }
        });
    }	



})();

 
 
