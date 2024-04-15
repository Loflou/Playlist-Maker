from playlist_manager import create_playlist, add_videos_to_playlist

def authenticate_youtube():
    # implementation of the authenticate_youtube function
    # ...
    return youtube

if __name__ == "__main__":
    youtube = authenticate_youtube()
    if youtube:
        playlist_title = input("Enter playlist title: ").strip()
        playlist_description = input("Enter playlist description: ").strip()
        playlist_tags = input("Enter comma-separated playlist tags: ").split(",")

        if playlist_title and playlist_description:
            new_playlist = create_playlist(youtube, playlist_title, playlist_description, playlist_tags)

            if new_playlist:
                video_titles = []
                while True:
                    title = input("Enter a video title (or press Enter to finish): ").strip()
                    if not title:
                        break
                    video_titles.append(title)

                if video_titles:
                    add_videos_to_playlist(youtube, new_playlist["id"], video_titles)
                else:
                    print("No videos added to the playlist.")
            else:
                print("Failed to create the playlist.")
        else:
            print("Playlist title and description are required.")
    else:
        print("Failed to authenticate with YouTube API.")