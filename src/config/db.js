
import { DataTypes, INTEGER, Sequelize } from "sequelize";
const sequelize= new Sequelize("finalstudent","root","root_123",{
    port:"3306",
    host:"localhost",
    dialect:"mysql"
});
const checkconnect= async()=>{
    try{
        await sequelize.authenticate();
        console.log("connected")
    }catch(err){console.log(err)}
}
checkconnect();
const students= sequelize.define("students",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    studentname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    studentemail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
});
students.sync();
const courses= sequelize.define("courses",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    coursename:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    credithours:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

});
courses.sync();
const enrollments= sequelize.define("enrollments",{
    id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
    },
    studentid:{
        type:DataTypes.INTEGER,
        references:{
            model:students,
            key:"id"
        }
    },
    courseid:{
        type:DataTypes.INTEGER,
        references:{
            model:courses,
            key:"id"
        }
    },
});

students.belongsToMany(courses,{through:enrollments,foreignKey:"studentid"});
courses.belongsToMany(students,{through:enrollments,foreignKey:"courseid"});
enrollments.sync();

export {sequelize,students,courses,enrollments};