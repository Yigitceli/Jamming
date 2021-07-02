import SearchBar from "../SearchBar/SearchBar.js";
import './App.css';
import SearchResult from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import { render } from "@testing-library/react";
import React from "react";
import spotify from "../../util/Spotify.js";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "<3",
      playlistTrack: [{name:"playlistName1", artist:"playlistArtis1", album: "playlistAlbum1", id:4}, {name:"playlistName2", artist:"playlistArtis2", album: "playlistAlbum2", id:5}, {name:"playlistName3", artist:"playlistArtis3", album: "playlistAlbum3", id:6}],
      searchResults:[{name:"name1", artist:"artist1", album:"album1", id:1}, {name:"name2", artist:"artist2", album:"album2", id:2}, {name:"name3", artist:"artist3", album:"album3", id:3}]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  search(term) {
    spotify.search(term).then(response => {
      this.setState({searchResults: response})
    })
  }
  savePlaylist() {
    const trackUris = this.state.playlistTrack.map(track => track.uri);
  }
  addTrack(track) {
    
    let tracks = this.state.playlistTrack;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTrack: track});
    
  }
  removeTrack(track){
    let tracks = this.state.playlistTrack;
    tracks = tracks.filter(crTrack => crTrack.id !== track.id);
    this.setState({playlistTrack:tracks});
  
  }
  updatePlaylistName(name){
    this.setState({playlistName:name});

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResult searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTrack={this.state.playlistTrack} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );  
  }
}
export default App;
