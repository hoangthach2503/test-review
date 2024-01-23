import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';


export type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};

class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    handleSubmitTodo = (todo: Todo) => {
        this.props.addTodo(todo)
    }

    onCheckTodo = (idx: number) => {
        const changedTodos = this.props.todos.map((t, index) => (
            {
                ...t,
                isDone: index === idx ? !t.isDone : t.isDone
            }
        ))
        this.props.changeTodo(changedTodos)
    }

    render() {
        const { todoTitle } = this.state;
        window.allTodosIsDone = true;

        window.allTodosIsDone = this.props.todos.every(t => t.isDone);

        return (
            <div>
                <Form.Check
                    type="checkbox"
                    label="all todos is done!"
                    checked={window.allTodosIsDone}
                    onChange={(e) => {
                        this.props.changeTodo(this.props.todos.map(item => (
                            {
                                ...item,
                                isDone: e.target.checked
                            }
                        )))
                    }}
                />
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {this.props.todos.map((t, idx) => (
                    <div className={styles.todo} key={`${t.title}${idx}`}>
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} onChange={() => this.onCheckTodo(idx)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        // Should define a Todo type to replace any
        addTodo: (todo: Todo) => {
            // Should define action type in action file
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        // Should define a Todo type to replace any
        // Should define action type in action file
        changeTodo: (todos: Todo[]) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        // Should generate a todo id to remove list and shouldn't remove by id
        // Should define action type in action file
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
