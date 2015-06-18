/*global angular*/
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    app.config(['NgAdminConfigurationProvider', 'RestangularProvider', '$httpProvider',
    function (NgAdminConfigurationProvider, RestangularProvider, $httpProvider) {
        var nga = NgAdminConfigurationProvider;

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

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
            var res;
            if (operation === "getList") {
                res = response.results;
            } else {
                res = response;
            }
            console.log(res);
            return res;
        });
        RestangularProvider.setRequestSuffix('/?');

        var admin = nga.application('People Per Project Provisioning')
            .baseApiUrl('/api/');

        var skill = nga.entity('skills');
        var team = nga.entity('teams');
        var teammate = nga.entity('teammates');
        var category = nga.entity('categories');
        var project = nga.entity('projects');

        admin
            .addEntity(skill)
            .addEntity(team)
            .addEntity(teammate)
            .addEntity(category)
            .addEntity(project)
            ;

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
            .listActions(['edit', 'delete']);

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
            .listActions(['edit', 'delete']);

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

        var availabilty = [
            { label:'0.5 jours / semaine', value:'1' },
            { label:'1 jour  / semaine', value:'2' },
            { label:'1.5 jours / semaine', value:'3' },
            { label:'2 jours / semaine', value:'4' },
            { label:'2.5 jours / semaine', value:'5' },
            { label:'3 jours / semaine', value:'6' },
            { label:'3.5 jours / semaine', value:'7' },
            { label:'4 jours / semaine', value:'8' },
            { label:'4.5 jours / semaine', value:'9' },
            { label:'5 jours / semaine', value:'10' }
        ];

        teammate.label("Membres d'équipe");
        teammate.dashboardView().disable();

        teammate.listView()
            .title('Membres d\'équipes')
            .fields([
                nga.field('id').label('#'),
                nga.field('name').label('Nom'),
                nga.field('external', 'boolean').label('Prestataire'),
                nga.field('team', 'reference').label('Equipe')
                    .targetEntity(team)
                    .targetField(nga.field('desc')),
                nga.field('skills', 'reference_many').label('Compétences')
                    .targetEntity(skill)
                    .targetField(nga.field('desc')),
                nga.field('half_days_per_week').label('Disponibilité')
                    .map(function(value) { return (value / 2); })
            ])
            .listActions(['edit', 'delete']);

        teammate.creationView()
            .title('Nouveau membre d\'équipe')
            .fields([
                nga.field('name').label('Nom')
                    .attributes({ placeholder: 'Exemple: Dave Lopper' })
                    .validation({ required: true, minlength: 3, maxlength: 50 }),
                nga.field('external', 'boolean').label('Prestataire'),
                nga.field('half_days_per_week', 'choice').label('Disponibilité')
                    .choices(availabilty),
                nga.field('skills', 'reference_many').label('Compétences')
                    .targetEntity(skill)
                    .targetField(nga.field('desc')),
                nga.field('team', 'reference').label('Equipe')
                    .targetEntity(team)
                    .targetField(nga.field('desc'))
            ]);

        teammate.editionView()
            .title('Edition du membre d\'équipe #{{ entry.values.id }}')
            .fields([
                teammate.creationView().fields()
            ]);

        // ============================================
        // ================ CATEGORIES ================
        // ============================================

        category.label("Catégories de projets");
        category.dashboardView().disable();

        category.listView()
            .title('Catégories de projets')
            .fields([
                nga.field('id').label('#'),
                nga.field('code').label('Code'),
                nga.field('desc').label('Description'),
            ])
            .listActions(['edit', 'delete']);

        category.creationView()
            .title('Nouvelle catégorie de projets')
            .fields([
                nga.field('code').label('Code')
                    .attributes({ placeholder: 'Exemple: MONETIQUE' })
                    .validation({ required: true, minlength: 3, maxlength: 50 }),
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Projets monétiques' })
                    .validation({ required: true, minlength: 3, maxlength: 250 })
            ]);

        category.editionView()
            .title('Edition de la catégorie de projets #{{ entry.values.id }}')
            .fields([
                category.creationView().fields()
            ]);

        // ==========================================
        // ================ PROJECTS ================
        // ==========================================

        project.label("Projets");
        project.dashboardView().disable();

        project.listView()
            .title('Projets')
            .fields([
                nga.field('id').label('#'),
                nga.field('code').label('Code'),
                nga.field('desc').label('Description'),
                nga.field('category', 'reference').label('Catégorie')
                    .targetEntity(category)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité')
            ])
            .listActions(['edit', 'delete']);

        project.creationView()
            .title('Nouveau projet')
            .fields([
                nga.field('code').label('Code')
                    .attributes({ placeholder: 'Exemple: LUMA' })
                    .validation({ required: true, minlength: 3, maxlength: 50 }),
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Lyra Update MAnager' })
                    .validation({ required: true, minlength: 3, maxlength: 250 }),
                nga.field('category', 'reference').label('Catégorie')
                    .targetEntity(category)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité')
            ]);

        project.editionView()
            .title('Edition du projet #{{ entry.values.id }}')
            .fields([
                project.creationView().fields()
            ]);

        // =======================================
        // customize menu
        admin.menu(nga.menu()
            .addChild(nga.menu(skill).icon('<span class="glyphicon glyphicon-education"></span>'))
            .addChild(nga.menu(team).icon('<span class="glyphicon glyphicon-home"></span>'))
            .addChild(nga.menu(teammate).icon('<span class="glyphicon glyphicon-user"></span>'))
            .addChild(nga.menu(category).icon('<span class="glyphicon glyphicon-tag"></span>'))
            .addChild(nga.menu(project).icon('<span class="glyphicon glyphicon-tags"></span>'))
        );
        nga.configure(admin);
    }]);


}());