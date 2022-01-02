import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => {
    // これはもう魔法だからそういう物だって覚えて
    return setTodoText(event.target.value);
  };
  const onClickAdd = () => {
    if (todoText === "") return;
    // stateの第二引数は第一引数に変更を加えるためのものだよ、忘れないでね。
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    // 未完了のTODOを全て新しい変数に格納
    const newIncompleteTodos = [...incompleteTodos];

    // 新しい変数に格納した未完了のTODOのIndex番号を参照して削除
    newIncompleteTodos.splice(index, 1);

    // 完了したTODOと未完了のTODOの配列を新しい変数に格納
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    //　セット関数にそれぞれ格納
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    /**
     * 必要な処理。
     * 完了のTODOを新しい変数に格納
     * 新しい変数に格納した完了のTODOをindex番号を参照して削除
     * 完了したTODOと未完了のTODOを新しい変数に格納（全ての数は変わらないから元々のものを使ってしまって良い）
     * セット関数にそれぞれ格納
     */
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5 && true}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTodoは5個までです。</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
