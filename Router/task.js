const express = require('express')
const Task = require('../model/task')
const auth = require('../Middleware/authorization')
const task = require('../model/task')

const router = new express.Router()

//3)ADD TASK post
router.post('/task/add', auth, async (req, res) => {
    console.log('Current customer Login',req.Cust)
    const newTask = new Task({
        ...req.body,
        owner:req.Cust._id
    })
    console.log(newTask)
    await newTask.save().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send('Can Not Add Task')
    })
})


//3)VIEW ALL TASK 
router.get('/task/getAlltask/',auth,async(req,res)=>{
    const id=req.Cust.id
    const alltask =await task.find({owner:id})
    console.log(alltask)
    if(alltask)
    {
        res.send(alltask)
    }
    else{
        res.send('no task found')
    }
})

//2)GET TASK BY ID
routes.get('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id; 
    try {
      const task = await Todo.findById(id); 
      if (!task) {
        return res.status(404).send('Task not found'); 
      }
      console.log('Task fetched successfully');
      res.status(200).send(task); 
    } catch (err) {
      console.error(err);
      res.status(500).send(err); 
    }
  });



//4)UPDATE TASK
router.put('/task/UpdateOne/:id',auth,async(req,res)=>{
    try{
       const updateFields=Object.keys(req.body);
       console.log(updateFields)
   
   const Task=await task.findById(req.params.id)
   if(!task)
   {
       return res.status(404).send({error:'task not found.please try again'})
   }

   updateFields.forEach((field)=>{
       task[field]=req.body[field]
   })
   await Task.save()
   res.status(200).send({message:'task updated successfully',task})
   console.log(task)

}
catch(error)
{
   return res.send('some error occured while updating task')
  }
})


//5)DELETE TASK

router.delete('/task/RemoveOne/Task/:id', auth, async (req, res) => {
    const tid = req.params.id
    const RemoveOne = await Task.findOneAndDelete({ _id:tid })
    console.log('After removing task----' + RemoveOne)

    if (RemoveOne) {
        res.send(RemoveOne)
        console.log('Task of specific Id Has Been Removed')
    }
    else {
        res.send('Sorry!!..Task Is Not Found')
    }

})

module.exports = router;