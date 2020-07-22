//Create variables here
var hdog,hdog1,dog1,database,Food,foodstock;
var fedTime,lastfed;
var foodObj;
var feed,addFood;
function preload()
{
  //load images here
  hdog1=loadImage("Happy.png");
  dog1=loadImage("Dog.png");
}

function setup() {
 database=firebase.database();
  createCanvas(800, 700);
  hdog=createSprite(400,450,30,30)
  hdog.scale=0.3;
  hdog.addAnimation("img1",dog1)
  hdog.addAnimation("img",hdog1)
  
  foodstock=database.ref('food')
  foodstock.on("value",readStock)
  foodObj=new food();
  feed=createButton("feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFood)
}


function draw() {  
  background(46, 139, 87);
  
    foodObj.display();
    fill(255,255,254)
    textSize(15)
    lastfed=database.ref('lastFed')
    lastfed.on("value",readStock)
  
    if(lastfed>=12){

text("last feed:"+lastfed%12+" pm",350,30 )

    }else if(lastfed==0){

text("last feed: 12AM",350,30)


    }else {

text("last feed: "+ lastfed+" AM",350,30)

       
    }
  drawSprites();
  //add styles here
 
}

function readStock(data){

Food=data.val();

}
function writeStock(x){
if(x<=0){
x=0


}else{

x=x-1;

}
database.ref('/').update({

food:x

});

}
function addFood(){
foodstock++;

database.ref("/").update({
Food:foodstock


})
}

function feedDog(){
  hdog.changeAnimation("img",hdog1)
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref("/").update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
})
}