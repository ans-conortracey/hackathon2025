class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('current-player');
        this.gameStatusElement = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-btn');
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateDisplay();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
        this.checkGameResult();
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        // Add a small animation
        this.cells[index].style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.cells[index].style.transform = 'scale(1)';
        }, 150);
    }
    
    checkGameResult() {
        let roundWon = false;
        let winningLine = null;
        
        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                roundWon = true;
                winningLine = [a, b, c];
                break;
            }
        }
        
        if (roundWon) {
            this.gameActive = false;
            this.gameStatusElement.textContent = `Player ${this.currentPlayer} wins! 🎉`;
            this.gameStatusElement.classList.add('winner');
            
            // Highlight winning line
            winningLine.forEach(index => {
                this.cells[index].classList.add('winning-line');
            });
            
            return;
        }
        
        if (!this.board.includes('')) {
            this.gameActive = false;
            this.gameStatusElement.textContent = "It's a tie! 🤝";
            return;
        }
        
        this.switchPlayer();
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
        if (this.gameActive) {
            this.gameStatusElement.textContent = 'Game in progress';
            this.gameStatusElement.classList.remove('winner');
        }
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-line');
            cell.style.transform = 'scale(1)';
        });
        
        this.gameStatusElement.classList.remove('winner');
        this.updateDisplay();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
