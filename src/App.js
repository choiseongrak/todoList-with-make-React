import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components';
import './App.css';


const ToDoListWrap = styled.div`
  width: 100%;
  height:100vh;
  background-color: #FFF;
  display: flex;
  padding-top: 300px;
  justify-content:center;
  .aaa {
    display: flex;
    justify-content:space-between;
    div{
      min-width: 150px;
      word-break: break-all

    }
  }
  
`

const TodoInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: 'Write',
}))`
  width: 300px;
  height: 30px;
  border: 1px solid #333;
  border-radius: 8px;
  &::placeholder{
    padding: 0 10px;
  }

  padding: 0 10px;
`

const TodoListBlock = styled.div`
  width: auto;
  color: black;
  padding-top: 20px;
  button {
    width: 40px;
    height: 20px;
    font-size: 10px;
  }
`

const TodoDoneBlock = styled.div`
  width: 150px;
  padding-top: 20px;
  button {
    width: 40px;
    height: 20px;
    font-size: 10px;
  }
`
function App() {

  const [value, setValue] = useState('');
  const [todo, setTodo] = useState([]);

  function onChangeValue(event) {
    setValue(event.target.value);
  }
  function onKeyDownTodo(event) {
    if(event.keyCode === 13) {
      const unique = todo.filter(item => item.title === value)
      if(unique.length) return alert('중복된 일정입니다.');
      
      setTodo(prev => [...prev,{title:value,done:false}]);
      setValue('');
    }
  }
  
  function TodoDone(value) {
    // const target = todo.filter(item => item.title === value);
    // target[0].done = true;
    // setTodo(target);
    setTodo(todo.map(item => item.title === value ? {
      ...item,
      done: !item.done
    }: item))
  }

  return (
    
    <ToDoListWrap>
      <div>
      <TodoInput value={value} onChange={onChangeValue} onKeyDown={onKeyDownTodo}/>
        <div className="aaa">
            <div style={{flex:1}}>
          {todo.map((value) => 
            value.done ? null : <Todo key={value.title} value={value} TodoDone={TodoDone}></Todo> )}
            </div>
          <div style={{flex:1}}>
          {todo.map((value,i) => 
            value.done ? <TodoDoneList key={value.title} value={value} TodoDone={TodoDone}/> : null)}
            </div>
        </div>
      </div>
    </ToDoListWrap>
    
  );
}

function Todo({value, TodoDone}) {
  return (
    
    <TodoListBlock>
      {value.done ? <del>{value.title}</del> : value.title} 
      <button onClick={() => TodoDone(value.title)}>
        {value.done ? '취소' : '완료'}
        </button>
    </TodoListBlock>
  )
}

function TodoDoneList({value,TodoDone}){
  return (
    <TodoDoneBlock>
      <del>{value.title}</del>
      <button onClick={() => TodoDone(value.title)}>
      {value.done ? '취소' : '완료'}
      </button>
    </TodoDoneBlock>
  )
}
export default App;
