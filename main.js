noseX=0;
noseY=0;
difference=0;
rightWristX=0;
leftWristX=0;

function setup() {
    video= createCapture(VIDEO);
    video.size(550,500);
    video.position(100,130)

    canvas=createCanvas(550,500)
    canvas.position(800,130);
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {
    background("grey");
    document.getElementById("square_properties").innerHTML="Width and height of the square will be "+difference+"px";
    fill("green");
    stroke("green");
    square(noseX,noseY,difference);
}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("noseX ="+noseX+"noseY ="+noseY);

        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        difference=floor(leftWristX-rightWristX);
        console.log("LeftWristX="+leftWristX+"rightWrist="+rightWristX+"difference="+difference)
        
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}