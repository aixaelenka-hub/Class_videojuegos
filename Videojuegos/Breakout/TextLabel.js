/*
 * Class to draw text at specific positions within the game canvas  (Description)
 *
 * Aixa Elenka Mendoza Filisola
 * 2026-02-10 (Fecha)
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

/* to centeer or change the aligment of the text:
ctx.textAlign = "center";
ctx.textAlign = "center";*/
