import React from "react"
import Alien from "/home/prince/Documents/projects/1.my reusable components/src/icons/Arrow.svg";
import Arrow from "/home/prince/Documents/projects/1.my reusable components/src/icons/Alien.svg";
import "./style.css";
import { useState } from "react";
import DragAndDrop from "./DragAndDrop.js"
const Booklist = () => {
  const [images, setImages] = useState([...image]);

  const Form = () => {
    const [bookTitle, setTitle] = useState([]);
    const [bookAuthor, setAuthor] = useState([]);
    const [bookSrc, setSrc] = useState([]);
    const [bookId, setId] = useState([]);
    const reducer =(state,action)=>{
      switch(action.type){
        case "SET_DROP_DEPTH":
          return {...state,dropDepth:action.dropDepth}
        case "SET_IN_DROP_ZONE":
          return {...state, inDropZone:action.inDropZone}
        case "ADD_FILE_TO_LIST":
          return {...state,fileList:state.fileList.concat(action.files)}
          default:
            return state;
        }
    }
    const [data, dispatch]=React.useReducer(reducer,{dropDepth:0,inDropZone:false,fileList:[]})
    return (
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            let newObj = { title: bookTitle, author:bookAuthor,id:bookId,src:bookSrc};
            setImages([...images, newObj]);
          }}
        >
          <label htmlFor="text">Input Title</label>
          <input name ="text"type="text" required onChange={(e) => {setTitle(e.target.value)}} /><br/>
          <label htmlFor="auth">Input Author name</label>
          <input name ="auth"type="text" required onChange={(e) => {setAuthor(e.target.value)}} /><br/>
          <label htmlFor="Id">Id</label>
          <input name ="Id"type="text" required onChange={(e) => {setId(e.target.value)}} /><br/>
          <label htmlFor="img">Image source</label>
          <input name ="img"type="text" required onChange={(e) => {setSrc(e.target.value)}} /><br/>
          <div className="App">
            <h1>
              React Drag and drop
            </h1>
              <DragAndDrop data={data} dispatch={dispatch} />
              <ol className="dropped-files">
                {data.fileList.map((f,index)=>{
                  if(index >0)return;
                  return (
                    <li key={f.name}>{f.name}</li>
                  )
                })}
              </ol>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  const Book = ({ src, title, author, children, id }) => {
    const removeItem = (id) => {
      let newArra = images.filter((person) => person.id !== id);
      setImages(newArra);
    };
    return (
      <div className="booklist">
        <img src={src} alt="hmm" />
        <h1>{title}</h1>
        <h4>{author}</h4>
        <button type="button" onClick={() => removeItem(id)}>
          Remove
        </button>
        {children}
      </div>
    );
  };

  return (
    <article class="bookList">
      <Form></Form>
      {images.map((props,index) => {
        return <Book key={ `${props}${index}`} {...props}></Book>;
      })}
    </article>
  );
};
const image = [
  {
    id: 1,
    src: Alien,
    title: "Alien that went to the moon",
    author: "Micheal Akean",
  },
  { id: 2, src: Arrow, title: "Arrow to the head", author: "Robin hood" },
];

export default Booklist;
