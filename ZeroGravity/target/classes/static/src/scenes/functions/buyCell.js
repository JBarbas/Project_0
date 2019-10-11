function buyCell(i, j) {
	
	if (game.global.grid[i][j].type < 0) {
		
		if (lastCell !== null) {
			if (lastCell.type < 0) {
				lastCell.image.setTexture('tile_-1');
			}
		}
		
		game.scene.getScene('GameScene').gridContainer.setAlpha(0);
		game.global.expandiendo = false;
		
		let msg = new Object();
		msg.event = 'BUY CELL';
		msg.i = i;
		msg.j = j;
		game.global.socket.send(JSON.stringify(msg));
		
	}
}