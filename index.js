const { Client } = require("pg"); // include the Client constructor from the pg module

// make a new instance of the Client constructor and specify which db to connect to using the connectionString key
const client = new Client({
  connectionString: "postgresql://postgres:postgres@localhost/pglessonone"
});

// connect!
client.connect();

// let's make a function to get all the rows in our students table!
async function getStudents() {
  const results = await client.query("SELECT * FROM students");
  console.log("all students in DB")
  console.log(results.rows);
}

// let's make a function to get all the rows in our students table!
async function addStudent(name) {
    const results = await client.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING *", // We're using RETURNING * to get back the new record
      [name] // notice our use of $1 - NEVER EVER use string concatenation/interpolation in your SQL queries.
    );
    console.log(results.rows[0]); // we are using [0] because there is only 1 record here.

  }
  
  async function getStudentById(id){
      const student =await client.query(
        "select * from students where id=$1",[id]
      );
     console.log("student with id:"+id)
      console.log(student.rows);
  }

  async function updateStudent(id,name){
    var student1 = await client.query(
        "update students set name=$1 where id=$2 returning *",[name,id]
    );
    console.log("updated sucessfully")
    console.log(student1.rows);
  }

  async function deleteStudent(id){
    var deletedStudent=await  client.query(
        "delete from students where id=$1 returning *",[id]
    ); 
    if(deletedStudent.rows.length>0){
    console.log('below record is deleted')
    console.log(deletedStudent.rows);
    }
    else{
        console.log("no record with id:"+id+" is found")
    }
  }
  
  getStudentById('2').then((val)=>{
     // console.log(val);
  })

  updateStudent(2,'kushal').then(()=>{
  })

  addStudent("Angelina").then(() => {});

  deleteStudent('5')

getStudents().then(() => process.exit(0));
//ALTER TABLE students ALTER COLUMN name SET NOT NULL;