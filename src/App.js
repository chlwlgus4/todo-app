import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos() {
    const array = [];
    for (let i = 0; i <= 2500; i++) {
        array.push({
            id: i,
            text: `할 일 ${i}`,
            checked: false,
        });
    }
    return array;
}

const App = () => {

    const [todos, setTodos] = useState(
    /*    [
        {
            id: 1,
            text: '리액트의 기초 알아보기',
            checked: true,
        },
        {
            id: 2,
            text: '컴포넌트 스타일링해 보기',
            checked: true,
        },
        {
            id: 3,
            text: '일정 관리 앱 만들어 보기',
            checked: false,
        },
    ]*/
        createBulkTodos
    );

    // 고윳값으로 사용될 id
    // ref를 사용하여 변수 담기
    // const nextId = useRef(4);
    const nextId = useRef(2501);

    //todos값이 변할 때 마다 렌더링이 되기 때문에 최적화를 위해 useCallback사용
    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            }
            // setTodos(todos.concat(todo));
            // 최적화
            setTodos(todo => todo.concat(todo));
            nextId.current += 1; //nextId 1씩 증가
        },
        // [todos],
        // 최적화
        [],
    );

    const onRemove = useCallback(
        id => {
            // setTodos(todos.filter(todo => todo.id !== id));
            //최적화
            setTodos(todos =>  todos.filter(todo => todo.id !== id));
        },
        // [todos]
        // 최적화
        []
    );

    const onToggle = useCallback(
        id => {
            // setTodos(
            //     todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked } : todo,
            //     ),
            //최적화
            setTodos( todos =>
                todos.map(todo =>
                    todo.id === id ? {...todo, checked: !todo.checked } : todo,
                ),
            )
        },
        // [todos]
        // 최적화
        []
    )

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};

export default App;

