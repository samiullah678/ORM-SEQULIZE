import express from "express";
import usercontroller from "../controller/usercontroller.js";
const {
  registerstudent,
  entercourse,
  enterenrollments,
  getcourses_by_studentid,
  update1,delete1
 
} = usercontroller;
const router = express();
router.post("/registerstudent", registerstudent);
router.post("/entercourse", entercourse);
router.post("/enrollment", enterenrollments);
router.get("/getcoursebystudent/:id", getcourses_by_studentid);
router.put("/update",update1);
router.put("/delete/:id",delete1);

export default router;
