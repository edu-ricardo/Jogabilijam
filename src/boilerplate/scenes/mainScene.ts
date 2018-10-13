import { Hacker } from "../objects/hacker";

export class MainScene extends Phaser.Scene {
  private worldLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private hacker: Hacker;

  private cursor: CursorKeys;
  velocity: Phaser.Math.Vector2;

  constructor() {
    super({
      key: "MainScene"
    });
  } 

  preload(): void {
    this.load.image("tiles", "./assets/boilerplate/tileset.png");
    this.load.image("personagem", "./assets/boilerplate/atlas.png");
    this.load.tilemapTiledJSON("map", "./assets/boilerplate/future.json");
  }

  create(): void {
    this.createMap();
    this.hacker = new Hacker(this);
    
    this.velocity = new Phaser.Math.Vector2(0, 0);
    this.cursor = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.hacker, this.worldLayer, () => {console.log('colidindo')});
  }

  createMap(){
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    
    map.createStaticLayer("background", tileset, 0, 0);
    this.worldLayer = map.createStaticLayer("world", tileset, 0, 0);
    
    this.worldLayer.setCollisionBetween(1, 300);
    
    //this.physics.world.createDebugGraphic();    
    //const graphics = this.add
    //  .graphics()
    //  .setAlpha(0.75)
    //  .setDepth(20);
    //this.worldLayer.renderDebug(graphics, {
    //  tileColor: null, // Color of non-colliding tiles
    //  collidingTileColor: new Phaser.Display.Color(243, 0, 0, 255), // Color of colliding tiles
    //  faceColor: new Phaser.Display.Color(0, 255, 0, 255) // Color of colliding face edges
    //});
  }

  update(){
    this.hacker.update();
  }

}
