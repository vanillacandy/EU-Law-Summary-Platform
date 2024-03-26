import React from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';
import PageHeaderComponent from "../components/PageHeaderComponent";
import NewDocumentComponent from "../components/GenerateNewSummaryComponent";

function NewSummary() {
    let {celex} = useParams();
    const location = useLocation();
    const {document} = location.state || {};

    return (
        <Container className="summaries-page">
            <PageHeaderComponent title={`Generate Summary with gpt-4`}/>
            <Row>
                <Col>
                    <NewDocumentComponent document={document}/>
                </Col>
            </Row>
        </Container>
    );
}

export default NewSummary;