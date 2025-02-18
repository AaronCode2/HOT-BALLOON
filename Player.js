
class Player {

    constructor({position, velcoity, imageSrc, resize}) {

        this.position = position;
        this.velcoity = velcoity ?? {
            x : 0,
            y : 0
        };
        this.image = new Image();
        this.image.src = imageSrc;
        this.resize = resize ?? 1;
        this.image.onload = () => {
            this.width = this.image.width * this.resize;
            this.height = this.image.height * this.resize;
        }

    }

    draw() {
        if(!this.image) return;

        c.drawImage(this.image, this.position.x, this.position.y, this.width + 55, this.height + 55);
    }

    update() {
        this.draw()

        this.position.x += this.velcoity.x;
        this.position.y += this.velcoity.y;

        this.velcoity.y += 0.01

        if(this.position.x <= 0) {
            this.position.x = 0;
        } else if(this.position.x >= canvas.width) {
            this.position.x = canvas.width;
        } 

        if(this.position.y >= canvas.height + 10) {

            gameOver.style.display = 'block';
            retryBtn.style.display = 'block';
            cancelAnimationFrame(runner)
        }

    }

}