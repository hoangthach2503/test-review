import { configureStore } from '@reduxjs/toolkit'
import { Todo } from '../components/MainApp';

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                // Should define action type in action file
                case 'ADD_TODO': {
                    const {todos} = state;
                    return {
                        ...state,
                        todos: [
                            ...todos,
                            action.payload
                        ]
                    };
                }
                // Should define action type in action file
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: Todo, index: number) => index !== action.payload),
                    };
                }
                // Should define action type in action file
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
