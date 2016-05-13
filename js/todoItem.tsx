/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./interfaces.d.ts"/>

namespace app.components {

  export class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

    constructor(props: ITodoItemProps) {
      super(props);
      this.state = {editText: this.props.todo.title};
    }

    public handleSubmit(event) {
      var val = this.state.editText.trim();

      if (val) {
        this.props.onSave(val);
        this.setState({editText: val});
      } else {
        this.props.onDestroy();
      }
    }

    public handleEdit() {
      this.props.onEdit();
      this.setState({editText: this.props.todo.title});
    }
  }
}
