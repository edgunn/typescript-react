var app;
(function (app) {
    var models;
    (function (models) {
        var TodoModel = (function () {
            function TodoModel(key) {
                this.key = key;
                this.todos = app.miscellaneous.Utils.store(key);
                this.onChanges = [];
            }
            TodoModel.prototype.subscribe = function (onChange) {
                this.onChanges.push(onChange);
            };
            TodoModel.prototype.inform = function () {
                app.miscellaneous.Utils.store(this.key, this.todos);
                this.onChanges.forEach(function (a) { return a(); });
            };
            TodoModel.prototype.addTodo = function (title) {
                var newDo = {
                    id: app.miscellaneous.Utils.generate_guid(),
                    title: title,
                    completed: false
                };
                this.todos = this.todos.concat(newDo);
                this.inform();
            };
            TodoModel.prototype.toggleAll = function (checked) {
                this.todos = this.todos.map(function (todo) {
                    return app.miscellaneous.Utils.extend({}, todo, { completed: checked });
                });
                this.inform();
            };
            TodoModel.prototype.toggle = function (todoToToggle) {
                this.todos = this.todos.map(function (todo) {
                    return (todo !== todoToToggle) ? todo
                        : app.miscellaneous.Utils.extend({}, todo, { completed: !todo.completed });
                });
                this.inform();
            };
            TodoModel.prototype.destroy = function (todo) {
                this.todos = this.todos.filter(function (t) {
                    return t !== todo;
                });
                this.inform();
            };
            TodoModel.prototype.save = function (todoToSave, text) {
                this.todos = this.todos.map(function (t) {
                    return (t !== todoToSave) ? t :
                        app.miscellaneous.Utils.extend({}, t, { title: text });
                });
                this.inform();
            };
            TodoModel.prototype.clearCompleted = function () {
                this.todos = this.todos.filter(function (t) {
                    return !t.completed;
                });
                this.inform();
            };
            return TodoModel;
        }());
        models.TodoModel = TodoModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
