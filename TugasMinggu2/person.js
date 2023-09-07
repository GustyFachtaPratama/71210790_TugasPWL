const Person = (fullName = "unknown", age = 25, isMale = false, avatar) => {
    const info = () => {
        return `Full Name: ${fullName}, Sex: ${isMale ? 'Male' : 'Female'}, Age: ${age}`;
    };

    return {
        get getInfo() {
            return info();
        },
        toString() {
            return info();
        },
        addAge: (years) => {
            age += years;
        },
        setAge: (newAge) => {
            age = newAge;
        },
        rename: (newName) => {
            fullName = newName;
        },
        // Shorthand property untuk mengembalikan semua nilai
        fullName,
        age,
        isMale,
        avatar,
    };
};

// Export objek Person sebagai sebuah modul
export default Person;