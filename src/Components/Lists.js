import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Animated} from "react-animated-css";

let i;
console.log(i);
let backgroundColor = ["#14364E", "#7F84C2", "#7F84C2"];
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit ,
    paddingBottom: theme.spacing.unit ,
    width: "60%",
    color: "#529BFC",
    margin: "10px",
    marginLeft: "5%",
    background: "#14364E"
  },
  disease:{
    color: "#fff"
  },
  percentage:{
    color: "#fff",
    background: "#38A338",
    padding:"5px",
    width:"53px",
    marginTop:"5px"
  }
});
  //capitalize_Words 
  function capitalize_Words(str){
     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

function Lists(props) {
  const { classes } = props;
  i = props.index;
  return (
    <Animated animationIn="fadeInDown"  isVisible={true}>
      <div>
        <Paper className={classes.root} elevation={1}>
        <Typography className={classes.disease}>{capitalize_Words(props.disease)}</Typography>
        <Typography className={classes.percentage}>{capitalize_Words(props.percentage)} %</Typography>  
        </Paper>
    </div>       
    </Animated>
    
  );
}

Lists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Lists);