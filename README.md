# YouTube Music Playlist to Spotify

Convert YouTube Music playlists to Spotify playlists effortlessly!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Setting up Spotify and YouTube Data API](#setting-up-spotify-and-youtube-data-api)
- [Usage](#usage)
  - [Fetching Songs](#fetching-songs)
  - [Spotify Integration](#spotify-integration)
- [Contributing](#contributing)
  
## Introduction

This project is a web application that allows users to convert YouTube Music playlists into Spotify playlists. It leverages the YouTube Data API to fetch songs from a YouTube Music playlist and then adds them to a new Spotify playlist using the Spotify Web API.

## Features

- Fetch songs from a YouTube Music playlist using the YouTube Data API.
- Create a new Spotify playlist with a custom name and description.
- Automatically add songs to the Spotify playlist based on their titles.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- Spotify Developer Account: You'll need to register a Spotify Developer account to obtain your Spotify API credentials (Client ID, Client Secret, and Redirect URI).
- Youtube Developer Account: You'll need to register a Youtube Developer account to obtain your YoutubeData credentials (Youtube data API key).

## Getting Started

Follow these steps to set up the project:

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Lux-27/playlistConverter.git
   ```

2. Navigate to the project directory

    ```bash
   cd playlistConverter
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Setting up Spotify and YouTube Data API

To use this application, you need to obtain API keys and credentials for both Spotify and YouTube Data API and specify them directly in the code.

#### Setting up Spotify

1. Create a Spotify Developer Application:
- Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- Click on "Create an App" and fill in the necessary details.

2. Obtain your Spotify API credentials:
- Note down your "Client ID", "Client Secret", and "Redirect URI".

3. Configure the application:
- Open the `spotify.jsx` file.
- Replace the placeholders in the `spotify.jsx` AND `SongList.jsx` file with your Spotify API credentials directly in the code:

```javascript
const clientId = 'your-client-id';
const redirectUri = 'your-redirect-uri';
```

#### Setting up YouTube Data API

1. Go to the Google Developers Console.
- Create a new project or select an existing project.
- Enable the YouTube Data API for your project.

2. Create credentials:
- Go to the "Credentials" page.
- Click "Create Credentials" and select "API Key."
- Note down your API Key.

3. Configure the application:
- Open the `SongList.jsx` file.
- Replace the placeholders in the `SongList.jsx` file with your YouTube Data API key directly in the code:
  
```javascript
const YOUTUBE_API_KEY = "";
```

## Usage
The Spotify API is refreshed every 10 minutes to prevent errors, sometimes the token can get automatically refreshed and u might get an error. If that happens, refresh console page and log into spotify again to solve.

### Fetching Songs

1. Start the application:

```bash
npm run dev
```
2. Open your web browser and navigate to `http://localhost:3000`.

3. Enter the YouTube Music playlist URL and the desired Spotify playlist name and description.

4. Click the "Fetch Songs" button.

5. The application will fetch songs from the YouTube Music playlist and create a JSON file with the song data.


### Spotify Integration

1. Log in to your Spotify account when prompted.

2. The application will create a new Spotify playlist with the provided name and description.

3. It will then search for each song in the Spotify library and add them to the playlist.

4. Once the process is complete, all songs will be added to the Spotify playlist.

### Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name or git checkout -b bugfix/your-bug-fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork: git push origin feature/your-feature-name or git push origin bugfix/your-bug-fix.
5. Open a pull request to the main branch of the original repository.
