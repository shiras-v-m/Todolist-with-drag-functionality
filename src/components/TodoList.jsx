import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const TodoList = ({ todos, updateComplete, deleteItem, handleEditMode, reorderTodos }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: 16,
                      margin: '0 0 8px 0',
                      background: snapshot.isDragging ? '#d1e7dd' : '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      ...provided.draggableProps.style,
                    }}
                  >
                    <input
                      id={todo.id}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => updateComplete(todo.id)}
                    />
                    <label
                      htmlFor={todo.id}
                      style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginLeft: '8px' }}
                    >
                      {todo.text}
                    </label>
                    <button onClick={() => deleteItem(todo.id)} style={{ marginLeft: '8px' }}>Delete</button>
                    <button onClick={() => handleEditMode(todo.id)}>Update</button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
