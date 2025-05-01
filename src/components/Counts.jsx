const Counts = ({completedTodos,totalTodos}) => { 
    
        return (
        <div className="counts">
        <p>Completed Todos : <span>{completedTodos}</span></p>
        <p>Total Number of todos : <span>{totalTodos}</span></p>

        </div>
    )

}

export default Counts