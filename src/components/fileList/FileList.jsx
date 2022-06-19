import React, { useState, useEffect } from 'react'
import styles from './fileList.module.css'
import File from '../file/File'


function FileList({files, sort, search, update}) {
	const [actualFiles,setActualFiles] = useState([]);
	const [oldFiles, setOldFiles] = useState({});
	const [sortedFiles, setSortedFiles] = useState([]) 
	const [result, setResult] = useState([]);

	useEffect(() => {
		const actual = [];
		const old = {};
		const sortedFiles = files.sort((a,b) => new Date(b.date) - new Date(a.date));
		for (let file of sortedFiles) 
		{

			const fileName = file.title;
			if(actual.find(f => f.title === file.title)) {
				if(old.hasOwnProperty(fileName)) {
					old[fileName] = [...old[fileName], file]
				} else {
					old[fileName] = [file]
				}
			} else {
				actual.push(file)
			}
		}
		setActualFiles(actual);
		setOldFiles(old);
	}, [files])
	
	useEffect(() => {
		if (!actualFiles) {
			return; 
		}

		switch (sort) {
			case "alphabet":
				setSortedFiles(actualFiles.sort((a, b) =>  a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
				break;
			case "heavy":
				setSortedFiles(actualFiles.sort((a, b) => b.fileSize - a.fileSize));
				break;
				case "light":
				setSortedFiles(actualFiles.sort((a, b) => a.fileSize - b.fileSize));
				break;
			case "new":
				setSortedFiles(actualFiles.sort((a, b) => new Date(a.date) - new Date(b.date)));
				break;
			case "old":
				setSortedFiles(actualFiles.sort((a,b) => new Date(b.date) - new Date(a.date)));
				break;
			default:
				setSortedFiles(actualFiles.sort((a, b) =>a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1))
				break;
			}

			if (search === "") {
				setResult(sortedFiles);
				return;
			} 
		
			const searchResult = sortedFiles.filter(file => file.title.toLowerCase().includes(search))
			
			setResult()
	},[actualFiles, oldFiles, sort, search, sortedFiles])


	if (!result || result.length === 0) {
		return (
			<div className={styles.empty}>
				Файлов нет 
			</div>
		)
	}

	return (
		<div className={styles.files}>
			{result.map(file => (
				<File {...file} update={update} oldVersions={oldFiles[file.title]} key={file.id + Math.random + Date.now()}/>
			))}
		</div>
	)
}

export default FileList