const express = require('express');
const app = express();
const port = 3000;

// Dummy data
const facultyData = [
    {
    title: "Dr.",
  firstName: "John",
  middleName: "A.",
  lastName: "Doe",
  phone: "1234567890",
  gender: "Male",
  dateOfBirth: "1980-05-15",
  address1: "123 Elm Street",
  address2: "Apt 4B",
  city: "Springfield",
  zipcode: "12345",
  state: "Illinois",
  country: "USA",
  departmentName: "Computer Science",
  facultyId: "FAC123456",
  dateOfJoining: "2010-08-15",
  designation: "Professor",
  facultyEmail: "johndoe@university.edu",
  educationQualification: "PhD in Artificial Intelligence",
  areasOfSpecialization: ["Machine Learning", "Data Science", "Computer Vision"],
  experiences: 15,
  employeeType: "Permanent",
  teachingProcess: [
    {
      semester: "odd",
      subjectCode: "CS101",
      subjectName: "Introduction to Programming",
      scheduledClasses: 40,
      actualClasses: 38,
      attainment:2.6,
      score:9,
    },
    {
      semester: "even",
      subjectCode: "CS201",
      subjectName: "Data Structures",
      scheduledClasses: 45,
      actualClasses: 43,
      attainment:1.8
    },
    {
      semester: "even",
      subjectCode: "CS301",
      subjectName: "Algorithms",
      scheduledClasses: 50,
      actualClasses: 40,
      attainment:2.6
    },
    {
      semester: "odd",
      subjectCode: "CS401",
      subjectName: "Operating Systems",
      scheduledClasses: 60,
      actualClasses: 54,
      attainment:2.3
    }
  ],
  studentsFeedback: [
    {
      semester: "odd",
      subjectCode: "CS101",
      subjectName: "Introduction to Programming",
      studentFeedback: "98",
      pointsEarned: 9,
      
    },
    {
      semester: "Spring 2023",
      subjectCode: "CS201",
      subjectName: "Data Structures",
      studentFeedback: "78",
      pointsEarned: 7,
     
    },
    {
      semester: "Fall 2022",
      subjectCode: "CS301",
      subjectName: "Algorithms",
      studentFeedback: "88",
      pointsEarned: 8,
     
    },
    {
      semester: "Spring 2022",
      subjectCode: "CS401",
      subjectName: "Operating Systems",
      studentFeedback: "65",
      pointsEarned: 6,
     
    },
    {
      semester: "Fall 2021",
      subjectCode: "CS501",
      subjectName: "Artificial Intelligence",
      studentFeedback: "72",
      pointsEarned: 7,
     
    }
  ]
},


{
    title: "Prof.",
    firstName: "Emily",
    middleName: "C.",
    lastName: "Smith",
    phone: "9876543210",
    gender: "Female",
    dateOfBirth: "1975-09-10",
    address1: "456 Pine Avenue",
    address2: "Suite 5A",
    city: "Metropolis",
    zipcode: "67890",
    state: "California",
    country: "USA",
    departmentName: "Electrical Engineering",
    facultyId: "FAC654321",
    dateOfJoining: "2005-06-20",
    designation: "Associate Professor",
    facultyEmail: "emilysmith@university.edu",
    educationQualification: "M.Tech in Power Systems",
    areasOfSpecialization: ["Power Electronics", "Renewable Energy", "Control Systems"],
    experiences: 20,
    employeeType: "Permanent",
    password: "another_hashed_password",
    teachingProcess: [
      {
        semester: "odd",
        subjectCode: "EE101",
        subjectName: "Circuit Analysis",
        scheduledClasses: 40,
        actualClasses: 38,
        document: "link_to_document1.pdf",
        score: 9
      },
      {
        semester: "Spring 2023",
        subjectCode: "EE202",
        subjectName: "Electromagnetics",
        scheduledClasses: 44,
        actualClasses: 43,
        document: "link_to_document2.pdf",
        score: 9
      },
      {
        semester: "Fall 2022",
        subjectCode: "EE303",
        subjectName: "Power Systems",
        scheduledClasses: 48,
        actualClasses: 45,
        document: "link_to_document3.pdf",
        score: 8
      }
    ],
    studentsFeedback: [
      {
        semester: "Fall 2023",
        subjectCode: "EE101",
        subjectName: "Circuit Analysis",
        studentFeedback: "78",
        pointsEarned: 7,
        document: "feedback1.pdf",
        score: 7
      },
      {
        semester: "Spring 2023",
        subjectCode: "EE202",
        subjectName: "Electromagnetics",
        studentFeedback: "80",
        pointsEarned: 8,
        document: "feedback2.pdf",
        score: 8
      },
      {
        semester: "Fall 2022",
        subjectCode: "EE303",
        subjectName: "Power Systems",
        studentFeedback: "88",
        pointsEarned: 8,
        document: "feedback3.pdf",
        score: 8
      }
    ]
},
{
    title: "Prof.",
    firstName: "Emily",
    middleName: "C.",
    lastName: "Smith",
    phone: "9876543210",
    gender: "Female",
    dateOfBirth: "1975-09-10",
    address1: "456 Pine Avenue",
    address2: "Suite 5A",
    city: "Metropolis",
    zipcode: "67890",
    state: "California",
    country: "USA",
    departmentName: "Electrical Engineering",
    facultyId: "FAC654321",
    dateOfJoining: "2005-06-20",
    designation: "Associate Professor",
    facultyEmail: "emilysmith@university.edu",
    educationQualification: "M.Tech in Power Systems",
    areasOfSpecialization: ["Power Electronics", "Renewable Energy", "Control Systems"],
    experiences: 20,
    employeeType: "Permanent",
    password: "another_hashed_password",
    teachingProcess: [
      {
        semester: "Fall 2023",
        subjectCode: "EE101",
        subjectName: "Circuit Analysis",
        scheduledClasses: 40,
        actualClasses: 38,
        document: "link_to_document1.pdf",
        score: 9
      },
      {
        semester: "Spring 2023",
        subjectCode: "EE202",
        subjectName: "Electromagnetics",
        scheduledClasses: 44,
        actualClasses: 43,
        document: "link_to_document2.pdf",
        score: 9
      },
      {
        semester: "Fall 2022",
        subjectCode: "EE303",
        subjectName: "Power Systems",
        scheduledClasses: 48,
        actualClasses: 47,
        document: "link_to_document3.pdf",
        score: 9
      }
    ],
    studentsFeedback: [
      {
        semester: "Fall 2023",
        subjectCode: "EE101",
        subjectName: "Circuit Analysis",
        studentFeedback: "78",
        pointsEarned: 7,
        document: "feedback1.pdf",
        score: 7
      },
      {
        semester: "Spring 2023",
        subjectCode: "EE202",
        subjectName: "Electromagnetics",
        studentFeedback: "58",
        pointsEarned: 5,
        document: "feedback2.pdf",
        score: 5
      },
      {
        semester: "Fall 2022",
        subjectCode: "EE303",
        subjectName: "Power Systems",
        studentFeedback: "92",
        pointsEarned: 9,
        document: "feedback3.pdf",
        score: 9
      }
    ]
  },
  {
    title: "Ms.",
    firstName: "Sophia",
    middleName: "L.",
    lastName: "Taylor",
    phone: "1122334455",
    gender: "Female",
    dateOfBirth: "1988-12-20",
    address1: "789 Oak Boulevard",
    address2: "Building C",
    city: "Riverdale",
    zipcode: "54321",
    state: "New York",
    country: "USA",
    departmentName: "Mechanical Engineering",
    facultyId: "FAC789012",
    dateOfJoining: "2015-02-10",
    designation: "Senior Lecturer",
    facultyEmail: "sophiataylor@university.edu",
    educationQualification: "M.Tech in Thermodynamics",
    areasOfSpecialization: ["Fluid Mechanics", "Heat Transfer", "Thermal Systems"],
    experiences: 9,
    employeeType: "Permanent",
    password: "yet_another_hashed_password",
    teachingProcess: [
      {
        semester: "Fall 2023",
        subjectCode: "ME101",
        subjectName: "Thermodynamics",
        scheduledClasses: 42,
        actualClasses: 40,
        document: "link_to_document1.pdf",
        score: 9
      },
      {
        semester: "Spring 2023",
        subjectCode: "ME201",
        subjectName: "Heat Transfer",
        scheduledClasses: 40,
        actualClasses: 39,
        document: "link_to_document2.pdf",
        score: 9
      },
      {
        semester: "Fall 2022",
        subjectCode: "ME301",
        subjectName: "Fluid Mechanics",
        scheduledClasses: 44,
        actualClasses: 42,
        document: "link_to_document3.pdf",
        score: 9
      }
    ],
    studentsFeedback: [
      {
        semester: "Fall 2023",
        subjectCode: "ME101",
        subjectName: "Thermodynamics",
        studentFeedback: "85",
        pointsEarned: 8,
        document: "feedback1.pdf",
        score:8
      },
      {
        semester: "Spring 2023",
        subjectCode: "ME201",
        subjectName: "Heat Transfer",
        studentFeedback: "78",
        pointsEarned: 7,
        document: "feedback2.pdf",
        score: 7
      },
      {
        semester: "Fall 2022",
        subjectCode: "ME301",
        subjectName: "Fluid Mechanics",
        studentFeedback: "86",
        pointsEarned: 8,
        document: "feedback3.pdf",
        score: 8
      }
    ]
  }
];

app.get('/api/faculty/:facultyId', (req, res) => {
    const facultyId = req.params.facultyId;
    const faculty = facultyData.find(fac => fac.facultyId === facultyId);
console.log('doing');
    if (faculty) {
      res.json(faculty);
    } else {
      res.status(404).json({ message: "Faculty not found" });
    }
  });
// Start the server
app.listen(port, () => {
  console.log(`Dummy API is running at http://localhost:${port}`);
});
