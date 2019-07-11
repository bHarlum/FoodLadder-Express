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

// REQUIREMENTS: id, changes(key value pairs)
async function update(req, res) {
  // Unpacking request
  const {id, updatedThread} = req.body;

  // declares and sets default value for response
  let response = "Default response for thread-update function: Something has gone wrong!";

  // checks to see if updatedThread has a value.
  if(updatedThread) response = "No data recieved, nothing has been updated.";

  // Attempting to update thread
  try {
    const thread = await ThreadModel.update(id, updatedThread);
    response =  "update successful";
  } 
  catch (erorr) {
    response = "Error: While trying to thread-update a thread: " + error;
    console.log(error);
  }

  res.send(response);
}

// REQUIREMENTS: an object stored as 'newThread' within 'body'
async function create(req, res) {
  // unpacking required values from body.
  const {newThread} = req.body;

  // declares and sets default value for response.
  let response = "Default response for thread-create function: Something has gone wrong!";

  // Checks to see if newThread has a value.
  if (newThread){
    try {
      const thread = await ThreadModel.insertOne(newThread);
      response = "Success! Thread created.";
    }
    catch (error) {
      response = "Error: While trying to create new thread: " + error;
      console.log(response);
    }
  } else response = "no value found for 'newThread'."

  res.send(response);
}

function destroy(req, res) {
  return res.send("Thread destroy");
}

module.exports = {
  index,
  show,
  update,
  create,
  destroy
} 