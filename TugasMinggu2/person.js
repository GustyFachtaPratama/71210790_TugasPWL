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
       
        fullName,
        age,
        isMale,
        avatar,
    };
};


export default Person;