import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./home.module.css";
import Header from "../../components/header/header/Header";
import File from "../../components/file/File";
import FileList from "../../components/fileList/FileList";
import AddFiles from "../../components/addFile/AddFiles";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Home() {
  const [files, setFiles] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  const [needFetchFiles, setNeedFetchFiles] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("alphabet");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileList = await axios.get(
          `https://localhost:44328/api/Documents/list/${user.username}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setFiles(fileList.data);
        setNeedFetchFiles(false);
        console.log("______________________________________________");
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiles();
  }, [needFetchFiles]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.filtres}>
              <div className={styles.search}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Поиск"
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                {/* <button className={styles.searchButton}>Поиск</button> */}
              </div>
              <select name="sortBy" className={styles.sort} onChange={(e) =>{ setSort(""); setSort(e.target.value)}}>
                <option value="alphabet" className="option">
                  По алфавиту
                </option>
                <option value="heavy" className="option">
                  Сначала тяжелые
                </option>
                <option value="light" className="option">
                  Сначала легкие
                </option>
                <option value="new" className="option">
                  Сначала новые
                </option>
                <option value="old" className="option">
                  Сначала старые
                </option>
              </select>
            </div>
            <AddFiles update={setNeedFetchFiles} />
            <div className={styles.files}>
              {/* <File {...file}/> */}
              <FileList files={files} update={setNeedFetchFiles} sort={sort} search={search} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
