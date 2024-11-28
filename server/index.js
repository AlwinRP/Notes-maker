const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI||"mongodb+srv://alwinpaldano:Alwin*RP123@cluster0.z8urw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
  useNewUrlParser: true,
    useUnifiedTopology: true,
   
});

app.get('/get',(req ,res) =>
  TodoModel.find()
.then(result =>res.json(result))
.catch(err => res.json(err))
)


app.post(
  '/add',
  (req,
  res) => {
    const task = req.body.task;
    TodoModel.create({
      task: task
    })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  });

app.put(
  '/toggle/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then (result => res.json(result))
    .catch(err => res.json(err))
     
  }
)

app.delete(
  '/delete/:id',(req,res)=>{
    const{id}=req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then (result => res.json(result))
    .catch(err => res.json(err))
}
  
)

app.put('/update-task/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate(id, { task: task }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is Running");
});
