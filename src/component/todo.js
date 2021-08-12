import React, {useState, useEffect} from 'react'
import "../App.css"


// to get the data from Local Storage

const getLocalItems = () => 
{
    let list = localStorage.getItem('lists');

    if(list)
    {
        return JSON.parse(localStorage.getItem('lists'));

    }
    else{
        return [];
    }
}
const Todo = () =>  {
    const [inputData, setInputData] = useState('');
    
    const [items, setItems] = useState([getLocalItems()]);

    const[toggleSubmit, setToggleSubmit] = useState(true);

    const [isEditItem, setIsEditItem] = useState(null);

    const add_Item = () =>
    {
        if(!inputData)
        {
             alert('plzz fill data');
        }
        else if(inputData && !toggleSubmit)
        {
            setItems (
                items.map((elem) => 
                {
                    if(elem.id === isEditItem)
                    {
                        return { ...elem, name:inputData}
                    }
                    return elem;

                })
            )

            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);

          
        }
        else{
            const allInputData = { id: new Date().getTime().toString(), name: inputData  }
            setItems([...items,allInputData]);
            setInputData('');
        }
    }

    // delete items


    const deleteItem = (index) => {
        const updated_items = items.filter((elem) =>
        {
            return index !== elem.id;
        });
        setItems(updated_items);

    }

    const editItem = (id) =>
    {
        let newEditItem = items.find((elem) => {
    
            return elem.id === id
        
        });

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);

            
         



            

    }

   // remove all

   const remove_All = () => 
   {
       setItems([]);
   }

   // add Data to Local Storage

   useEffect (() => 
   {
    localStorage.setItem('lists', JSON.stringify(items))
   }, [items]);

    return  (
      
        <div className ="outer-div">
            <div className ="inner-div">
               
                <figure>
                    <figcaption> Add your List here </figcaption>
                </figure>
                    

                    <div className ="items_to_add">
                        <input type ="text" placeholder ="Item" 
                            value ={inputData}
                            onChange = { (e) => setInputData (e.target.value)}
                            />
                            {
                                toggleSubmit ?  <i className="fa fa-plus add-btn" title ="Add Item"  onClick ={add_Item}></i> :
                                <i className="far fa-edit add-btn" title ="Update Item"  onClick ={add_Item}></i>
                            }
                           

                    </div>

                    <div className ="items_to_show">
                        {
                            items.map((elem) => {
                              return(
                                <div className = "each_Item" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className ="todo-btn">
                                    <i className = "far fa-edit add-btn" title="Edit_item"  onClick ={ ()=> editItem (elem.id)}></i>
                                  <i className = "far fa-trash-alt add-btn" title="Delete_item" onClick ={ ()=> deleteItem (elem.id)}></i>                                   
                                    </div>
                               
                                </div>
                              )
                            })   
                        }
                       

                    </div>

                     {/* clear all button */}
                    <div className = "items_to_show">
                        <button className ="button_1 effect01" data-sm-link-text="remove all" onClick = {remove_All} ><span> list </span> </button>
                    
                    </div>

        
        
            </div>


        </div>
        

    
        )

}

export default Todo