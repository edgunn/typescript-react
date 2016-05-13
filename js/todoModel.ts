/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./interfaces.d.ts"/>

namespace app.models {

  export class TodoModel implements ITodoModel {

      public key: string; //Key used for local storage
      public todos: Array<ITodo>; //A list of tasks
      public onChanges: Array<any>; // A list of events

      constructor(key) {
        this.key = key;
        this.todos = app.miscellaneous.Utils.store(key);
        this.onChanges = [];
      }

      public subscribe(onChange) {
        this.onChanges.push(onChange);
      }

      public inform() {
        app.miscellaneous.Utils.store(this.key, this.todos);
        this.onChanges.forEach((a) => a());
      }

      public addTodo(title: string) {
        var newDo = {
          id: app.miscellaneous.Utils.generate_guid(),
          title: title,
          completed: false
        }

        this.todos = this.todos.concat(newDo);
        this.inform();
      }

      public toggleAll(checked) {
        this.todos = this.todos.map<ITodo>((todo : ITodo) => {
          return app.miscellaneous.Utils.extend(
            {}, todo, {completed: checked}
          );
        });

        this.inform();
      }

      public toggle(todoToToggle : ITodo) {
        this.todos = this.todos.map<ITodo>((todo : ITodo) => {
          return (todo !== todoToToggle) ? todo
            : app.miscellaneous.Utils.extend({}, todo, {completed: !todo.completed});
        });
        this.inform();
      }

      public destroy(todo : ITodo) {
        this.todos = this.todos.filter(t => {
          return t !== todo;
        });
        this.inform();
      }

      public save(todoToSave, text) {
        this.todos = this.todos.map<ITodo>((t) => {
          return (t !== todoToSave) ? t :
            app.miscellaneous.Utils.extend({}, t, {title: text})
        })
        this.inform();
      }

      public clearCompleted() {
        this.todos = this.todos.filter(t => {
          return !t.completed;
        });
        this.inform();
      }


  }
}
