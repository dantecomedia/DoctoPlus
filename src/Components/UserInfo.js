import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Animated} from "react-animated-css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Symptoms from './Symptoms';
import '../App.css';
import '../Transition.css';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
     margin: theme.spacing.unit,
    },
    // group: {
    //  margin: `${theme.spacing.unit}px 0`,
    // },
  welcome: {
    color: "#DDE0E3",
    marginLeft: "9%",
    marginTop: "50px",
  },
  title:{
    color: "#FEFFFE",
    marginLeft: "9%",
    marginTop: "1px",
    fontWeight: 500, 
    fontSize: "70px",
    letterSpacing: "2px"
  },
  details:{
    color: "#F9FAFA",
    marginLeft: "9%",
    marginTop: "20px",
    width: "70%"
  },
  toggleContainer: {
    // height: 100,
    padding: "10px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 9`,
    background: "primary",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class UserInfo extends Component {
    state = {
        user: false,
        alignment: 'male',
        formats: ['bold'],
        name: '',
        age: null,
        value: "male"
    };
    handleName = name => event => {
        this.setState({ 
            name: event.target.value 
        });
    };
    handleAge = name => event => {
        this.setState({ 
            age: event.target.value 
        });
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
      };
    
    handleSymptoms = () => {

        if(this.state.name==''){
            alert("Please Enter your name");
            return;
        }
        if(this.state.age==null){
            alert("Please Enter Your Age");
            return;
        }
        if(this.state.age < 1 || this.state.age > 100){
            alert("Age Must be b/w 1 and 100");
            return;
        }
        if(this.state.gender==false && (this.state.alignment!= 'male' || this.state.alignment!='female')){
            alert("Please Select Gender");
            return;
        }
        console.log(this.state.gender);
        this.setState({user: true});
        console.log(this.state.user);
    };
    
    render() {
        const { classes } = this.props;
        const { alignment, formats } = this.state;
        const inputProps = {
            maxLength: 2,
          };
          

        if(!this.state.user){
            return (
                <div className="UserInfo" >
                    <div className="header">
                        Enter Your Details
                    </div>
                    <div className="layout">
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            required={true}
                            id="standard-dense"
                            label="Your Name"
                            className={classNames(classes.textField, classes.dense)}
                            margin="dense"
                            onChange={this.handleName('name')}
                        />
                        <TextField
                            required={true}
                            type="number"
                            id="standard-dense"
                            label="Age"
                            className={classNames(classes.textField, classes.dense)}
                            margin="dense"
                            onChange={this.handleAge('name')}
                            inputProps={inputProps}
                        />
                    </form>
                    <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                   
                        <RadioGroup
                            aria-label="Gender"
                            name="gender1"
                            className={classes.group}
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                    
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                
                        </RadioGroup>
                    
                    </FormControl>
                    </div>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={this.handleSymptoms}> 
                        Continue
                        <SvgIcon>
                                <path fill="none" d="M0 0h24v24H0V0z"/><path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/>
                        </SvgIcon>
                    </Button>
                    </div>
                </div>
            );
        }
        else{  
            return(
                <Animated animationIn="fadeIn"  isVisible={true}>
                    <div >
                    <Symptoms />
                    </div>
                </Animated>
                
            );
        }
        
    }
}

export default withStyles(styles)(UserInfo);