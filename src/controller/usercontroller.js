import { status } from "init";
import { sequelize, students, courses, enrollments } from "../config/db.js";

// CONTROLLERS FOR CRUD OPERATIONS..........

const registerstudent = async (req, res) => {
  try {
    const { studentname, studentemail } = req.body;
    const result = await students.create({
      studentname: studentname,
      studentemail: studentemail,
    });
    res.status(200).json({
      data: result,
      status: 200,
      message: "conratulation user registered",
    });
  } catch (err) {
    res.status(400).json({
      status: 502,
      message: "there is error in registration",
      data: err,
    });
  }
};
const entercourse = async (req, res) => {
  try {
    const { coursename, credithours } = req.body;
    const result = await courses.create({
      coursename: coursename,
      credithours: credithours,
    });
    res.status(200).json({
      status: 200,
      data: result,
      message: "course successfully registered",
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: "there is error in entering course",
      data: err,
    });
  }
};

const enterenrollments = async (req, res) => {
  try {
    const { courseids } = req.body;

    const result = await Promise.all(
      courseids.map(async (mycourseid) => {
        const enrollment = await enrollments.create({
          courseid: mycourseid.courseid,
          studentid: mycourseid.studentid,
        });
        return enrollment;
      })
    );

    res.status(200).json({
      data: result,
      message: "entrollments successful",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "there is error in enrollments",
      status: 404,
      data: err,
    });
  }
};

const getcourses_by_studentid = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await students.findOne({
      where: {
        id: id,
      },
      include: {
        model: courses,
        attributes: ["coursename"],
      },
    });
    if (!result) {
      res.json("not student with is id");
    } else {
      const mycourses = result.courses.map((course) => {
        return course.coursename;
      });
      res.status(200).json({
        status: 200,
        data: mycourses,
        messsage: "courses successfully found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 404,
      data: err,
      message: "there is error in getting courses",
    });
  }
};
const update1= async(req,res)=>{
    const {newcourseid,id}=req.body;
    try{
        const result= await enrollments.update({courseid:newcourseid},{where:{id:id}});
        res.json(result);

    }catch(err){
        res.status(404).json({
            data:err,
            status:404,
            messsage:"there is a error"
        });
    }
};
const delete1= async(req,res)=>{
    try{
        const {id}=req.params;
        const result= await enrollments.findByPk(id);
        const result1= await result.destroy();
        res.status(200).json({
            
            message:"enrollment deleted"
        });

    }catch(err){
        res.status(404).json({
            data:err,
            messasge:"there is error in deletion"
        })
    }
}

export default {
  registerstudent,
  entercourse,
  enterenrollments,
  getcourses_by_studentid,
  update1,delete1
 
};
