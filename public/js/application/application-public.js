define(['angularAMD'], function (angularAMD) {

    var app = angular.module('alv-ch-ng-demo-public', ['ngRoute', 'ngCookies', 'alv-ch-ng.ui-core', 'alv-ch-ng.ui-scroll', 'alv-ch-ng.ui-forms', 'alv-ch-ng.i18n',
    'demo-common.i18n', 'demo-common.constants','ng-dev']);

    app.controller('PublicMainCtrl', function($scope, $http, $cookies, $routeParams, $location, I18nPropertyService, I18nService, applicationVersion, applicationReleaseNote){
        $scope.applicationVersion = applicationVersion;
        $scope.applicationVersion = applicationVersion;
        $scope.applicationReleaseNote = applicationReleaseNote;

        $scope.adminIcons=['exclam',
            'arrow-right',
            'google',
            'bottom',
            'left',
            'disc',
            'screen',
            'notebook',
            'smartphone-portrait',
            'smartphone-landscape',
            'tablet-portrait',
            'tablet-landscape',
            'right',
            'top',
            'less',
            'greater',
            'eye',
            'pdf',
            'trash',
            'cart',
            'star',
            'list',
            'message',
            'print',
            'rss',
            'search',
            'word',
            'excel',
            'power',
            'calendar',
            'doc',
            'pause',
            'facebook',
            'step-backward',
            'step-forward',
            'list-alt',
            'backward',
            'forward',
            'external',
            'menu',
            'corner',
            'tools',
            'play',
            'settings',
            'twitter',
            'fast-backward',
            'fast-forward',
            'root',
            'square',
            'close',
            'arrow-bottom',
            'arrow-left',
            'arrow-top'];
        $scope.languages=[{name:'deutsch'},{name:'francais'},{name:'italiano'}];

        if($cookies.language!=null){
            I18nPropertyService.setCurrentLanguage($cookies.language);
        }else{
            I18nPropertyService.setCurrentLanguage(I18nService.getLanguageFromAgent());
        }
        $scope.$on('i18n:languageChanged', function() {
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000*60*60*24*365;//1000ms*60sek*60min*24h==1day * 365 = 1year
            now.setTime(expireTime);
            document.cookie = 'language='+I18nPropertyService.getCurrentLanguage()+';expires=' + now.toGMTString() + ';path=/';
        });

        $scope.currentLanguage = (I18nPropertyService.getCurrentLanguage() == 'de')?$scope.languages[0]:(I18nPropertyService.getCurrentLanguage() == 'fr')?$scope.languages[1]:$scope.languages[2];

        $scope.title="common-ui";

        $scope.searchCriteria={};
        $scope.test={};
        $scope.searchCriteria.inputTest2='';

        $scope.demoArray=["a_item 1","a_item 2","a_item 3","a_item 4"];

        $scope.getSeverity=function(){
            var severity="success";
            return severity;
        };

        $scope.q=false;
        $scope.doPlaceholder=function(){
            $scope.q = 'test';
        };

        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        $scope.tags = [
            { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    },
            { "value": 4 , "text": "Washington"  , "continent": "America"   },
            { "value": 7 , "text": "Sydney"      , "continent": "Australia" },
            { "value": 10, "text": "Beijing"     , "continent": "Asia"      },
            { "value": 13, "text": "Cairo"       , "continent": "Africa"    }
        ];
        $scope.tagInput = [];
        $scope.cities = [
            { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    },
            { "value": 2 , "text": "Bern"   , "continent": "Europe"    },
            { "value": 3 , "text": "Zürich"   , "continent": "Europe"    },
            { "value": 5 , "text": "Belfast"   , "continent": "Europe"    },
            { "value": 6 , "text": "Berlin"   , "continent": "Europe"    },
            { "value": 4 , "text": "Washington"  , "continent": "America"   },
            { "value": 8 , "text": "New York"  , "continent": "America"   },
            { "value": 9 , "text": "New Bern"  , "continent": "America"   },
            { "value": 11 , "text": "Los Angeles"  , "continent": "America"   },
            { "value": 7 , "text": "Sydney"      , "continent": "Australia" },
            { "value": 12 , "text": "Melbourne"      , "continent": "Australia" },
            { "value": 10, "text": "Beijing"     , "continent": "Asia"      },
            { "value": 13, "text": "Cairo"       , "continent": "Africa"    }
        ];
        $scope.berufsgruppen = [
            { "value": 1,	"text":"Administration/Verwaltung/Management" },
            { "value": 2,	"text":"Finanzwesen/Versicherungen/Recht" },
            { "value": 3,	"text":"Marketing/Tourismus/Medien" },
            { "value": 4,	"text":"Informatik/Ingenieure" },
            { "value": 5,	"text":"Industriehandwerk/Technik/Grafik" },
            { "value": 6,	"text":"Bauhandwerk" },
            { "value": 7,	"text":"Logistik/Transport" },
            { "value": 8,	"text":"Landwirtschaft/Gartenbau" },
            { "value": 9,	"text":"Verkauf/Aussendienst" },
            { "value": 10,	"text":"Gastronomie/Lebensmittel" },
            { "value": 11,	"text":"Reinigung/Unterhalt" },
            { "value": 12,	"text":"Soziales/Pädagogik/Geisteswissenschaft" },
            { "value": 13,	"text":"Gesundheitswesen/Naturwissenschaft" },
            { "value": 14,	"text":"Kunst/Dienstleistung/Sonstige Berufe" }
        ];
        $scope.doSomething = function(){
            console.log("doSomething");
        };
        $scope.selectedCountry={};
        $scope.countries = [
            {text: 'Afghanistan', code: 'AF'},
            {text: 'Aland Islands', code: 'AX'},
            {text: 'Albania', code: 'AL'},
            {text: 'Algeria', code: 'DZ'},
            {text: 'American Samoa', code: 'AS'},
            {text: 'Andorra', code: 'AD'},
            {text: 'Angola', code: 'AO'},
            {text: 'Anguilla', code: 'AI'},
            {text: 'Antarctica', code: 'AQ'},
            {text: 'Antigua and Barbuda', code: 'AG'},
            {text: 'Argentina', code: 'AR'},
            {text: 'Armenia', code: 'AM'},
            {text: 'Aruba', code: 'AW'},
            {text: 'Australia', code: 'AU'},
            {text: 'Austria', code: 'AT'},
            {text: 'Azerbaijan', code: 'AZ'},
            {text: 'Bahamas', code: 'BS'},
            {text: 'Bahrain', code: 'BH'},
            {text: 'Bangladesh', code: 'BD'},
            {text: 'Barbados', code: 'BB'},
            {text: 'Belarus', code: 'BY'},
            {text: 'Belgium', code: 'BE'},
            {text: 'Belize', code: 'BZ'},
            {text: 'Benin', code: 'BJ'},
            {text: 'Bermuda', code: 'BM'},
            {text: 'Bhutan', code: 'BT'},
            {text: 'Bolivia', code: 'BO'},
            {text: 'Bosnia and Herzegovina', code: 'BA'},
            {text: 'Botswana', code: 'BW'},
            {text: 'Bouvet Island', code: 'BV'},
            {text: 'Brazil', code: 'BR'},
            {text: 'British Indian Ocean Territory', code: 'IO'},
            {text: 'Brunei Darussalam', code: 'BN'},
            {text: 'Bulgaria', code: 'BG'},
            {text: 'Burkina Faso', code: 'BF'},
            {text: 'Burundi', code: 'BI'},
            {text: 'Cambodia', code: 'KH'},
            {text: 'Cameroon', code: 'CM'},
            {text: 'Canada', code: 'CA'},
            {text: 'Cape Verde', code: 'CV'},
            {text: 'Cayman Islands', code: 'KY'},
            {text: 'Central African Republic', code: 'CF'},
            {text: 'Chad', code: 'TD'},
            {text: 'Chile', code: 'CL'},
            {text: 'China', code: 'CN'},
            {text: 'Christmas Island', code: 'CX'},
            {text: 'Cocos (Keeling) Islands', code: 'CC'},
            {text: 'Colombia', code: 'CO'},
            {text: 'Comoros', code: 'KM'},
            {text: 'Congo', code: 'CG'},
            {text: 'Congo, The Democratic Republic of the', code: 'CD'},
            {text: 'Cook Islands', code: 'CK'},
            {text: 'Costa Rica', code: 'CR'},
            {text: 'Cote D\'Ivoire', code: 'CI'},
            {text: 'Croatia', code: 'HR'},
            {text: 'Cuba', code: 'CU'},
            {text: 'Cyprus', code: 'CY'},
            {text: 'Czech Republic', code: 'CZ'},
            {text: 'Denmark', code: 'DK'},
            {text: 'Djibouti', code: 'DJ'},
            {text: 'Dominica', code: 'DM'},
            {text: 'Dominican Republic', code: 'DO'},
            {text: 'Ecuador', code: 'EC'},
            {text: 'Egypt', code: 'EG'},
            {text: 'El Salvador', code: 'SV'},
            {text: 'Equatorial Guinea', code: 'GQ'},
            {text: 'Eritrea', code: 'ER'},
            {text: 'Estonia', code: 'EE'},
            {text: 'Ethiopia', code: 'ET'},
            {text: 'Falkland Islands (Malvinas)', code: 'FK'},
            {text: 'Faroe Islands', code: 'FO'},
            {text: 'Fiji', code: 'FJ'},
            {text: 'Finland', code: 'FI'},
            {text: 'France', code: 'FR'},
            {text: 'French Guiana', code: 'GF'},
            {text: 'French Polynesia', code: 'PF'},
            {text: 'French Southern Territories', code: 'TF'},
            {text: 'Gabon', code: 'GA'},
            {text: 'Gambia', code: 'GM'},
            {text: 'Georgia', code: 'GE'},
            {text: 'Germany', code: 'DE'},
            {text: 'Ghana', code: 'GH'},
            {text: 'Gibraltar', code: 'GI'},
            {text: 'Greece', code: 'GR'},
            {text: 'Greenland', code: 'GL'},
            {text: 'Grenada', code: 'GD'},
            {text: 'Guadeloupe', code: 'GP'},
            {text: 'Guam', code: 'GU'},
            {text: 'Guatemala', code: 'GT'},
            {text: 'Guernsey', code: 'GG'},
            {text: 'Guinea', code: 'GN'},
            {text: 'Guinea-Bissau', code: 'GW'},
            {text: 'Guyana', code: 'GY'},
            {text: 'Haiti', code: 'HT'},
            {text: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {text: 'Holy See (Vatican City State)', code: 'VA'},
            {text: 'Honduras', code: 'HN'},
            {text: 'Hong Kong', code: 'HK'},
            {text: 'Hungary', code: 'HU'},
            {text: 'Iceland', code: 'IS'},
            {text: 'India', code: 'IN'},
            {text: 'Indonesia', code: 'ID'},
            {text: 'Iran, Islamic Republic Of', code: 'IR'},
            {text: 'Iraq', code: 'IQ'},
            {text: 'Ireland', code: 'IE'},
            {text: 'Isle of Man', code: 'IM'},
            {text: 'Israel', code: 'IL'},
            {text: 'Italy', code: 'IT'},
            {text: 'Jamaica', code: 'JM'},
            {text: 'Japan', code: 'JP'},
            {text: 'Jersey', code: 'JE'},
            {text: 'Jordan', code: 'JO'},
            {text: 'Kazakhstan', code: 'KZ'},
            {text: 'Kenya', code: 'KE'},
            {text: 'Kiribati', code: 'KI'},
            {text: 'Korea, Democratic People\'S Republic of', code: 'KP'},
            {text: 'Korea, Republic of', code: 'KR'},
            {text: 'Kuwait', code: 'KW'},
            {text: 'Kyrgyzstan', code: 'KG'},
            {text: 'Lao People\'S Democratic Republic', code: 'LA'},
            {text: 'Latvia', code: 'LV'},
            {text: 'Lebanon', code: 'LB'},
            {text: 'Lesotho', code: 'LS'},
            {text: 'Liberia', code: 'LR'},
            {text: 'Libyan Arab Jamahiriya', code: 'LY'},
            {text: 'Liechtenstein', code: 'LI'},
            {text: 'Lithuania', code: 'LT'},
            {text: 'Luxembourg', code: 'LU'},
            {text: 'Macao', code: 'MO'},
            {text: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {text: 'Madagascar', code: 'MG'},
            {text: 'Malawi', code: 'MW'},
            {text: 'Malaysia', code: 'MY'},
            {text: 'Maldives', code: 'MV'},
            {text: 'Mali', code: 'ML'},
            {text: 'Malta', code: 'MT'},
            {text: 'Marshall Islands', code: 'MH'},
            {text: 'Martinique', code: 'MQ'},
            {text: 'Mauritania', code: 'MR'},
            {text: 'Mauritius', code: 'MU'},
            {text: 'Mayotte', code: 'YT'},
            {text: 'Mexico', code: 'MX'},
            {text: 'Micronesia, Federated States of', code: 'FM'},
            {text: 'Moldova, Republic of', code: 'MD'},
            {text: 'Monaco', code: 'MC'},
            {text: 'Mongolia', code: 'MN'},
            {text: 'Montserrat', code: 'MS'},
            {text: 'Morocco', code: 'MA'},
            {text: 'Mozambique', code: 'MZ'},
            {text: 'Myanmar', code: 'MM'},
            {text: 'Namibia', code: 'NA'},
            {text: 'Nauru', code: 'NR'},
            {text: 'Nepal', code: 'NP'},
            {text: 'Netherlands', code: 'NL'},
            {text: 'Netherlands Antilles', code: 'AN'},
            {text: 'New Caledonia', code: 'NC'},
            {text: 'New Zealand', code: 'NZ'},
            {text: 'Nicaragua', code: 'NI'},
            {text: 'Niger', code: 'NE'},
            {text: 'Nigeria', code: 'NG'},
            {text: 'Niue', code: 'NU'},
            {text: 'Norfolk Island', code: 'NF'},
            {text: 'Northern Mariana Islands', code: 'MP'},
            {text: 'Norway', code: 'NO'},
            {text: 'Oman', code: 'OM'},
            {text: 'Pakistan', code: 'PK'},
            {text: 'Palau', code: 'PW'},
            {text: 'Palestinian Territory, Occupied', code: 'PS'},
            {text: 'Panama', code: 'PA'},
            {text: 'Papua New Guinea', code: 'PG'},
            {text: 'Paraguay', code: 'PY'},
            {text: 'Peru', code: 'PE'},
            {text: 'Philippines', code: 'PH'},
            {text: 'Pitcairn', code: 'PN'},
            {text: 'Poland', code: 'PL'},
            {text: 'Portugal', code: 'PT'},
            {text: 'Puerto Rico', code: 'PR'},
            {text: 'Qatar', code: 'QA'},
            {text: 'Reunion', code: 'RE'},
            {text: 'Romania', code: 'RO'},
            {text: 'Russian Federation', code: 'RU'},
            {text: 'RWANDA', code: 'RW'},
            {text: 'Saint Helena', code: 'SH'},
            {text: 'Saint Kitts and Nevis', code: 'KN'},
            {text: 'Saint Lucia', code: 'LC'},
            {text: 'Saint Pierre and Miquelon', code: 'PM'},
            {text: 'Saint Vincent and the Grenadines', code: 'VC'},
            {text: 'Samoa', code: 'WS'},
            {text: 'San Marino', code: 'SM'},
            {text: 'Sao Tome and Principe', code: 'ST'},
            {text: 'Saudi Arabia', code: 'SA'},
            {text: 'Senegal', code: 'SN'},
            {text: 'Serbia and Montenegro', code: 'CS'},
            {text: 'Seychelles', code: 'SC'},
            {text: 'Sierra Leone', code: 'SL'},
            {text: 'Singapore', code: 'SG'},
            {text: 'Slovakia', code: 'SK'},
            {text: 'Slovenia', code: 'SI'},
            {text: 'Solomon Islands', code: 'SB'},
            {text: 'Somalia', code: 'SO'},
            {text: 'South Africa', code: 'ZA'},
            {text: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {text: 'Spain', code: 'ES'},
            {text: 'Sri Lanka', code: 'LK'},
            {text: 'Sudan', code: 'SD'},
            {text: 'Suriname', code: 'SR'},
            {text: 'Svalbard and Jan Mayen', code: 'SJ'},
            {text: 'Swaziland', code: 'SZ'},
            {text: 'Sweden', code: 'SE'},
            {text: 'Switzerland', code: 'CH'},
            {text: 'Syrian Arab Republic', code: 'SY'},
            {text: 'Taiwan, Province of China', code: 'TW'},
            {text: 'Tajikistan', code: 'TJ'},
            {text: 'Tanzania, United Republic of', code: 'TZ'},
            {text: 'Thailand', code: 'TH'},
            {text: 'Timor-Leste', code: 'TL'},
            {text: 'Togo', code: 'TG'},
            {text: 'Tokelau', code: 'TK'},
            {text: 'Tonga', code: 'TO'},
            {text: 'Trinidad and Tobago', code: 'TT'},
            {text: 'Tunisia', code: 'TN'},
            {text: 'Turkey', code: 'TR'},
            {text: 'Turkmenistan', code: 'TM'},
            {text: 'Turks and Caicos Islands', code: 'TC'},
            {text: 'Tuvalu', code: 'TV'},
            {text: 'Uganda', code: 'UG'},
            {text: 'Ukraine', code: 'UA'},
            {text: 'United Arab Emirates', code: 'AE'},
            {text: 'United Kingdom', code: 'GB'},
            {text: 'United States', code: 'US'},
            {text: 'United States Minor Outlying Islands', code: 'UM'},
            {text: 'Uruguay', code: 'UY'},
            {text: 'Uzbekistan', code: 'UZ'},
            {text: 'Vanuatu', code: 'VU'},
            {text: 'Venezuela', code: 'VE'},
            {text: 'Vietnam', code: 'VN'},
            {text: 'Virgin Islands, British', code: 'VG'},
            {text: 'Virgin Islands, U.S.', code: 'VI'},
            {text: 'Wallis and Futuna', code: 'WF'},
            {text: 'Western Sahara', code: 'EH'},
            {text: 'Yemen', code: 'YE'},
            {text: 'Zambia', code: 'ZM'},
            {text: 'Zimbabwe', code: 'ZW'}
        ];
    });

    app.config(function(I18nPropertyServiceProvider) {
        I18nPropertyServiceProvider.setFilePath('/i18n/');
        I18nPropertyServiceProvider.setDefaultLanguage('de');
        I18nPropertyServiceProvider.setSupportedLanguages(['de', 'fr', 'it']);
    });

    app.config(function(UiConfigServiceProvider) {
        UiConfigServiceProvider.setConfig({
            labelWidth:3,
            commonSubmit:'Submit',
            commonCancel:'Cancel',
            titleSelect:'testPleaseChoose',
            gridDefaultDevice:'md'
        })
    });

    app.config(function (hljsServiceProvider) {
        hljsServiceProvider.setOptions({
            // replace tab with 4 spaces
            tabReplace: '    '
        });
    });

    app.config(function ($routeProvider,$httpProvider) {
        /** Enable cross domain communication **/
        $httpProvider.defaults.headers.useXDomain=true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];


        /** -- Routings -- **/
        $routeProvider.when('/',
                angularAMD.route({
                    templateUrl: '/pages/common/welcome.html'
                }))
            .when('/getting_started',
            angularAMD.route({
                templateUrl: '/pages/info/getting_started.html'
            }))
            .when('/less',
            angularAMD.route({
                templateUrl: '/pages/info/less.html'
            }))
            .when('/angular',
            angularAMD.route({
                templateUrl: '/pages/info/ng.html'
            }))
            .when('/components',
                angularAMD.route({
                    templateUrl: '/pages/info/components.html'
                }));
        /** 404 **/
        $routeProvider.otherwise({templateUrl: '/pages/common/404.html'});
    });

    angularAMD.bootstrap(app);

    return app;
});