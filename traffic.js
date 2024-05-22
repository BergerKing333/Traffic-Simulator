
function removeTraffic(traffic = [], car) {
    new_traffic = traffic;
    for (let vehicle of traffic) {
        if (Math.abs(vehicle.y - car.y) > (1.2 * window.innerHeight)) {
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
        let x = new Car(road.getLaneCenter(getRandomInt(road.laneCount) + 1), car.y - 500 * car.direction, 30, 50, "DUMMY", 2)
        x.update(road.borders)
        traffic.push(x);
    }
    return traffic;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}