/*global angular*/
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    app.config(['NgAdminConfigurationProvider', 'RestangularProvider', function (NgAdminConfigurationProvider, RestangularProvider) {
        var nga = NgAdminConfigurationProvider;

        // use the custom query parameters function to format the API request correctly
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
            console.log(url);
            console.log(params);
            if (operation == "getList") {
                // TODO
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

        var admin = nga.application('People Per Project Provisioning')
            .baseApiUrl('/api/');

        var skill = nga.entity('skills');

        admin
            .addEntity(skill);

        // ========================================
        // ================ SKILLS ================
        // ========================ß================

        skill.label("Compétences");
        skill.dashboardView().disable();

        skill.listView()
            .title('Compétences') // default title is "[Entity_name] list"
            // .description('Skills list') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('id').label('#'),
                nga.field('code').label('Code'),
                nga.field('desc').label('Description'),
            ])
            .listActions(['show', 'edit', 'delete']);

        skill.creationView()
            .title('Nouvelle compétence')
            .fields([
                nga.field('code').label('Code')
                    .attributes({ placeholder: 'Exemple: ARCH' })
                    .validation({ required: true, minlength: 3, maxlength: 50 }),
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Architecture' })
                    .validation({ required: true, minlength: 3, maxlength: 250 })
            ]);

        skill.editionView()
            .title('Edition de la compétence #{{ entry.values.id }}')
            .fields([
                skill.creationView().fields()
            ]);

        nga.configure(admin);
    }]);

}());