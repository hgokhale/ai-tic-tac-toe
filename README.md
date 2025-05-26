# AI Tic-Tac-Toe

A simple web-based Tic-Tac-Toe game where you can play against an AI opponent powered by Python.  
Built with Flask for the backend and plain HTML/CSS/JavaScript for the frontend.

## Features

- Single-player mode (play against AI)  
- Two-player mode (local two human players)  
- Theme customization (select different color themes)  
- Adjustable grid size (choose grid dimensions)  

## Prerequisites

- Python 3.8 or higher  
- pip (Python package manager)

## Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/hgokhale/ai-tic-tac-toe.git
   cd ai-tic-tac-toe
   ```

2. Create a virtual environment (recommended)  
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies  
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the Flask app  
   ```bash
   python app.py
   ```
2. Open your browser and navigate to  
   ```
   http://localhost:5000
   ```

The page will display a 3×3 Tic-Tac-Toe grid. Click an empty cell to make your move (X). The AI will respond automatically (O).

## How to Play

- You play as **X**, AI plays as **O**.  
- Click any empty square to place your mark.  
- The game checks for win/draw conditions after each move:
  - Three in a row (horizontal, vertical, diagonal) wins.  
  - If all nine squares fill without a winner, it’s a draw.  
- Refresh the page or click “New Game” (if implemented) to restart.

## Project Structure

```
.
├── app.py             # Flask server & game logic
├── requirements.txt   # Python dependencies
├── static/
│   ├── style.css      # Game board styling
│   └── script.js      # Frontend interaction & AI calls
├── templates/
│   └── index.html     # Main HTML page
└── README.md          # This file
```

## License

MIT License © 2025 Hrishikesh Gokhale
