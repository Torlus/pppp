/*global angular*/
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    app.config(['NgAdminConfigurationProvider', 'RestangularProvider', function (NgAdminConfigurationProvider, RestangularProvider) {
        var nga = NgAdminConfigurationProvider;

        function truncate(value) {
            if (!value) {
                return '';
            }

            return value.length > 50 ? value.substr(0, 50) + '...' : value;
        }

        // use the custom query parameters function to format the API request correctly
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
            console.log(url);
            console.log(params);
            if (operation == "getList") {
                // custom pagination params
                if (params._page) {
                    params._start = (params._page - 1) * params._perPage;
                    params._end = params._page * params._perPage;
                }
                delete params._page;
                delete params._perPage;
                // custom sort params
                if (params._sortField) {
                    params._sort = params._sortField;
                    delete params._sortField;
                }
                // custom filters
                if (params._filters) {
                    for (var filter in params._filters) {
                        params[filter] = params._filters[filter];
                    }
                    delete params._filters;
                }
            }
            return { params: params };
        });
        RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
            var newResponse;
            if (operation === "getList") {
                newResponse = response.results;
            } else {
                newResponse = response;
            }
            console.log(newResponse);
            return newResponse;
        });
        RestangularProvider.setRequestSuffix('/?');

        var admin = nga.application('People Per Project Provisioning') // application main title
            .baseApiUrl('/api/'); // main API endpoint

        // define all entities at the top to allow references between them
        var skill = nga.entity('skills'); // the API endpoint for posts will be http://localhost:3000/posts/:id

        // set the application entities
        admin
            .addEntity(skill);

        // customize entities and views
        skill.dashboardView().disable();

        skill.listView()
            .title('Skills') // default title is "[Entity_name] list"
            // .description('Skills list') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('id').label('id'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('code'), // the default list field type is "string", and displays as a string
                nga.field('created_at', 'date')  // Date field type allows date formatting
            ])
            .listActions(['show', 'edit', 'delete']);

        skill.creationView()
            .fields([
                nga.field('code') // the default edit field type is "string", and displays as a text input
                    .attributes({ placeholder: 'code' }) // you can add custom attributes, too
                    .validation({ required: true, minlength: 3, maxlength: 50 }), // add validation rules for fields
                nga.field('desc')
            ]);

        nga.configure(admin);
    }]);

}());