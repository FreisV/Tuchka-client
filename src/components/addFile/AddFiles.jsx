import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./addFiles.module.css";
import {Close} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function AddFiles({ update }) {
  const { user, dispatch } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  
  const deleteHandler = async (e, file) => {
    e.preventDefault();
    document.getElementById("file").value = "";
    setFiles(files.filter(f => f !== file))
  }  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      return;
    }

    const data = new FormData();
    for (const file of files) {
      data.append("files", file);
    }
    try {
      const res = await axios.post("https://localhost:44328/api/Documents/upload", data,
        { headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        }}
      )
        
      for (const fileId of res.data.filesId) {
        await axios.put(`https://localhost:44328/api/Documents/upload/${fileId}`, {username:user.username}, {
           headers: {
            Authorization: `Bearer ${user.token}`,
          }
        });
      }

      update(true);
      setFiles([])
      document.getElementById("file").value = "";
    } catch (err) {
      console.log(err);
    }

    // try {
    //   await axios.post("/api/posts/", newPost);
    // } catch (err) {
    //   console.log("Ошибка при создании поста");
    // }
  };

  

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={submitHandler}>
        <label htmlFor="file" className={styles.add}>
          <div className={styles.button}>Добавить файл</div>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFiles([...files, e.target.files[0]])}
          />
        </label>
        <button className={styles.button} disabled={files.length === 0}>Отправить файлы</button>
      </form>
      {files !== 0 && (
        <div className={styles.files}>
          {files.map(file => (
            <div className={styles.row} key={Date.now() + Math.random() + file.name}>
              <div className={styles.file}>{file.name}</div>
              <button className={styles.delete} 
                onClick={(e) => deleteHandler(e, file)}
              >
                <Close style={{ fontSize: "1.2em" }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddFiles;
