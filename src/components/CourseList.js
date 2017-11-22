import React, {Component} from 'react'
import {ListGroup, FormGroup, ControlLabel, Checkbox} from 'react-bootstrap'
import CourseRow from './CourseRow'



export default class CourseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            courseList: this.props.courseList,
            checkedNum: this.props.publisherList.length

        };
        this.publisherFilter = this.publisherFilter.bind(this);
        this.showFullCourseList = this.showFullCourseList.bind(this);
    }

    publisherFilter(event) {
        let courseList = this.props.courseList;
        if(event.target.value==="all" && event.target.checked){
            courseList = courseList.map((course)=> {
                course.display = true;
                return course;
            });
            this.setState({checkedNum: this.props.publisherList.length});
            for (let i = 0; i < this.props.publisherList.length; i++) {
                this[`cb${i}`].checked = true;
            }

        }else if(event.target.value==="all" && !event.target.checked){
            courseList = courseList.map((course)=> {
                course.display = false;
                return course;
            });
            this.setState({checkedNum: 0});
        }else {
            if(event.target.checked){
                this.setState((prevState, props) => ({
                    checkedNum: prevState.checkedNum + 1
                }));
            }else{
                this.setState((prevState, props) => ({
                    checkedNum: prevState.checkedNum - 1
                }));
            }

            courseList = courseList.map((course)=> {
                if(course.publisher===event.target.value){
                    course.display = event.target.checked;
                }
                return  course;
            });
        }
        this.setState({
            courseList: courseList.filter((course)=> course.display===true)
        });
    }

    showFullCourseList(){
        this.setState({
            courseList: this.props.courseList
        });
    }

    render(){
        return(
            <div>
                <ListGroup>
                    {(this.state.checkedNum===0)? this.props.courseList.map((course,i)=> <CourseRow key={i} course={course}/>)
                                                : this.state.courseList.map((course,i)=> <CourseRow key={i} course={course}/>)}
                </ListGroup>
                <FormGroup>
                    <p><ControlLabel>Show Only Selected Publisher(s)</ControlLabel></p>
                    {this.props.publisherList.map((publisher, i)=>
                        <Checkbox key={i}
                                  inline
                                  ref={publisher}
                                  value={publisher}
                                  inputRef={ref => this[`cb${i}`] = ref}
                                  defaultChecked
                                  onClick={this.publisherFilter}>{publisher} </Checkbox>
                    )}
                    <Checkbox inline
                              value="all"
                              ref="all"
                              checked={this.state.checkedNum===this.props.publisherList.length || this.state.checkedNum===0}
                              disabled={this.state.checkedNum===this.props.publisherList.length || this.state.checkedNum===0}
                              onClick={this.publisherFilter}>all</Checkbox>
                </FormGroup>

            </div>
        )
    }
}

CourseList.defaultProps = {
    courseList: [
        {
            id: "60607",
            publisher: "lynda",
            title: "Intro to Xamarin.Android",
            blob: "Learn how to build your first app with Xamarin.Android. Discover how to code the UI, create activities, and program behaviors.",
            author: "Adrian Stevens",
            year: "2017",
            display: true
        },
        {
            id: "609422",
            publisher: "lynda",
            title: "Career Clinic: Developer Insights",
            blob: "Get career advice and insights from tech [in]structors—practicing developers who teach for LinkedIn Learning.",
            author: "LinkedIn Learning Developer Instructor",
            year: "2017",
            display: true
        },
        {
            id: "9781492030775",
            publisher: "oreilly",
            title: "DevOps Kung Fu for Everyone",
            blob: "DevOps now is just about all the people doing the work to transform their businesses. This talk by Adam Jacob will help you find your own place in that new world.",
            author: "Adam Jacob",
            year: "2017",
            display: true
        },
        {
            publisher: "packet",
            title: "Ultimate CSS Grid Course: From Beginner to Advanced",
            blob: "Create CSS Grid layouts using the new grid system & use it together with CSS3 Flexbox and Sass for an amazing workflow",
            author: "Peter Sommerhoff",
            year: "2017",
            display: true
        }
    ],
    publisherList: ["lynda", "oreilly", "packet" ]
};