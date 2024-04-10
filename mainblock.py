if __name__ == "__main__":
    youtube = authenticate_youtube()

    if youtube:
        playlist_title = input("Enter playlist title: ")
        playlist_description = input("Enter playlist description: ")
        playlist_tags = input("Enter comma-separated playlist tags: ").split(",")

        new_playlist = create_playlist(youtube, playlist_title, playlist_description, playlist_tags)

        if new_playlist:
            video_titles = []
            while True:
                title = input("Enter a video title (or press Enter to finish): ")
                if title == "":
                    break
                video_titles.append(title)

            add_videos_to_playlist(youtube, new_playlist["id"], video_titles)