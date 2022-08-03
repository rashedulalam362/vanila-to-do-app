//selcet all elements

const content=document.querySelector('.content');

const todoFrom=document.querySelector('.todo-form');

const inputTodo=document.querySelector('#inputTodo');

const todoAddButton=document.querySelector('#addButton');
const todoLists=document.querySelector('#lists');
const meassage=document.querySelector('#message');



//

const getTodosFromLocalStorage =()=>{
    return localStorage.getItem('newTodo') ? JSON.parse((localStorage.getItem('newTodo') )) : [];
}


//success show

const meassageShow=(text,status)=>{
    meassage.innerHTML=text;
    meassage.classList.add(`bg-${status}`);
    setTimeout(()=>{
        meassage.innerHTML=" ";
        meassage.classList.remove(`bg-${status}`);


    },1000)
}


const createTodo=(id,value)=>{
    const todoElement=document.createElement('li');
    todoElement.id=id;
    todoElement.classList.add('list-style');
    todoElement.innerHTML=`
     <span>${value}</span>
     <span><button class="btn" id="deletedBtn"><i class="fa fa-trash"></i></button></span>
    
      `
  todoLists.append(todoElement)

  const delteButton =document.querySelector('#deletedBtn');
  delteButton.addEventListener('click',adDeleted)

}


//delete list 

const adDeleted =(e)=>{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    meassageShow('delted', 'danger')
    let todos=getTodosFromLocalStorage();
     todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
  
};


//add to do
const addTodo = (event) => {
    event.preventDefault();
    const todoValue=inputTodo.value;
   

    //create unique id

    const id=Date.now().toString();
     createTodo(id,todoValue)
     meassageShow('created', 'success')
     //add to do into LocalStorage 

     const Todos=getTodosFromLocalStorage()
  
    Todos.push({id,todoValue})
    localStorage.setItem('newTodo',JSON.stringify(Todos));
    inputTodo.value =" ";

        
}
//load to do

const loadTodo =()=>{
 const todos=getTodosFromLocalStorage()
 todos.map((todo)=>createTodo(todo.id,todo.todoValue))

    
}

//add eevent listener 

todoFrom.addEventListener('submit',addTodo)
window.addEventListener('DOMContentLoaded',loadTodo)
