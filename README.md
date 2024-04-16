# YouTube Playlist Manager

This project is a web application for managing YouTube playlists. It allows users to create, update, and delete playlists, as well as add and remove videos from playlists.

## Prerequisites

- Node.js and npm installed on your machine
- Python 3.x installed on your machine
- PostgreSQL database

## Getting Started

1. Clone the repository: git clone https://github.com/your-username/playlist-manager.git

2. Set up the backend:
- Navigate to the backend directory: `cd playlist-manager/backend`
- Create a virtual environment: `python -m venv venv`
- Activate the virtual environment: `source venv/bin/activate` (for Unix/Linux) or `venv\Scripts\activate` (for Windows)
- Install the dependencies: `pip install -r requirements.txt`
- Set up the database:
  - Create a new PostgreSQL database
  - Update the `DATABASE_URL` in the `.env` file with your database connection string
- Run the database migrations: `python models.py`
- Start the backend server: `uvicorn main:app --reload`

3. Set up the frontend:
- Navigate to the frontend directory: `cd playlist-manager/playlist-manager-ui`
- Install the dependencies: `npm install`
- Start the frontend development server: `npm start`

4. Open your web browser and visit `http://localhost:3000` to access the application.

## Configuration

- Backend configuration:
- Create a `.env` file in the backend directory and provide the necessary configuration values (e.g., `DATABASE_URL`, `SECRET_KEY`, etc.)

- Frontend configuration:
- Create a `.env` file in the frontend directory and provide the necessary configuration values (e.g., `REACT_APP_API_BASE_URL`)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
