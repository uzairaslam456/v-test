import React, {useState, useEffect} from 'react'

const Todolist = () => {

    const [inputText, setText] = useState('')
    const [list, setList] = useState([])
    const [todo, setTodo] = useState([])
    let bc = new BroadcastChannel('listChannel')
    let bc2 = new BroadcastChannel('deleteCommand')
    let receiver = 'Receiver: '
    let sender = 'Sender: '


const handleForm = (e) => {
    // prevent reloading of page
    console.log('handle form is called')
    e.preventDefault()

    if(inputText?.length){
        let allData = [...list, inputText]
        setList((prev) => [...prev, `${sender}${inputText}`])
        bc.postMessage(allData)
    }
    setText('')
}

const handleDelete = (deleteArrayitematIndex) => {

    let filteredList = list.filter((item, index) => index !== deleteArrayitematIndex)
    //will update current tab
    setList(() => {
        return list.filter((item, index) => index !== deleteArrayitematIndex)
    })
    //will update the other tab
    bc2.postMessage(deleteArrayitematIndex)

}
useEffect(() => {
    // only runs on initial render, where we retrieve items from localstorage

    let retrievedList = localStorage.getItem('list')
    if(JSON.parse(retrievedList)?.length > 0){
        let parsedList = JSON.parse(retrievedList)
        console.log('parsedList', parsedList)
        setList(parsedList)

    }else{
        console.log(' no items found, start fresh')
    }
    

}, [])

useEffect(() => {

    // runs everytime list gets updated and in effect localstorage is updated
        bc.onmessage = (e) => {
            console.log('message trigerred', e)
            localStorage.setItem('list', JSON.stringify(e.data))
            let newTodo = `${receiver}${e.data[e.data.length-1]}`

            setList((prev) => [...prev, newTodo])
        }

        return () => bc.close()       

}, [bc])

useEffect(() => {

    bc2.onmessage = (e) => {
        console.log('delete trigerred', e)
        localStorage.setItem('list', JSON.stringify(e.data))
        setList(() => {
            return list.filter((item, index) => index !== e.data)
        })
    }

    return () => bc2.close()       


}, [bc2])

    return (
      <div className='innerContainer'>
          <form onSubmit={handleForm}>
         <input type='text' required={true} placeholder='Insert message' onChange={(e) => setText(e.target.value)} value={inputText} />
         <button disabled={inputText.length ? false : true}>submit</button>
         </form>

        <h3>Todo list</h3>
        {list && list.length > 0 && (<div>
            <ul>
                {list.map((todoText, index) => <li key={index}>{todoText}{'  '}<span onClick={() => handleDelete(index)} className='list-item'>X</span></li>)}
            </ul>
        </div>)}

         <style jsx={'true'}>{
             `
             .innerContainer{
                border: 1px solid black;
                padding: 1rem;
             }
             form {
                 margin: 1rem auto;
                 
             }
             form button {
                 background-color: var(--primary-color-hover);
                 padding: 0.5rem;
                 border: 5px solid transparent;
                 margin: 0 1rem;
             }
             .list-item {
                 border: 1px solid black;
             }
             .list-item:hover {
                cursor: pointer;
             }
             
             `
         }</style>
       
      </div>
    );
  };
  
  export default Todolist;
  