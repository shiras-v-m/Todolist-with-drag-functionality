import { useEffect, useRef } from "react";

const TodoInput = ({ userInput, setUserInput, addTodo, editMode, updateItem, editId }) => {
    const inputRef = useRef();

    useEffect(() => {
        if(editMode){
            inputRef.current.focus(); // Focus the input field when in edit mode
        }
    }, [editMode]);
    const handleSubmit = (e) => {
      e.preventDefault(); // prevents page refresh
      if (editMode) {
        updateItem(editId);
      } else {
        addTodo();
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          placeholder="Enter a todo"
        />
        <button type="submit">
          {editMode ? 'Update' : 'Add'}
        </button>
      </form>
    );
  };
  
  export default TodoInput;
  