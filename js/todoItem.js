var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var components;
    (function (components) {
        var TodoItem = (function (_super) {
            __extends(TodoItem, _super);
            function TodoItem(props) {
                _super.call(this, props);
                this.state = { editText: this.props.todo.title };
            }
            TodoItem.prototype.handleSubmit = function (event) {
                var val = this.state.editText.trim();
                if (val) {
                    this.props.onSave(val);
                    this.setState({ editText: val });
                }
                else {
                    this.props.onDestroy();
                }
            };
            TodoItem.prototype.handleEdit = function () {
                this.props.onEdit();
                this.setState({ editText: this.props.todo.title });
            };
            return TodoItem;
        }(React.Component));
        components.TodoItem = TodoItem;
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
