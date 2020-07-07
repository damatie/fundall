import { makeStyles } from "@material-ui/core/styles";

export const inputStyles = makeStyles((theme) => ({
  container: {
    width: "98.2%",
    // margin: "0 10rem 0 0",
    background: "#ffffff",
    height: "100%",
    padding: '0 2rem',
  },
  title: {
    color: "#61DAFB",
    textAlign: "center",
    padding: "2rem 0.2rem 1rem",
    textTransform: 'uppercase'
  },
  texts: {
    padding: "0 2em 2em",
    lineHeight: "2em",
    textAlign: 'justify',
  },
  formField: {
    // padding: "0 2rem 5em",
  },
  submit: {
    margin: '0 auto'
  },
  AuthIcon: {
    background: "rgba(28, 119, 195, 0.15)",
    borderRadius: "10px",
    width: "62px",
    height: "45px",
    display: 'inline-block',
    marginRight: '1rem',
    color: "#61DAFB",
    fontSize: "30px",
    textAlign: "center",
  },
}));
