import { getStorage, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
export function handleUpload(file: File, setPercent: React.Dispatch<React.SetStateAction<number>>) {
    if (file == null) {  
            
    }
    const storage = getStorage(app);
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (error) => {
                reject(error.message);
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve(url);
                });
            }
        );
    });
}