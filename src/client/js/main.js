import "../scss/styles.scss";
import { async } from "regenerator-runtime";

const title = document.getElementById("title")

const notSubmit = (event) => {
    event.preventDefault();
}

if (title) {

title.addEventListener("click",notSubmit)

}
