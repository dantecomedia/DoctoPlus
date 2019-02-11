import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Lists from './Lists';
import ChartComponent from './Chart';


import '../App.css';
import {Animated} from "react-animated-css";

import Spinner from 'react-spinkit';

import SymptomsData from "../data/Symptoms.json"

import axios from 'axios';

const suggestions = [...SymptomsData];
let inputValue = null; 

function renderInputComponent(inputProps) {

  const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth    
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  title:{
    width:"50%",
    marginLeft: "35%",
    marginTop: "4%",
    fontSize: "40px",
    fontWeight: "500",
    fontFamily: "Satisfy",
    color: "#14364E",

  },
  container: {
    marginLeft: '5%',
    width: '40%',
    display:'inline-block',
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    display: 'inline',
    background: '#1E88E5',
    color: "#ffffff"
  },
  expansion:{
    marginTop: '5%',
    width: '50%',
    marginLeft: "5%",
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  root1: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    boxShadow: 'none',
    background: "#F1F2F2",
    minHeight: "100px"
  },
  root2:{
    color: '#ffffff',
    background: '#1E88E5',
  },
  root3:{
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  chip: {
    margin: theme.spacing.unit / 2,
    marginTop: "10px" 
  },
  list: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  
});

class Symptoms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: [1],
      single: '',
      popper: '',
      suggestions: [],
      symptomsList: [],
      selectedSymptom: [],
      spinner: false,
      searchText: '',
      diseases: [],
      percentage: []
    };
  }
  

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleToggle = value => () => {

    console.log(value);
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    const selected = [...this.state.selectedSymptom];
    const selectedIndex = selected.indexOf(value);

    if (currentIndex === -1) {
      newChecked.push(value);
      selected.push(value);
    } 
    else {
      newChecked.splice(currentIndex, 1);
      selected.splice(selectedIndex, 1);
    }

    this.setState({
      checked: newChecked,
      selectedSymptom: selected
    });
  };

  handleChange = name => (event, { newValue }) => {
    inputValue = newValue;
    this.setState({
      [name]: newValue,
    });
  };

  handleDelete =  data => () =>{ 
    const selected = [...this.state.selectedSymptom];
    const symptomToDelete = selected.indexOf(data);
    selected.splice(symptomToDelete, 1);
    this.setState({selectedSymptom: selected});
  };

  handleSymptoms = (selection) => {
      const selected = [...this.state.selectedSymptom];
      selected.push(selection.value);
      this.setState({selectedSymptom: selected}); 
  }

  handleSubmit = () => {
    // check if entered symptom is in the list
    const arr = [...this.state.symptomsList.map(e => e.label)]
    if(inputValue === null){
      alert("Please Enter Some Symptoms")
    }
    else if(this.state.selectedSymptom.includes(inputValue)){
      alert("Already Selected!");
      this.setState({
        single: ''
      }); 
      inputValue = null;
    }
    else if( arr.includes(inputValue)){
      console.log(inputValue);
      const selected = [...this.state.selectedSymptom];
      selected.push(inputValue);
      this.setState({
        selectedSymptom: selected,
        single: ''
      }); 
      inputValue = null;
    }
    else{
      alert("Not in the list");
    }

  }

  handlePost = () => {
    this.setState({spinner: true})
    
    let symptoms =  this.state.selectedSymptom
    
    symptoms = symptoms.map((symptom, index)=>{
        return symptom.split(" ").join("_");
    });
    
    console.log("Symptoms: " + symptoms);

    axios.post('http://localhost:8081/diagnose', {symptoms})
    .then(res=>{
      this.setState({
        spinner: false,
        diseases: res.data.response.diseases,
        percentage:res.data.response.percentage
      })
    })
    .catch(error => {
      console.log(error.response)
    });
  //   fetch('http://localhost:8081/diagnose', {
  //     method: "post",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     //make sure to serialize your JSON body
  //     body: JSON.stringify({symptoms})
  //   })
  //   .then((response)=> {
  //     return response.json();
  //   }).then((data)=> {
  //     this.setState({
  //       spinner: false,
  //       diseases: data.response.diseases,
  //       percentage: data.response.percentage
  //     })
  //   });
  //   console.log("Submitted") 
  // }
  }

  componentWillMount(){
    this.setState({symptomsList: SymptomsData,})
  }

  render() {
    const { classes ,onClose, selectedValue, ...other } = this.props;
    const  colors  = ["primary", "secondary", "default", "primary", "secondary"]
  
    const diseases = this.state.diseases.map((disease, i)=>{
      return <Lists disease={disease} percentage={this.state.percentage[i]} index={i}/>
    });

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className="Symptoms">
        <Typography className={classes.title}>Let's Diagnose</Typography>
        <Paper className={classes.root1}>
            {this.state.selectedSymptom.map((data,key) => {
                let icon = null;
                return (
                  <Animated animationIn="zoomIn" isVisible={true}>
                    <Chip
                        key={key}
                        icon={icon}
                        label={data}
                        onDelete={this.handleDelete(data)}
                        className={classes.chip}
                        color={colors[key]}
                        variant="outlined"
                    />
                  </Animated>
                );
            })}
        </Paper>
        
        <div class="autosuggest">
          <Autosuggest  
            {...autosuggestProps}
            inputProps={{
              classes,
              placeholder: 'Search Symptom',
              value: this.state.single,
              onChange: this.handleChange('single'), 
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />  
        </div>
        <div className="submitBtn">
           <Button onClick={this.handleSubmit} variant="contained" className={classes.button}>ADD</Button>
        </div>
        <Button onClick={this.handlePost} variant="contained" className={classes.button} id="submitBtn" disabled={ this.state.selectedSymptom.length >= 4 ? false : true}> Submit</Button>
        <div className="constraint">* Minimum 4 symptoms required</div>
        
        {this.state.spinner
          ?
          <div className="spinner"><Spinner name="three-bounce" color="#E91E63" /></div>
          : null
        }
        <Dialog open={this.state.spinner}></Dialog>
       
        <div className="DiseaseList">
          {this.state.diseases.length>0? diseases:null}
        </div> 

        <div className="Chart">
          {this.state.diseases.length>0? <ChartComponent diseases={this.state.diseases} percentage={this.state.percentage} />:null}
        </div>
        
        {/* <ExpansionPanel className={classes.expansion}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Symptoms List</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <List className={classes.root3}>
            {this.state.symptomsList.map(value => (
              <ListItem key={value.label} role={undefined} dense button onClick={this.handleToggle(value.label)}>
                <Checkbox
                 checked={this.state.checked.indexOf(value.label) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={ value.label } />
                
              </ListItem>
            ))}
         </List>
          </ExpansionPanelDetails>
      </ExpansionPanel> */}
      </div>
    );
  }
}

Symptoms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Symptoms);
