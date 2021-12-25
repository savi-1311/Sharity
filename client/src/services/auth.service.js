export default function LoggedInUser(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}