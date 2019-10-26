
export const Years = () => {
    let present = new Date().getFullYear();
    let arrayOfYears = [];
    let value;

    for (let i = 2011; i < present; i++) {
        value = `${i-1}/${i}`
        arrayOfYears.push(value);
    }

    return arrayOfYears;
}