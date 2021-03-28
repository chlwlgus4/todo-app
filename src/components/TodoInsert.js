import React, {useState, useCallback} from 'react';
import {MdAdd} from 'react-icons/md'; //아이콘
import './TodoInsert.scss';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    // 컴포넌트가 처음 렌더링될 때만 함수 생성
    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    // onSubmit으로 한 이유는 submit 이벤트는 엔터를 눌렀을 때도 발생하기 때문
    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue(''); // value 값 초기화

            //submit 이벤트는 브라우저에서 새로고침을 발생시키기 때문에 이를 방지하기 위해 e.preventDefault() 호출
            e.preventDefault();
        },
        [onInsert, value]
    )

    return (
        <form className={'TodoInsert'} onSubmit={onSubmit}>
            <input
                placeholder={'할 일을 입력하세요'}
                value={value}
                onChange={onChange}
            />
            <button type={'submit'}>
                <MdAdd/>
            </button>
        </form>
    );
};

export default TodoInsert;
