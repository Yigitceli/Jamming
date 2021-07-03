import SearchBar from "../SearchBar/SearchBar.js";
import './App.css';
import SearchResult from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import { render } from "@testing-library/react";
import React from "react";
import Spotify from "../../util/Spotify.js";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "My Playlist",
      playlistTracks: [],
      searchResults:[]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  search(term) {
    
    Spotify.search(term).then(response => {
      let finalArray = response.filter(item => {
        return !this.state.playlistTracks.some(item2 => {
          return item.id === item2.id;
        })
      });
      
      this.setState({searchResults: finalArray});
    })
  }
  savePlaylist() {
    
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({playlistName:"My Playlist", playlistTracks: []});

  }
  addTrack(track) {
    
    let tracks = this.state.playlistTracks;
    let searchedTracks = this.state.searchResults;
    let indexOfElement = searchedTracks.indexOf(track);
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    searchedTracks.splice(indexOfElement, 1);
    this.setState({playlistTracks: tracks, searchResults: searchedTracks});
    
    
    
  }
  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let searchedTracks = this.state.searchResults;
    
    tracks = tracks.filter(crTrack => crTrack.id !== track.id);
    searchedTracks.unshift(track)
    this.setState({playlistTracks:tracks, searchResults: searchedTracks});
  
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
            <Playlist playlistName={this.state.playlistName} playlistTrack={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );  
  }
}
export default App;
