import React from 'react';
import TodoListItem from "./TodoListItem";
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
    return (
        <div className={'TodoList'}>
            {todos.map(todo => (
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

// 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정
export default React.memo(TodoList);
