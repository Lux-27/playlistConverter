import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../src/spotify";
import SpotifyWebApi from "spotify-web-api-node";
import styles from "./styles.scss";

const spotifyApi = new SpotifyWebApi({
  clientId: "", //ENTER SPOTIFY CLIENT ID
  clientSecret: "", //ENTER SPOTIFY CLIENT SECRET
  redirectUri: "", //ENTER REDIRECT URL from spotify
});

const SongList = ({ token }) => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [songs, setSongs] = useState([]);
  const [id, setId] = useState("");
  const [playlistName, setPlaylistName] = useState(""); // Added playlistName state
  const [playlistDescription, setPlaylistDescription] = useState(""); // Added playlistDescription state

  useEffect(() => {
    apiClient.get("me").then((res) => {
      setId(res.data.id);
      console.log(id);
    });
  });

  const sendToSpotify = async () => {
    try {
      const accessToken = token;
      spotifyApi.setAccessToken(accessToken);

      {
        /* 
      const playlistName = "My New Spotify Playlist"; // Replace with your desired playlist name
      const playlistDescription = "Description of the playlist"; // Optional
      const userId = id; // Use the Spotify user ID you retrieved earlier

      const createPlaylistResponse = await spotifyApi.createPlaylist(userId, {
        name: playlistName,
        description: playlistDescription,
      });
       */
      }

      const existingPlaylists = await spotifyApi.getUserPlaylists(id);
      const playlistExists = existingPlaylists.body.items.some(
        (playlist) => playlist.name === playlistName
      );

      let finalPlaylistName = playlistName;
      if (playlistExists) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        finalPlaylistName = `${playlistName}(${timestamp})`;
      }

      const finalPlaylistDescription =
        playlistDescription || "Description of the playlist";

      const userId = id;
      const createPlaylistResponse = await spotifyApi.createPlaylist(userId, {
        name: finalPlaylistName,
        description: finalPlaylistDescription,
      });
      // Get the playlist ID of the newly created playlist
      const playlistId = createPlaylistResponse.body.id;

      // Add songs to the Spotify playlist
      for (const song of songs) {
        // Search for the song on Spotify
        const searchResponse = await spotifyApi.searchTracks(song.videoTitle);

        // Assuming you take the first search result (you may want to improve this logic)
        const track = searchResponse.body.tracks.items[0];

        // Check if a track was found
        if (track) {
          // Add the track to the playlist
          const trackUri = track.uri;
          await spotifyApi.addTracksToPlaylist(playlistId, [trackUri]);
          console.log(`Added "${track.name}" to the playlist.`);
        } else {
          console.log(`Song "${song.videoTitle}" not found on Spotify.`);
        }
      }
      console.log("All songs added to the playlist.");
    } catch (error) {
      console.error("Error sending songs to Spotify:", error);
    }
  };

  const handleFetchSongs = async () => {
    try {
      // Extract the playlist ID from the URL
      const playlistId = playlistUrl.split("list=")[1];

      let nextPageToken = "";
      let allSongs = [];

      // Make requests until there are no more pages of results
      while (true) {
        // Make a request to the YouTube Data API with maxResults set to 100 and the nextPageToken
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?key=ENTER_YOUR_YOUTUBEDEV_API_KEY&part=snippet&maxResults=100&playlistId=${playlistId}&pageToken=${nextPageToken}`
        );

        if (response.data.items) {
          const fetchedSongs = response.data.items
            .filter((item) => item.snippet.title !== "Deleted video")
            .map((item) => ({
              videoTitle: item.snippet.title,
              videoId: item.snippet.resourceId.videoId,
            }));

          allSongs = allSongs.concat(fetchedSongs);
        }

        // Check if there are more pages of results
        if (response.data.nextPageToken) {
          nextPageToken = response.data.nextPageToken;
        } else {
          break; // No more pages, exit the loop
        }
      }

      setSongs(allSongs);
      sendToSpotify();

      //CREATION OF JSON

      // Create a JSON file with the compiled song list
      // const jsonData = JSON.stringify(allSongs);
      // const blob = new Blob([jsonData], { type: "application/json" });
      // const url = URL.createObjectURL(blob);

      // Create a download link for the JSON file
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "playlist.json";
      // link.click();
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  };

  return (
    <div className="mainDiv">
      <h1>YouTube Music Playlist to Spotify</h1>
      <input
        type="text"
        placeholder="Enter YouTube Music Playlist URL"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Spotify Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)} // Capture the playlist name from the input field
      />
      <input
        type="text"
        placeholder="Enter Playlist Description (Optional)"
        value={playlistDescription}
        onChange={(e) => setPlaylistDescription(e.target.value)} // Capture the playlist description from the input field
      />
      <button onClick={handleFetchSongs}>Fetch Songs</button>
      <ul>
        {songs.map((song) => (
          <li key={song.videoId}>
            {song.videoTitle} (ID: {song.videoId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
