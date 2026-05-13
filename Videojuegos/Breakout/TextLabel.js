/*
 * Class to draw text at specific positions within the game canvas 
 *
 *  Aixa Elenka Mendoza Filisola
 * 2026-05-13 
 */

"use strict";


class TextLabel {
    constructor(x, y, font, color) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }

    draw(ctx, text) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text, this.x, this.y);
    }
}


