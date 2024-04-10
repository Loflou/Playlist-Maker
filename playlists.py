import googleapiclient.errors

def get_playlists(youtube):
    request = youtube.playlists().list(
        part="snippet",
        mine=True,
        maxResults=25
    )
    response = request.execute()
    return response.get("items", [])

def create_playlist(youtube, title, description, tags):
    try:
        request = youtube.playlists().insert(
            part="snippet,status",
            body={
                "snippet": {
                    "title": title,
                    "description": description,
                    "tags": tags,
                    "defaultLanguage": "en"
                },
                "status": {
                    "privacyStatus": "private"
                }
            }
        )
        response = request.execute()
        print(f"New playlist created: {response['id']}")
        return response
    except googleapiclient.errors.HttpError as error:
        print(f"An HTTP error occurred: {error}")
        return None

def update_playlist(youtube, playlist_id, title, description, tags):
    try:
        request = youtube.playlists().update(
            part="snippet,status",
            body={
                "id": playlist_id,
                "snippet": {
                    "title": title,
                    "description": description,
                    "tags": tags,
                    "defaultLanguage": "en"
                },
                "status": {
                    "privacyStatus": "private"
                }
            }
        )
        response = request.execute()
        print(f"Playlist updated: {response['id']}")
        return response
    except googleapiclient.errors.HttpError as error:
        print(f"An HTTP error occurred: {error}")
        return None

def delete_playlist(youtube, playlist_id):
    try:
        request = youtube.playlists().delete(
            id=playlist_id
        )
        request.execute()
        print(f"Playlist deleted: {playlist_id}")
        return True
    except googleapiclient.errors.HttpError as error:
        print(f"An HTTP error occurred: {error}")
        return False