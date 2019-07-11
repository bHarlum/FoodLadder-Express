const ThreadModel = require("./../database/models/thread_model");

async function index(req, res) {
  // get all threads
  const threads = await ThreadModel.find();
  threads.length == 0 ? res.send("Oh no! There doesn't seem to be any threads. ¯\\_(ツ)_/¯") : res.send(threads);
}

async function show(req, res) {
  const thread = await ThreadModel.findById(req.body.id);
  thread == null ? res.send("Could not retrieve the thread you were after.") : res.send(thread);  
}

function update(req, res) {
  return res.send("Thread update");
}

function make(req, res) {
  return res.send("Thread make");
}

function create(req, res) {
  return res.send("Thread create");
}

function destroy(req, res) {
  return res.send("Thread destroy");
}

module.exports = {
  index,
  show,
  update,
  make,
  create,
  destroy
} 