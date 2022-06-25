import "./index.sass"

import model from "./model"
const models = new model()
models.set_listener()

document.getElementById("reset").addEventListener("click",()=> models.reset())