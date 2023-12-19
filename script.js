$(document).ready(function() {
    const size = 5;
    const board = [];
    let clickCounter = 0;

    // Initialize the board
    for (let i = 0; i < size; i++) {
        const row = [];
        const tr = $('<tr></tr>');
        for (let j = 0; j < size; j++) {
            const td = $('<td></td>').data('row', i).data('col', j);
            tr.append(td);
            row.push(td);
        }
        $('#gameBoard').append(tr);
        board.push(row);
    }

    // Handle click event
    $('#gameBoard td').click(function() {
        const row = $(this).data('row');
        const col = $(this).data('col');
        toggleCell(row, col); // clicked cell
        toggleCell(row - 1, col); // above
        toggleCell(row + 1, col); // below
        toggleCell(row, col - 1); // left
        toggleCell(row, col + 1); // right
        
				// Increment and update click count
        clickCounter++;
        $('#clickCount').text('Clicks: ' + clickCounter);
      
        // Check win condition
	      if (isGameWon()) {
  	      showModal();
    	  }
    });
    
    // Toggle cell color
    function toggleCell(row, col) {
        if (row >= 0 && row < size && col >= 0 && col < size) {
            const cell = board[row][col];
            const isRed = cell.css('background-color') === 'rgb(255, 0, 0)';
            cell.css('background-color', isRed ? 'white' : 'red');
        }
    }
    
        // Check if all cells are red
    function isGameWon() {
        for (let row of board) {
            for (let cell of row) {
                if (cell.css('background-color') !== 'rgb(255, 0, 0)') {
                    return false;
                }
            }
        }
        return true;
    }
    
  	// Add a click handler for the shape toggle
    $('#shapeToggle').change(function() {
        if (this.checked) {
            $('#toggleLabel').text('Circles');
            $('#gameBoard td').addClass('circle');
        } else {
            $('#toggleLabel').text('Squares');
            $('#gameBoard td').removeClass('circle');
        }
    });

    // Show modal window
    function showModal() {
        $('#winModal').show();
    }

    // Close modal and restart game
    $('.close, #playAgain').click(function() {
        $('#winModal').hide();
        resetGame();
    });

    // Reset the game
    function resetGame() {
        $('#gameBoard td').css('background-color', 'white');
        clickCounter = 0;
        $('#clickCount').text('Clicks: ' + clickCounter);
    }

});
