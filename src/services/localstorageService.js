export function getLocalStorageKeyValue(key){
    try {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error getting item from Localstorage ${error}`);
    }
}

export function setLocalStorageKeyValue(key,value){
    try {
        const data =localStorage.setItem(key,value);
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error setting item to LocalStorage ${error}`);
    }
}

export function deleteLocalStorageKeyValue(key){
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error deleting item from LocalStorage ${error}`);
    }
}

export function clearLocalStorageKeyValue(){
    try {
        localStorage.clear();
    } catch (error) {
        console.error(`Error Clearing LocalStorage ${error}`);
    }
}