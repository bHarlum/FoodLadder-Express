const ThreadModel = require("./../database/models/thread_model");

//TODO: This isn't being used yet!
async function update(req, res) {
  const updatedThread = req.body;
  const {id: _id} = updatedThread; 

  let response = "Default response for post-update function: Something has gone wrong.";

  if(!updatedThread){
    response = "No data recieved, Nothing has been updated."
  } else {
    try {
      const thread = await ThreadModel.update(id, updatedThread);
    } catch (err){
      console.log(err);
      response = err;
    }
  }
  res.send(response);
}

module.exports = {
  update
} 