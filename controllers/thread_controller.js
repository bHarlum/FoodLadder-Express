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
  const {updatedThread} = req.body;
  const {id: _id} = updatedThread; 

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
    response = customErrorMessage(error);
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
      const thread = await ThreadModel.create(newThread);
      response = "Success! Thread created.";
    }
    catch (error) {
      response = customErrorMessage(error);;
    }
  } else response = "no value found for 'newThread'."

  console.log(response);
  res.send(response);
}

async function destroy(req, res) {
  // unpacking body
  const {id} = req.body;

  let response = "Default response for thread-destroy function: Something has gone wrong!";
  if(id){
    try{
      await ThreadModel.deleteOne(id);
    }catch (error){
      response = customErrorMessage(error);
      console.log(response);
    }
  }
}

function customErrorMessage(error){
  return `Error: While trying to ${customErrorMessage.caller} on thread: " + ${error}`
}

module.exports = {
  index,
  show,
  update,
  create,
  destroy
} 