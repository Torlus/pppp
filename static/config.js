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
        var team = nga.entity('teams');
        var teammate = nga.entity('teammates');

        admin
            .addEntity(skill)
            .addEntity(team)
            .addEntity(teammate);

        // ========================================
        // ================ SKILLS ================
        // ========================================

        skill.label("Compétences");
        skill.dashboardView().disable();

        skill.listView()
            .title('Compétences')
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


        // =======================================
        // ================ TEAMS ================
        // =======================================

        team.label("Equipes");
        team.dashboardView().disable();

        team.listView()
            .title('Equipes')
            .fields([
                nga.field('id').label('#'),
                nga.field('code').label('Code'),
                nga.field('desc').label('Description'),
            ])
            .listActions(['show', 'edit', 'delete']);

        team.creationView()
            .title('Nouvelle équipe')
            .fields([
                nga.field('code').label('Code')
                    .attributes({ placeholder: 'Exemple: SEPAMAIL' })
                    .validation({ required: true, minlength: 3, maxlength: 50 }),
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Equipe projet Sepamail' })
                    .validation({ required: true, minlength: 3, maxlength: 250 })
            ]);

        team.editionView()
            .title('Edition de l\'équipe #{{ entry.values.id }}')
            .fields([
                team.creationView().fields()
            ]);

        // ===========================================
        // ================ TEAMMATES ================
        // ===========================================

        teammate.label("Membres d'équipe");
        teammate.dashboardView().disable();

        teammate.listView()
            .title('Membres d\'équipes')
            .fields([
                nga.field('id').label('#'),
                nga.field('name').label('Nom')
            ])
            .listActions(['show', 'edit', 'delete']);

        teammate.creationView()
            .title('Nouveau membre d\'équipe')
            .fields([
                nga.field('name').label('Nom')
                    .attributes({ placeholder: 'Exemple: Dave Lopper' })
                    .validation({ required: true, minlength: 3, maxlength: 50 }),
                nga.field('external', 'boolean').label('Prestataire'),
                nga.field('half_days_per_week', 'choice').label('Disponibilité')
                    .choices([
                        { label:'0.5 jours', value:'1' },
                        { label:'1 jour', value:'2' },
                        { label:'1.5 jours', value:'3' },
                        { label:'2 jours', value:'4' },
                        { label:'2.5 jours', value:'5' },
                        { label:'3 jours', value:'6' },
                        { label:'3.5 jours', value:'7' },
                        { label:'4 jours', value:'8' },
                        { label:'4.5 jours', value:'9' },
                        { label:'5 jours', value:'10' }
                    ]),
                nga.field('skills', 'reference_many').label('Compétences')
                    .targetEntity(skill)
                    .targetField(nga.field('desc')),
                nga.field('team', 'reference').label('Equipe')
                    .targetEntity(team)
                    .targetField(nga.field('desc'))
            ]);

        // =======================================

        nga.configure(admin);
    }]);

}());