import React, { createContext , useState } from 'react'
const MainContext = createContext();
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Context(props) {
  const [categories, setCategories] = useState([]);

  const API_BASE_URL = "http://localhost:5000/"
  const CATEGORY_URL = "category"

  function fetchCategories(id = null) {
    let URL = API_BASE_URL + CATEGORY_URL
    if(id != null){
      URL = URL + `/${id}`
    }

    axios.get(URL).then(
      (res) => {
        if(res.data.flag === 1) {
          setCategories(res.data.category)
        }
        
      }).catch(
        (err) => {
          setCategories([])
        });
  }

  const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error", autoClose: 1000 });

  return (
    <MainContext.Provider value={{ API_BASE_URL, CATEGORY_URL, notify , categories, fetchCategories , setCategories }}>
      <ToastContainer />
      {
        props.children
      }
    </MainContext.Provider>
  )
}

export default Context;
export { MainContext };