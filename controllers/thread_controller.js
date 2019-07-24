const ThreadModel = require("./../database/models/thread_model");
const UserModel = require("./../database/models/user_model");

// get all threads
function index(req, res) {

  ThreadModel.find()
    .then(threads => {
      return threads.length === 0 ? res.send(null) : res.send(threads);
    }).catch(err => {
      next(new DatabaseError(err.status, err.message));
    });

}

// REQUIREMENTS: id of desired object
// KEY: 'id'
function show(req, res) {

  const { id } = req.params;

  ThreadModel.findOneAndUpdate(
    { _id: id },
    {$inc: {views: 1}}, {new: true}
  ).then(thread => {
    res.send(thread);
  }).catch(err => {
    next(new DatabaseError(err.status, err.message));
  });

}

// REQUIREMENTS: Copy of updated object
// KEY: 'updatedThread'
function update(req, res) {
  // Unpacking request
  const {updatedThread, userId} = req.body;
  const { id } = req.params;

  ThreadModel.findOneAndUpdate(
    { _id: id },
    updatedThread,
    { new: true }
  ).then(async thread => {
    const notification = { category: "threadReply" };
    await UserModel.findByIdAndUpdate(
      userId,
      {$push: {notifications: { ...notification}}},
      {safe: true, upsert: true},
      function(err, model) {
        if(err){
          next(new DatabaseError(err.status, err.message));
        }
      }
    );
    res.send(thread);
  });
}

// REQUIREMENTS: A copy of the new Object
// KEY: 'newThread'
async function create(req, res, next) {

  // unpacking required values from body.
  const { newThread } = req.body;

  ThreadModel.create(newThread)
    .then(thread => {
      res.send(thread);
    }).catch(err => {
      next(new DatabaseError(err.status, err.message));
    });
}

// REQUIREMENTS: the id of the record you want to delete
// KEY: 'id'
async function destroy(req, res) {
  // unpacking body
  const {id} = req.body;

  ThreadModel.deleteOne(id)
    .then(response => {
      res.send(response);
    }).catch(err => {
      next(new DatabaseError(err.status, err.message));
    });
}

function upload(req, res) {
  if(req.error){
    res.send(req.error);
  } else {
    res.send({key: req.file.key, size: req.file.size});
  }
}

module.exports = {
  index,
  show,
  update,
  create,
  destroy,
  upload
} 