from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def check_winner(board):
    # board: list of N lists, each with 'X', 'O', or None
    size = len(board)
    lines = []
    # rows
    lines.extend(board)
    # columns
    for i in range(size):
        lines.append([board[r][i] for r in range(size)])
    # diagonals
    lines.append([board[i][i] for i in range(size)])
    lines.append([board[i][size - 1 - i] for i in range(size)])
    for line in lines:
        if line[0] and all(cell == line[0] for cell in line):
            return line[0]
    # draw
    if all(cell for row in board for cell in row):
        return 'Draw'
    return None

def minimax(board, player):
    winner = check_winner(board)
    if winner == 'X':
        return {'score': -1}
    if winner == 'O':
        return {'score': 1}
    if winner == 'Draw':
        return {'score': 0}

    size = len(board)
    moves = []
    for i in range(size):
        for j in range(size):
            if not board[i][j]:
                board[i][j] = player
                result = minimax(board, 'O' if player == 'X' else 'X')
                moves.append({'row': i, 'col': j, 'score': result['score']})
                board[i][j] = None

    if player == 'O':
        best = max(moves, key=lambda m: m['score'])
    else:
        best = min(moves, key=lambda m: m['score'])
    return best

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/ai_move', methods=['POST'])
def ai_move():
    data = request.get_json()
    board = data.get('board')
    best = minimax(board, 'O')
    return jsonify({'row': best['row'], 'col': best['col']})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
