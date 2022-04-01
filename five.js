Status="";
objects= [];
function redirect(){
    window.location="home.html";
}


function setup(){
canvas=createCanvas(650,400);
canvas.center();
Object_detector= ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting object";
}
function preload(){
img=loadImage("background.jpg");
}
function draw(){
image(img,0,0,650,400);
if(Status!=""){
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status: object detected";
        fill("Red");
        confidence= Math.round(objects[i].confidence*100)+" % ";
        text(objects[i].label+" "+confidence,objects[i].x,objects[i].y);
        noFill();
        stroke("Red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
    }
}

}
function modelLoaded(){
console.log("model is loaded");
Status=true;
Object_detector.detect(img,gotResults);
}
function gotResults(error,results){
if(error){
    console.log(error)
    
}
else{
    console.log(results);
    objects= results;
}
}