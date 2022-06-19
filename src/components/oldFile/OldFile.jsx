import React, { useContext } from "react";
import styles from "./oldFile.module.css";
import { CloudDownload, ArrowDropDown, Delete } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


function OldFile({ id, contentType, fileSize, title, date, update }) {
  const {user} = useContext(AuthContext);

  const download = async () => {
    try {
      axios({
        url: `https://localhost:44328/api/Documents/download/${id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: "blob", 
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
      });
    } catch (err) {
      alert("Произошла непредвиденная ошибка");
      console.log(err);
    }
  };

  const deleteFile = async () => {
    try {
      await axios.delete(`https://localhost:44328/api/Documents/${id}/one`, {
        headers: {Authorization: `Bearer ${user.token}`},
      });
    } catch (err) {
      console.log(err);
    }
    console.log("хуй");

    update(true);
  };

  const getDate = () => {
    const fullDate = new Date(date);
    const number = fullDate.getDate();
    const month =
      fullDate.getMonth() < 10
        ? "0" + fullDate.getMonth()
        : fullDate.getMonth();
    const year = fullDate.getFullYear().toString().slice(-2);
    return `${number}.${month}.${year} ${fullDate.getHours()}:${fullDate.getMinutes()}`;
  };

  const sizeConverter = (size) => {
    if (size < 1048576) return `${(size / 1024).toFixed(1)}КБ`;
    else if (size < 1073741824) return `${(size / 1048576).toFixed(1)}МБ`;
    else return `${(size / 1073741824).toFixed(1)}ГБ`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={[styles.infoBlock, styles.infoBlockFirst].join(" ")}>
            <span className={[styles.infoItem, styles.name].join(" ")}>
              {title}
            </span>
            <span className={[styles.infoItem, styles.type].join(" ")}>
              {contentType}
            </span>
          </div>
          <div className={[styles.infoBlock, styles.infoBlockSecond].join(" ")}>
            <span className={[styles.infoItem, styles.size].join(" ")}>
              {sizeConverter(fileSize)}
            </span>
            <span className={[styles.infoItem, styles.date].join(" ")}>
              {getDate()}
            </span>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.action} onClick={download}>
            <CloudDownload className={styles.actionIcon} />
          </div>
          <div className={styles.action} onClick={deleteFile}>
            <Delete className={styles.actionIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldFile;
