import React from 'react'
import { ListGroupItem, Row, Col, Image } from 'react-bootstrap'
import thumbnailImg from './thumbnail-150-100.jpg'

const CourseRow = ({course}) => {
    return(
        <ListGroupItem href="#link1">
            <Row className="show-grid">
                <Col xsHidden md={2}>
                    <Image src={thumbnailImg} thumbnail responsive alt={`${course.title} thumbnail`}/>
                </Col>
                <Col md={9}>
                    <p>{course.title} with {course.author} by {course.publisher}</p>
                    <p>{course.blob}</p>
                </Col>
            </Row>
        </ListGroupItem>
    )
};

export default CourseRow;