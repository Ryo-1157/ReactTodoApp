import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={todo}>
              <p>{todo}</p>
              <button onClick={() => onClickComplete(index)}>完了</button>
              {/* 関数に引数を渡したい時は、アロー関数で新しく関数を生成してあげる必要がある。 */}
              <button onClick={() => onClickDelete(index)}>削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
