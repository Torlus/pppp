/*global angular*/
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    app.factory('slashAdder', [function() {
        var slashAdder = {
            request: function(config) {
                var last = config.url[config.url.length - 1];
                if (last != '/') {
                    config.url += '/';
                }
                return config;
            }
        };
        return slashAdder;
    }]);

    app.config(['NgAdminConfigurationProvider', 'RestangularProvider', '$httpProvider',
    function (NgAdminConfigurationProvider, RestangularProvider, $httpProvider) {
        var nga = NgAdminConfigurationProvider;

        function checkBounds(lower, upper) {
            return function(value) {
                var n = parseInt(value);
                return (isNaN(n) ? false : (n >= lower) && (n <= upper));
            };
        }

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.interceptors.push('slashAdder');

        // use the custom query parameters function to format the API request correctly
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
            console.log(url);
            console.log(operation);
            console.log(what);
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
            // console.log(res);
            return res;
        });
        // RestangularProvider.setRequestSuffix('');

        var admin = nga.application('People Per Project Provisioning')
            .baseApiUrl('/pppp/api/');

        var skill = nga.entity('skills');
        var team = nga.entity('teams');
        var teammate = nga.entity('teammates');
        var category = nga.entity('categories');
        var project = nga.entity('projects');
        var task = nga.entity('tasks');
        var work = nga.entity('works');

        admin
            .addEntity(skill)
            .addEntity(team)
            .addEntity(teammate)
            .addEntity(category)
            .addEntity(project)
            .addEntity(task)
            .addEntity(work)
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
                nga.field('desc').label('Description')
            ])
            .listActions(['edit', 'delete'])
            .batchActions([]);

        skill.creationView()
            .title('Nouvelle Compétence')
            .fields([
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Architecture' })
                    .validation({ required: true, minlength: 3, maxlength: 250 })
            ]);

        skill.editionView()
            .title('Edition de la Compétence #{{ entry.values.id }}')
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
                nga.field('desc').label('Description')
            ])
            .listActions(['edit', 'delete'])
            .batchActions([]);

        team.creationView()
            .title('Nouvelle Equipe')
            .fields([
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Equipe projet Sepamail' })
                    .validation({ required: true, minlength: 3, maxlength: 250 })
            ]);

        team.editionView()
            .title('Edition de l\'Equipe #{{ entry.values.id }}')
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
            .batchActions([])
            .title('Membres d\'équipe')
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
            .listActions(['edit', 'delete'])
            .batchActions([]);

        teammate.creationView()
            .title('Nouveau Membre d\'équipe')
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
            .title('Edition du Membre d\'équipe #{{ entry.values.id }}')
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
                nga.field('desc').label('Description')
            ])
            .listActions(['edit', 'delete'])
            .batchActions([]);

        category.creationView()
            .title('Nouvelle Catégorie de projets')
            .fields([
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Projets monétiques' })
                    .validation({ required: true, minlength: 3, maxlength: 250 })
            ]);

        category.editionView()
            .title('Edition de la Catégorie de projets #{{ entry.values.id }}')
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
                nga.field('desc').label('Description'),
                nga.field('category', 'reference').label('Catégorie')
                    .targetEntity(category)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité')
            ])
            .listActions(['edit', 'delete'])
            .batchActions([]);

        project.creationView()
            .title('Nouveau Projet')
            .fields([
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Lyra Update MAnager' })
                    .validation({ required: true, minlength: 3, maxlength: 250 }),
                nga.field('category', 'reference').label('Catégorie')
                    .targetEntity(category)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité')
                     .defaultValue(10)
                    .validation({required: true, validator: checkBounds(1, 20)})
            ]);

        project.editionView()
            .title('Edition du Projet #{{ entry.values.id }}')
            .fields([
                project.creationView().fields()
            ]);

        // =======================================
        // ================ TASKS ================
        // =======================================

        task.label("Tâches");
        task.dashboardView().disable();

        task.listView()
            .title('Tâches')
            .fields([
                nga.field('id').label('#'),
                nga.field('project', 'reference').label('Projet')
                    .targetEntity(project)
                    .targetField(nga.field('desc')),
                nga.field('desc').label('Description'),
                nga.field('teams', 'reference_many').label('Equipes')
                    .targetEntity(team)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité')
            ])
            .listActions(['edit', 'delete'])
            .batchActions([]);

        task.creationView()
            .title('Nouvelle Tâche')
            .fields([
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Gestion de l\'authentification'})
                    .validation({ required: true, minlength: 3, maxlength: 250 }),
                nga.field('project', 'reference').label('Projet')
                    .targetEntity(project)
                    .targetField(nga.field('desc')),
                nga.field('teams', 'reference_many').label('Equipes')
                    .targetEntity(team)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité')
                    .defaultValue(10)
                    .validation({required: true, validator: checkBounds(1, 20)})
            ]);

        task.editionView()
            .title('Edition de la tâche #{{ entry.values.id }}')
            .fields([
                task.creationView().fields()
            ]);

        // =======================================
        // ================ WORKS ================
        // =======================================

        work.label("Charges");
        work.dashboardView().disable();

        work.listView()
            .title('Charges')
            .fields([
                nga.field('id').label('#'),
                nga.field('project', 'reference').label('Projet')
                    .targetEntity(project)
                    .targetField(nga.field('desc')),
                nga.field('task', 'reference').label('Tâche')
                    .targetEntity(task)
                    .targetField(nga.field('desc')),
                nga.field('desc').label('Description')
                    .attributes({ placeholder: 'Exemple: Chiffrement des mots de passe' })
                    .validation({ required: true, minlength: 3, maxlength: 250 }),
                nga.field('skill', 'reference').label('Compétence')
                    .targetEntity(skill)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité'),
                nga.field('man_days', 'number').label('Jours Homme')
            ])
            .listActions(['edit', 'delete'])
            .batchActions([]);

        work.creationView()
            .title('Nouvelle Charge')
            .fields([
                nga.field('desc').label('Description'),
                nga.field('task', 'reference').label('Tâche')
                    .targetEntity(task)
                    .targetField(nga.field('desc')),
                nga.field('skill', 'reference').label('Compétence')
                    .targetEntity(skill)
                    .targetField(nga.field('desc')),
                nga.field('priority', 'number').label('Priorité')
                    .defaultValue(10)
                    .validation({required: true, validator: checkBounds(1, 20)}),
                nga.field('man_days', 'number').label('Jours Homme')
                    .defaultValue(1)
                    .validation({required: true, validator: checkBounds(1, 1000)})
            ]);

        work.editionView()
            .title('Edition de la Charge #{{ entry.values.id }}')
            .fields([
                work.creationView().fields()
            ]);

        // =======================================
        // customize menu
        admin.menu(nga.menu()
            .addChild(nga.menu(skill).icon('<span class="glyphicon glyphicon-education"></span>'))
            .addChild(nga.menu(team).icon('<span class="glyphicon glyphicon-home"></span>'))
            .addChild(nga.menu(teammate).icon('<span class="glyphicon glyphicon-user"></span>'))
            .addChild(nga.menu(category).icon('<span class="glyphicon glyphicon-tags"></span>'))
            .addChild(nga.menu(project).icon('<span class="glyphicon glyphicon-tag"></span>'))
            .addChild(nga.menu(task).icon('<span class="glyphicon glyphicon-file"></span>'))
            .addChild(nga.menu(work).icon('<span class="glyphicon glyphicon-tasks"></span>'))
        );
        nga.configure(admin);
    }]);

}());
