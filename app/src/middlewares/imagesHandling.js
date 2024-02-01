const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

// To see
const urlToBase64 = (url) => new Promise((resolve, reject) => {
    fetch(url, {
        method: 'GET'
    })
    .then(res => res.blob())
    .then((blob) => fileToBase64(blob))
    .then((base64String) => {
        resolve(base64String);
    })
    .catch((err) => {
        reject(err);
    })
});

export {
    fileToBase64,
    urlToBase64
}