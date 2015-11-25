/* jshint node: true */

module.exports = function(environment) {

  var apiBaseUrl = 'http://localhost:3001/api';
  var locationUrl = 'http://localhost:4200';

  var ENV = {
    modulePrefix: 'todos-v2',
    environment: environment,
    firebase: 'https://luminous-heat-9079.firebaseio.com/',
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      remoteUrl: 'http://localhost:3001'
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *",
      'font-src': "'self' *",
      'connect-src': "'self' *",
      'img-src': "'self' *",
      'style-src': "'self' 'unsafe-inline' *",
      'frame-src': "*"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    
    // 配置全局变量
    ENV.apiBaseUrl = apiBaseUrl;
    ENV.localeBaseUrl = locationUrl;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';


    // 配置全局变量
    ENV.apiBaseUrl = apiBaseUrl;
    ENV.localeBaseUrl = locationUrl;
  }

  if (environment === 'production') {

    // 配置全局变量
    ENV.apiBaseUrl = apiBaseUrl;
    ENV.localeBaseUrl = locationUrl;

  }


  ENV['ember-simple-auth'] = {
        store: 'simple-auth-session-store:local-storage',
        authorizer: 'authorizer:oauth2-anthenrizer',
        crossOriginWhitelist: [ apiBaseUrl ],
        routeAfterAuthentication: '/',  //登录成功后跳转到的页面
        authenticationRoute: 'login'  //  登录不成功转回登录页面
  };

  return ENV;
};
