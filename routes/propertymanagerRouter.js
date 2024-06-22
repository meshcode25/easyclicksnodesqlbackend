const express= require ("express")
const router= express.Router();

const propertyController= require("../controllers/propertycontroller")
const unitController= require("../controllers/unitcontroller")
const landLordController= require("../controllers/landlordcontroller")
const careTakerController= require("../controllers/caretakercontroller")

//Post request for creating a new apartment

router.post("/list-property/step1", function (req,res,next){
    console.log(req.body);
    res.status(200).send({Listpropertymessage:req.body});
})


// , propertyController.create_apartement_post)

// //Get request for updating an apartement to show form for updating apartement
// router.get("/apartement/:id/update", propertyController.update_apartement_get)

// //Post request for updating apartement
// router.post("/apartement/:id/update ", propertyController.update_apartement_post)




/*

////API ROUTES FOR APARTEMENTS BEING MANAGED BY A REAL ESTATE AGENCY////
//APARTEMENTS ROUTES//
//get all the apartements on the dashboard being managed by a real estate company
router.get("/", propertyController.all_apartements)

//get details of a single property
router.get("/apartement", propertyController.apartement_details)

//Get request to create a new apartement
router.get("/apartement/create", propertyController.create_apartement_get)



//Get request for deleting an apartement to show form for deleting an apartement
router.get("/apartement/:id/delete", propertyController.delete_apartement_get)

//Post request for deleting an apartement
router.post("/apartement/:id/delete ", propertyController.delete_apartement_post)


//APARTEMENT'S UNITS ROUTES//
//get all the unites on the apartement dashboard being managed by a real estate company
router.get("/apartement/units", unitController.all_units)

//get details of a single unit
router.get("/apartement/unit", unitController.unit_details)

//Get request to create a new unit
router.get("/apartement/unit/create", unitController.create_unit_get)

//Post request for creating a new unit

router.post("/apartement/unit/create", unitController.create_unit_post)

//Get request for updating a unit to show form for updating a unit
router.get("/apartement/unit/:id/update", unitController.update_unit_get)

//Post request for updating unit
router.post("/apartement/unit/:id/update ", unitController.update_unit_post)


//Get request for deleting a unit to show form for deleting an unit
router.get("/apartement/unit/:id/delete", unitController.delete_unit_get)

//Post request for deleting an unit
router.post("/apartement/unit/:id/delete ", unitController.delete_unit_post)



*/

module.exports=router