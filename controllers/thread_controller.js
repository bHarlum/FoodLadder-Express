const ThreadModel = require("./../database/models/thread_model");
const UserModel = require("./../database/models/user_model");

async function index(req, res) {
  // get all threads
  try {
    const threads = await ThreadModel.find();
    threads.length == 0 ? res.send(null) : res.send(threads);
  } catch(err) {
    console.log("Encountered an error while trying to get all threads " +  err);
  }
}

// REQUIREMENTS: id of desired object
// KEY: 'id'
async function show(req, res) {
  let response  = "Default response for thread-show function. Something has gone wrong";
  const { id } = req.params;
  console.log(id);
  try {
    // Using findOneAndUpdate over findOne to update the view count on each request.
    const thread = await ThreadModel.findOneAndUpdate( { _id: id }, {$inc: {views: 1}}, {new: true});
    response = thread;
    console.log(thread);

  } catch (error) {
      response = "Error: Ran into an error while trying to get/update a thread. " + error;
    }
  res.send(response);  
}

// REQUIREMENTS: Copy of updated object
// KEY: 'updatedThread'
async function update(req, res) {
  console.log("Added new post to thread");
  // Unpacking request
  const {updatedThread, userId} = req.body;

  // declares and sets default value for response
  let response = "Default response for thread-update function: Something has gone wrong!";

  // checks to see if updatedThread has a value.
  if(!updatedThread) {response = "No data recieved, nothing has been updated.";}
  else {
  // Attempting to update thread
    try {
      const thread = await ThreadModel.findOneAndUpdate({ 
        _id: req.params.id 
      }, updatedThread, { new: true });

      const notification = { category: "threadReply" };

      const newUser = await UserModel.findByIdAndUpdate(
        userId,
        {$push: {notifications: { ...notification}}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
      )
      response = thread;
    } 
    catch (error) {
      response = customErrorMessage(error);
      console.log(error);
    }
  }
  console.log("Running update function " + response);
  res.send(response);
}

// REQUIREMENTS: A copy of the new Object
// KEY: 'newThread'
async function create(req, res) {
  // unpacking required values from body.
  const {newThread} = req.body;

  // declares and sets default value for response.
  let response = "Default response for thread-create function: Something has gone wrong!";

  // Checks to see if newThread has a value.
  if (newThread){
    try {
      const thread = await ThreadModel.create(newThread);
      response = thread;
    }
    catch (error) {
      response = customErrorMessage(error);;
    }
  } else response = "no value found for 'newThread'."

  console.log("Thread create method running: " + response);
  res.send(response);
}

// REQUIREMENTS: the id of the record you want to delete
// KEY: 'id'
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

function upload(req, res) {
  if(req.error){
    console.log(req.error);
    res.send(req.error);
  } else {
    res.send({link: req.file.location, size: req.file.size});
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
  destroy,
  upload
} 