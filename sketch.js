var dog, dogImage;
var happyDog, happyDogImage;
var foodS, foodStock;
var database;

function preload(){
  dogImage = loadImage("images/dog.png");
  happyDogImage = loadImage("images/happyDog.png");
}

function setup(){
	database = firebase.database(); 
  createCanvas(500,500);

  dog = createSprite(250,250,50,30);
  dog.addImage("dog",dogImage);
  dog.addImage("happy dog",happyDogImage);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock); 
}

function draw(){
  background(46,139,87);

  stroke("black");
  fill("white");
  textSize(15);
  text("Note: Press UP_ARROW key for some time to Feed Drago Milk !",40,40);
  textSize(18);
  text("Food Remaining : "+foodS,150,120);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage("happy dog",happyDogImage);
  }

  if (keyWentUp(UP_ARROW)){
    dog.changeImage("dog",dogImage);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
    if (x <= 0){
      x = 0;
    } else {
      x = x-1;
    }

    database.ref('/').update({
    Food:x
  })
}