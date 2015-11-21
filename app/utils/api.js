export default {
    getBio(username){
        username = username.toLowerCase().trim();
        let url = `https://api.github.com/users/${username}`;
        return fetch(url).then(res => res.json());
    },
    getRepos(username){
        username = username.toLowerCase().trim();
        let url = `https://api.github.com/users/${username}/repos`;
        return fetch(url).then(res => res.json());
    },
    getNotes(username){
        username = username.toLowerCase().trim();
        let url = `https://buggy-native-note.firebaseio.com/${username}.json`;
        return fetch(url).then(res => res.json());
    },
    addNote(username, note){
        username = username.toLowerCase().trim();
        let url = `https://buggy-native-note.firebaseio.com/${username}.json`;
        return fetch(url, {
            method: 'post',
            body: JSON.stringify(note)
        }).then(res => res.json());
    },
    deleteNote(username, id){
        let url =  `https://buggy-native-note.firebaseio.com/${username}/${id}.json`;
        return fetch(url, {
            method: 'delete'
        }).then(res => res.json());
    }
}