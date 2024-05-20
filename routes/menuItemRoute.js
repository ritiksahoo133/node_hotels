const express = require('express');
const router = express.Router();
const MenuItem = require("../models/MenuItem")

router.post('/', async (req, res) => {
      try {
            const data = req.body;
            const newMenu = new MenuItem(data);
            const response = await newMenu.save();
            res.status(200).json(response);
      }
      catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
      }
})
router.get('/', async (req, res) => {
      try {
            const data = await MenuItem.find();
            res.status(200).json(data);
      }
      catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
      }
      const data = await MenuItem.find()
})
router.get('/:taste', async (req, res) => {
      try {
            const tasteType = req.params.taste;
            console.log(tasteType);
            if (tasteType === 'spicy' || tasteType === "sour" || tasteType === "sweet") {
                  const response = await MenuItem.find({ taste: tasteType })
                  res.status(200).json(response)
            }
            else {
                  res.status(404).json({ error: "Invalid Taste Type" })
            }
      }
      catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
      }
})
router.put("/:id", async (req, res) => {
      try {
            const menuID = req.params.id;
            const updateMenuItem = req.body;

            const response = await MenuItem.findByIdAndUpdate(menuID, updateMenuItem, {
                  new: true, //Return the updated document
                  runValidators: true //Run mongoose validators
            })

            if (!response) {
                  res.status(404).json({ error: "menu not found" })
            }
            res.status(200).json(response);
      }
      catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
      }
})
router.delete("/:id", async (req, res) => {
      try {
            const menuID = req.params.id;
            const response = await MenuItem.findByIdAndDelete(menuID)
            if (!response) {
                  res.status(404).json({ error: "menu not found" })
            }
            res.status(200).json({message:"menu deleted successfully"})
      }
      catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
      }

})
module.exports = router