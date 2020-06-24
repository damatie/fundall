import { makeStyles } from "@material-ui/core/styles";

export const inputStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    margin: "0 auto",
    background: "#ffffff",
    height: "100vh",
    overflowY: "scroll",
  },
  title: {
    color: "#1C77C3",
    textAlign: "center",
    padding: "2rem 0.2rem 1rem",
  },
  texts: {
    padding: "0 2em 2em",
    lineHeight: "2em",
    textAlign: 'justify'
  },
  formField: {
    padding: "0 2rem 5em",
  },
  submit: {
    margin: '0 auto'
  }
}));
