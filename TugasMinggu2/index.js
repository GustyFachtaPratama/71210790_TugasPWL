// 1. Import Person.js
import Person from "./person.js";

// 2. Definisikan ketiga objek person sesuai dengan ketentuan seperti di atas
const charles = Person("Charles", 30, true, "https://picsum.photos/seed/picsum/200");
const mary = Person("Mary", 23, false, "https://picsum.photos/200?grayscale");
const jane = Person("Jane", 20, false, "https://picsum.photos/200");

// 3. Tambah usia Jane 15 tahun
jane.addAge(15);

// 4. Set usia Charles menjadi 80 tahun
charles.setAge(80);

// 5. Tampilkan Informasi charles dengan querySelector
const charlesImg = document.querySelector("#charles img");
const charlesInfo = document.querySelector("#charles .info");

// a. Set avatar charles pada selector image
charlesImg.src = charles.avatar;

// b. Tampilkan info dengan Template literals
charlesInfo.innerHTML = `Full Name: ${charles.fullName}. Sex: ${charles.isMale ? 'Male' : 'Female'}. His Age : ${charles.age} years.`;

// 6. Sama seperti Charles, tampilkan Informasi mary dan Jane dengan querySelector
const maryImg = document.querySelector("#mary img");
const maryInfo = document.querySelector("#mary .info");
const janeImg = document.querySelector("#jane img");
const janeInfo = document.querySelector("#jane .info");

// Set avatar mary dan jane pada selector image
maryImg.src = mary.avatar;
janeImg.src = jane.avatar;

// Tampilkan info dengan Template literals
maryInfo.innerHTML = `Full Name: ${mary.fullName}. Sex: ${mary.isMale ? 'Male' : 'Female'}. Her Age : ${mary.age} years.`;
janeInfo.innerHTML = `Full Name: ${jane.fullName}. Sex: ${jane.isMale ? 'Male' : 'Female'}. Her Age : ${jane.age} years.`;

// 7. Gabungkan objek charles dengan spread operator
const charlesJob = { job: "Programmer" };
const charlesJobInfo = { ...charles, ...charlesJob };

// 8. Definisikan fullName dan job milik Charles dengan object destructuring
const { fullName, job } = charlesJobInfo;

// a. Tampilkan job info milik charles dengan query selector
const charlesJobInfoSelector = document.querySelector("#charles .job-info");

// b. Tampilkan info dengan Template literals
charlesJobInfoSelector.innerHTML = `${fullName} is a ${job}`;