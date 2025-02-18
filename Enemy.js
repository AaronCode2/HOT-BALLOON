
class Enemy {

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
            this.width = this.image.width / this.resize;
            this.height = this.image.height / this.resize;
        }

    }

    draw() {
        if(!this.image) return;

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()

        this.position.x += this.velcoity.x;
        this.position.y += this.velcoity.y;

        this.velcoity.y = 2

    }

}