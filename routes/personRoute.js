const express = require('express');
const router = express.Router();
const Person = require("../models/person")

router.get('/', async (req, res) => {
      try {
            const personData = await Person.find();
            res.status(200).json(personData)
      }
      catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
      }
});
//POST route to add a person
router.post('/', async (req, res) => {
      try {
            const data = req.body; //Assuming the request body contains the person data
            console.log(data);

            //create a new Person document using mongoose Model
            const newPerson = new Person(data);
            //Save the new person to the database
            const response = await newPerson.save();
            console.log('data saved');
            res.status(200).json(response);
      }
      catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
      }
})
router.get('/:workType', async (req, res) => {
      try {
            const workType = req.params.workType;
            console.log(workType);
            if (workType === 'chef' || workType === "manager" || workType === "waiter") {
                  const response = await Person.find({ work: workType })
                  res.status(200).json(response)
            }
            else {
                  res.status(404).json({ error: 'Invalid WorkType' })
            }
      }
      catch (err) {
            res.status(500).json({ error: "Internal Server Error" })
      }
})
router.put('/:id', async (req, res) => {
      try {
            const personID = req.params.id; //Extract the id from the URL Parameter
            const updatedPersonData = req.body; //Updated data for the Person

            const response = await Person.findByIdAndUpdate(personID, updatedPersonData, {
                  new: true, //Return the updated document
                  runValidators: true //Run mongoose validators
            });
            if (!response) {
                  res.status(404).json({ error: 'person not found' });
            }
            res.status(200).json(response)
      }
      catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
      }
})
router.delete('/:id', async (req, res) => {
      try {
            const personID = req.params.id;
            const response = await Person.findByIdAndDelete(personID);
            if (!response) {
                  res.status(404).json({ error: "Person not found" })
            }
            res.status(200).json({ message: "person deleted successfully" })
      }
      catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
      }
})




module.exports = router;