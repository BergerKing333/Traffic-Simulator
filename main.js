const carCanvas=document.getElementById("carCanvas");
carCanvas.width=500;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9, 6);

const N=1000;
const cars=generateCars(N);
let bestCar=cars[0];
if (localStorage.getItem("bestBrain") !== null) {

    if(localStorage.getItem("bestBrain")){
        for(let i=0;i<cars.length;i++){
            cars[i].brain=JSON.parse(
                localStorage.getItem("bestBrain"));
            if(i!=0){
                NeuralNetwork.mutate(cars[i].brain,0.07);
            }
        }
    }
}

let traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(3), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(4), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(5), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2, getRandomColor()),
];

const maxTraffic = traffic.length;

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    
    traffic = removeTraffic(traffic, bestCar);
    traffic = generateTraffic(traffic, bestCar);

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}

function removeTraffic(traffic = [], car) {
    new_traffic = traffic;
    for (let vehicle of traffic) {
        if (Math.abs(vehicle.y - car.y + 500) > (.85 * window.innerHeight)) {
            const index = traffic.indexOf(vehicle);
            if (index > -1) {
                new_traffic.splice(index, 1);
            }
            console.log("deleted")
        }
    }
    return new_traffic;
}

function generateTraffic(traffic = [], car) {
    for (let i = 0; i < maxTraffic - traffic.length; i++) {
        let x = new Car(road.getLaneCenter(getRandomInt(road.laneCount)), car.y - (.7 * window.innerHeight * car.direction), 30, 50, "DUMMY", 2, getRandomColor())
        x.update(road.borders)
        traffic.push(x);
    }
    return traffic;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}