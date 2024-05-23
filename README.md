# Traffic-Simulator
Self driving car driving in traffic with genetic mutation based ML model


The original model is based on the hereditary/genetic mutation model, and requires the user to 'save' the best car model from each consecutive run to use in later iterations. This means that many of the behaviors that the model will develop are cherry-pickable by the user. This model runs 1000 cars in parallel and shows the car that has traveled the furthest as the current ideal.

The second model is based on deep reinforcement learning, and uses the same set of inputs and outputs but trains in series and uses calculated rewards based on performance rather than relying on the user input. The training cycles are done i