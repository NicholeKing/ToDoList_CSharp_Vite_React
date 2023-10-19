import { useEffect, useState } from "react";
import axios from 'axios';
import TodoForm from "./TodoForm";
const GetTodos = props => {
    const [allTasks, setAllTasks] = useState(null);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
	axios.get("https://localhost:7102/api/todoitems")
	     .then(res => setAllTasks(res.data))
    }, [update])
    // This will be what tells the list of all todos to update
    const triggerUpdate = () => {
	    setUpdate(!update);
    }
    const onChangeHandler = async item => {
        item.isComplete = !item.isComplete;
        try {
            const updateItem = await axios({
                url: `https://localhost:7102/api/todoitems/update/${item.id}`,
                method: "post",
                data: item,
                ContentType: "application/json"
            });
            // Need to update our list with the proper information
            setUpdate(!update);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteItem = async id => {
        try {
        const removeitem = await axios({
            url: `https://localhost:7102/api/todoitems/delete/${id}`,
            method: "post",
            ContentType: "application/json"
        });
        setUpdate(!update);
        } catch (err) {
        console.log(err);
        }
    }

    return(
	<>
            <h2>My Todo List</h2>
            {
                allTasks ? allTasks.map((item, i) => <div key={i}>
                    <h4 className={item.isComplete ? "success" : "todo"}>
	                - {item.name} 
	                <input type="checkbox" name="isComplete" checked={item.isComplete} className="ms-2" onChange={() => onChangeHandler(item)}/> 
                    <button onClick={() => deleteItem(item.id)} className="btn btn-warning ms-2">Delete</button>
	            </h4>
	        </div>)
	        : <h3>Loading...</h3>
	    }
        <hr />
	    <TodoForm triggerUpdate={triggerUpdate}/>
        </>
    );
}
export default GetTodos;

