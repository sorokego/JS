function generateDesk() {
    var container = document.getElementById('container');

    for (var i = 0; i<8; i++) {
        var rowElement = document.createElement("div");
        rowElement.style.display = 'flex';
        rowElement.setAttribute('id', 'row_' + i);
        container.appendChild(rowElement);
        for (var j = 0; j<8; j++) {
            var cellElement = document.createElement("div");
            if ((i % 2 + j % 2) % 2 == 0) {
                cellElement.style.backgroundColor = "#DDDDDD";
            } else {
                cellElement.style.backgroundColor = "#555555";
            }
            cellElement.setAttribute('id', 'cell_' + i + '_' + j);
            cellElement.style.height = '30px';
            cellElement.style.width = '30px';
            cellElement.style.textAlign = 'center';
            cellElement.style.lineHeight = '30px';
            
            rowElement.appendChild(cellElement);
        }
    }

    for (i = 0; i<8; i++) {
        document.getElementById('row_' + i).innerHTML = '<div style="width: 30px; height: 30px; text-align:center; line-height: 30px">' + (8-i) + '</div>' + document.getElementById('row_' + i).innerHTML;
    }

    
}

function generateFighures() {
    document.getElementById('cell_0_0').innerHTML = '<i class="fas fa-chess-rook"></i>';
    document.getElementById('cell_0_7').innerHTML = '<i class="fas fa-chess-rook"></i>';
    document.getElementById('cell_7_0').innerHTML = '<i class="fas fa-chess-rook"></i>';
    document.getElementById('cell_7_7').innerHTML = '<i class="fas fa-chess-rook"></i>';

    document.getElementById('cell_0_1').innerHTML = '<i class="fas fa-chess-knight"></i>';
    document.getElementById('cell_0_6').innerHTML = '<i class="fas fa-chess-knight"></i>';
    document.getElementById('cell_7_1').innerHTML = '<i class="fas fa-chess-knight"></i>';
    document.getElementById('cell_7_6').innerHTML = '<i class="fas fa-chess-knight"></i>';

    document.getElementById('cell_0_2').innerHTML = '<i class="fas fa-chess-bishop"></i>';
    document.getElementById('cell_0_5').innerHTML = '<i class="fas fa-chess-bishop"></i>';
    document.getElementById('cell_7_2').innerHTML = '<i class="fas fa-chess-bishop"></i>';
    document.getElementById('cell_7_5').innerHTML = '<i class="fas fa-chess-bishop"></i>';

    document.getElementById('cell_0_3').innerHTML = '<i class="fas fa-chess-queen"></i>';
    document.getElementById('cell_7_4').innerHTML = '<i class="fas fa-chess-queen"></i>';

    document.getElementById('cell_0_4').innerHTML = '<i class="fas fa-chess-king"></i>';
    document.getElementById('cell_7_3').innerHTML = '<i class="fas fa-chess-king"></i>';

    for (i = 0; i<8; i++) {
        document.getElementById('cell_1_' + i).innerHTML = '<i class="fas fa-chess-pawn"></i>';
        document.getElementById('cell_6_' + i).innerHTML = '<i class="fas fa-chess-pawn"></i>';
    }

    for (i = 0; i<8; i++) {
        document.getElementById('cell_0_' + i).querySelector('i').style.color = 'black';
        document.getElementById('cell_1_' + i).querySelector('i').style.color = 'black';
        document.getElementById('cell_6_' + i).querySelector('i').style.color = 'white';
        document.getElementById('cell_7_' + i).querySelector('i').style.color = 'white';
    }
}

generateDesk();
generateFighures();