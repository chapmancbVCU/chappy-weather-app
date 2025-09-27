import React, { useState } from "react";
import "@css/alerts.css";
import { Card, Button, Collapse } from 'react-bootstrap'; 
function AlertCard({ alert }) {

    const [open, setOpen] = useState(false);
    return (
        <Card className="alert-card my-3">
            <Card.Header>
                <Button
                    className="alert-button"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-text"
                    area-expand={open}
                    variant="link"
                >
                    {alert.event}
                </Button>
            </Card.Header>
            <Collapse in={open}>
                <div id="collapse-text">
                    <Card.Body>

                    </Card.Body>
                </div>
            </Collapse>
        </Card>
    );
}        
export default AlertCard;