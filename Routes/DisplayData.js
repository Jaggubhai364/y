const express = require("express");
const router = express.Router();

// router.post('/foodData', (req, res) => {
//     try {
//         console.log(global.food_item);
//         console.log(global.foodCategory);

//         // Check if the global variables have data
//         if (!global.food_item || !global.foodCategory) {
//             return res.status(404).send('Data not found');
//         }

//         // Send both food item and category data as a JSON object
//         res.status(200).json({ foodItems: global.food_item, foodCategories: global.foodCategory });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server error');
//     }
// });


router.post('/foodData', (req,res) =>{
    try {
        console.log(global.food_item)
        console.log(global.foodCategory)
        res.send([global.food_item,global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send('server error')
    }
})


module.exports = router;



// router.post('/foodData', (req,res) =>{
//     try {
//         console.log(global.food_item)
//         console.log(global.foodCategory)
//         res.send(global.food_item,global.foodCategory)
//     } catch (error) {
//         console.error(error.message)
//         res.send('server error')
//     }
// })