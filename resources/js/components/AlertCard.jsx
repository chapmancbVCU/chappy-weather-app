import React, { useState } from "react";
import "@css/alerts.css";
import { Card, Button, Collapse } from 'react-bootstrap'; 

/**
 * Renders card with information about a particular alert.
 * 
 * @property {object} alert The alert object with data from national weather agency.
 * @param {InputProp} param0 
 * @returns {JSX.Element} The AlertCard component.
 */
function AlertCard({ alert }) {
    /**
     * Manages state of card body so user can reveal and hide it.
     * @type {[boolean, import('react').Dispatch<import('react').SetStateAction<string>>]}
     */
    const [open, setOpen] = useState(false);

    return (
        <Card className="alert-card my-3">
            <Card.Header>
                <Button
                    className="alert-button text-black"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-text"
                    aria-expanded={open}
                    variant="link"
                >
                    {alert.event}
                </Button>
            </Card.Header>
            <Collapse in={open}>
                <div id="collapse-text">
                    <Card.Body>
                        <div>
                            <strong>Issued by:</strong>
                            <p>{alert.sender_name}</p>
                        </div>
                        <div>
                            <strong>Description:</strong>
                            <div className="alert-description">{alert.description}</div>
                        </div>
                    </Card.Body>
                </div>
            </Collapse>
        </Card>
    );
}        
export default AlertCard;