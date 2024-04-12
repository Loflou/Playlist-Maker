import googleapiclient.errors

def search_video(youtube, query):
    try:
        request = youtube.search().list(
            part="id",
            maxResults=1,
            q=query,
            type="video"
        )
        response = request.execute()
        if response["items"]:
            return response["items"][0]["id"]["videoId"]
        else:
            return None
    except googleapiclient.errors.HttpError as error:
        print(f"An HTTP error occurred: {error}")
        return None

def add_video_to_playlist(youtube, playlist_id, video_id):
    try:
        request = youtube.playlistItems().insert(
            part="snippet",
            body={
                "snippet": {
                    "playlistId": playlist_id,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": video_id
                    }
                }
            }
        )
        response = request.execute()
        print(f"Video added to playlist: {response['snippet']['title']}")
        return True
    except googleapiclient.errors.HttpError as error:
        print(f"An HTTP error occurred: {error}")
        return False

def remove_video_from_playlist(youtube, playlist_id, video_id):
    try:
        request = youtube.playlistItems().delete(
            id=video_id
        )
        request.execute()
        print(f"Video removed from playlist: {video_id}")
        return True
    except googleapiclient.errors.HttpError as error:
        print(f"An HTTP error occurred: {error}")
        return False

def get_playlist_videos(youtube, playlist_id):
    try:
        request = youtube.playlistItems().list(
            part="snippet",
            playlistId=playlist_id,
            maxResults=50
        )
        response = request.execute()
        return response.get("items", [])
    except googleapiclient.errors.HttpError as error:
        print(f"An HTTP error occurred: {error}")
        return None