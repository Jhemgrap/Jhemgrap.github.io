module.exports = class Blast {
	constructor(ownr, i, weaponID) {
		this.type = "Blast",
		this.id = i, // unique identifier
		this.dmg = wepns[weaponID].damage,
		this.sx = ownr.sx,
		this.sy = ownr.sy,
		this.owner = ownr,
		this.angle = ownr.angle,
		this.bx = ownr.x,
		this.by = ownr.y,
		this.wepnID = weaponID,
		this.time = 0; // since spawn
	}
	tick() {
		this.time++;
		if (this.time > 11) delete blasts[this.sy][this.sx][this.id];
		if (this.time == 1) {

			for (var i in players[this.sy][this.sx]) {
				var player = players[this.sy][this.sx][i];
				if ((this.bx - player.x) * Math.cos(this.angle) + (this.by - player.y) * Math.sin(this.angle) > 0) continue;
				var pDist = Math.hypot(player.x - this.bx, player.y - this.by);
				var fx = player.x - Math.cos(this.angle) * pDist; // all this ugly math is just to check collision of a player with a ray
				var fy = player.y - Math.sin(this.angle) * pDist;
				if (Math.hypot(fx - this.bx, fy - this.by) < ships[player.ship].width * 2 / 3) this.hit(player);
			}

			/*for(var i in asts[this.sy][this.sx]){
				var ast = asts[this.sy][this.sx][i];
				if((this.bx-ast.x) * Math.cos(this.angle) + (this.by-ast.y) * Math.sin(this.angle) > 0) continue;
				var pDist = Math.hypot(ast.x - this.bx, ast.y - this.by);
				var fx = ast.x - Math.cos(this.angle) * pDist;
				var fy = ast.y - Math.sin(this.angle) * pDist;
				if(Math.hypot(fx-this.bx,fy-this.by) < 64*2/3) this.hit(ast);
			} // not using this atm */

			var base = bases[this.sy][this.sx];
			if (base.color == this.owner.color || !base.turretLive) return;
			if ((this.bx - base.x) * Math.cos(this.angle) + (this.by - base.y) * Math.sin(this.angle) > 0) return;
			var pDist = Math.hypot(base.x - this.bx, base.y - this.by);
			var fx = base.x - Math.cos(this.angle) * pDist;
			var fy = base.y - Math.sin(this.angle) * pDist;
			if (Math.hypot(fx - this.bx, fy - this.by) < 128 * 2 / 3) this.hit(base);
		}
	}
	hit(b) {
		if (this.wepnID == 25 && this.owner.color !== b.color) b.EMP(42); // emp blast
		else if (this.wepnID == 34 && this.owner.color !== b.color) b.dmg(this.dmg, this); // muon
		else if (this.wepnID == 41) b.brainwashedBy = this.owner.id; // brainwashing laser
	}
};
