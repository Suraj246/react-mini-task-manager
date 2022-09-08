import React, {useState,useEffect} from 'react'



const getLocalStorageData= ()=>{
    let savedData = localStorage.getItem('taskList')
    // console.log(savedData)
    if(savedData){
        return JSON.parse(localStorage.getItem('taskList'))
    }
    else{
        return []
    }

}
function AddTask() {
    const [input,setInput]=useState("")
    const [items,setItems]=useState(getLocalStorageData())
    const [editIcon,setEditIcon]=useState(true)
    const [isTaskEdited,setIsTaskEdited]=useState(null)

    const inputHandle = (e)=>{
        setInput(e.target.value)
    }
    const addTask = ()=>{
        if(!input){
            alert("Please enter")
        }
        else if(input && !editIcon){
            setItems(
                items.map((elem)=>{
                    if(elem.id===isTaskEdited){
                        return (
                                {...items,name:input,date:new Date().toDateString()+" "+new Date().toLocaleTimeString()}
                        )
                    }
                    return elem;
                }))
        setEditIcon(true)
        setInput("")
        setIsTaskEdited(null)

        }
        else{
            let taskdata = { id: new Date().getTime(), name:input,date:new Date().toDateString() +" "+ new Date().toLocaleTimeString()}

            new Set(setItems([...items,taskdata]))
            setInput("")
            
        }
    }
    const stopRefreshing = (e)=>{
        e.preventDefault()
    }

    const deleteTask = (index)=>{
        console.log("Deleting",index)
        const updateItem = items.filter((elem)=>{
            return index!==elem.id
        })
        setItems(updateItem)     
    }
    const editTask = (index)=>{
        const edit = items.find((elem)=>{
            return index === elem.id
        })      
        console.log(edit)  
        setEditIcon(false)
        setInput(edit.name)
        setIsTaskEdited(index)

    }

    const removeAll=()=>{
        setItems([]);
    }

    // store data in local storage
    useEffect(()=>{
        localStorage.setItem("taskList",JSON.stringify(items))
    },[items])
  return (
    <div>
        <div className="form-control">
            <form action="" onSubmit={stopRefreshing} className="form">
                <input type="text" value={input} onChange={inputHandle}  placeholder="add task" />
                            
                <div className="btn-add-cls">
                    {editIcon ? <button onClick={addTask} className="btn-add">Add</button>:<button onClick={addTask}>edit</button>}
                    <button onClick={removeAll} className="btn-clear">Clear All <sup>{items.length}</sup></button>  
                </div>
            </form>      
        </div>
        <div className="s1">
            {items.length===0 ? "no more task" : 
            <div className="container">
                <h3 style={{textAlign: 'center'}}>Tasks</h3>
                {items.filter((val)=>{
                    if(input == ""){
                        return val
                    }else if(val.name.toLowerCase().includes(input.toLocaleLowerCase())){
                        return val
                    }
                }).map((item)=>{
                    return( 
                        <div key={item.id} className="items"onDoubleClick={()=>editTask(item.id)}>
                            <div >
                                <li >{item.name}</li>    
                            </div>
                            <div className="item-btn">
                                <button className="btn-date">{item.date}</button>
                                <i className='bx bxs-edit btn-edit' onClick={()=>editTask(item.id)}></i>
                                <i className='bx bx-minus-circle btn-del'onClick={()=>deleteTask(item.id)}></i>
                            </div>
                        </div>
                    )
                })}


           
            </div>}

                {/* <div className='drop-container'>
                    <div className="container">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio assumenda culpa nostrum laborum eos aspernatur nam sapiente aperiam reprehenderit alias dolor tempora ea, impedit voluptatibus excepturi eveniet quasi laudantium fuga.

                    </div>
                </div> */}
        </div>
    </div>
  )
}

export default AddTask
