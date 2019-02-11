import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../App.css';

const styles = theme => ({
  welcome: {
    color: "#DDE0E3",
    marginLeft: "9%",
    marginTop: "100px",

  },
  title:{
    color: "#FEFFFE",
    marginLeft: "9%",
    marginTop: "10px",
    fontWeight: 500, 
    fontSize: "90px",
    letterSpacing: "3px",
    fontFamily: 'Playfair Display SC'
  },
  details:{
    color: "#F9FAFA",
    marginLeft: "9%",
    marginTop: "20px",
    width: "80%",
    fontSize: "26px"
  },
  rule:{
    width: "48%",
    marginTop: "20px",
    height: "3px",
    color:"#FBFCFB",
    background:"#FBFCFB",
    marginLeft:"9%"
  },
  extras:{
    color: "#B1B2B2",
    marginLeft: "9%",
    marginTop: "20px",
    width: "70%",
    fontSize: "20px",
    padding: "2px",
    marginTop: "15px"
  },
  extras2:{
    color: "#B1B2B2",
    marginLeft: "9%",
    marginTop: "5px",
    width: "70%",
    fontSize: "20px",
    padding: "2px",
  
  }
});

class Welcome extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="Welcome" >
        <Typography component="h2" variant="h4" className={classes.welcome}>Welcome to</Typography>
        <Typography component="h2" variant="h2" className={classes.title} >DOCTO <span className="plus">+</span></Typography>
        <hr className={classes.rule}/>
        <Typography component="h6" variant="h6" className={classes.details}>
          Start Diagnosing disease using Docto Plus
        </Typography>
        <Typography component="h6" variant="h6" className={classes.extras}>
          * Identify possible conditions related to your symptoms
        </Typography>
        <Typography component="h6" variant="h6" className={classes.extras2}>
          * This tool does not provide medical advice
        </Typography>
      </div>
    );
  }
}

// Welcome.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Welcome);