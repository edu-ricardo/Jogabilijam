export class Hacker extends Phaser.GameObjects.Sprite{
    private velocity: Phaser.Math.Vector2;
    private cursor: CursorKeys;

    constructor(scene: Phaser.Scene){
        super(scene, scene.sys.canvas.height/2, scene.sys.canvas.width/2, "personagem");

        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.cursor = scene.input.keyboard.createCursorKeys();

        scene.physics.world.enable(this);

        (this.body as Phaser.Physics.Arcade.Body).allowGravity = true;
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

        scene.add.existing(this);
    }

    update():void{
        this.body.setVelocity(0);    
    
        // Horizontal movement
        if (this.cursor.left.isDown) {
          this.body.setVelocityX(-100);
        } else if (this.cursor.right.isDown) {
          this.body.setVelocityX(100);
        }
    
        // Vertical movement
        if (this.cursor.up.isDown) {
          this.body.setVelocityY(-100);
        } else if (this.cursor.down.isDown) {
          this.body.setVelocityY(100);
        }
    
        // Normalize and scale the velocity so that hacker can't move faster along a diagonal
        this.body.velocity.normalize().scale(100); 
    }
}