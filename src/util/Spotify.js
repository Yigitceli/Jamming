let accessToken;
const clientId = "e5ee53b2b7d64f2594b0acba4474e09e";
const redirectUri = "http://localhost:3000/";
const spotify = {
    
    getAccessToken () {
        if(accessToken){
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessToken && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = spotify.getAccessToken();
        fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers:{Authorization: `Bearer ${accessToken}`}}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => {
                return {id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri};
            });
        })
    }
}
export default spotify;