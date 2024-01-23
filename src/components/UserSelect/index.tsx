import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';
import { useEffect, useState } from 'react';
import { Todo } from '../MainApp';

type UserSelectProps = {
    user?: number,
    idx: number,
}

type User = {
    name: string,
    id: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    const todos = useSelector((state: {list: { todos: Todo[] }}) => state.list.todos);
    useEffect(
        () => {
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    const [options, setOptions] = useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => ({
            ...t,
            user: index === idx ? Number(e.target.value): t.user
        }));
        // Should define action type in action file
        dispatch({type: 'CHANGE_TODO', payload: changedTodos});
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {options.map((user: User) => <option value={user.id} key={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
