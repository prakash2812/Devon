import { memo } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { SessionItemProps } from '../Interface/SessionInterface';

const SessionItem = memo(({ session, handleStatusChange }: SessionItemProps) => {
    const {
        presence,
        id,
        start_time,
        child_id,
        end_time,
        group: { name },
    } = session;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{`${start_time} - ${end_time}`}</Typography>
                <Typography className="session-details">
                    <p>
                        <em>Child ID</em>
                    </p>
                    <p>{child_id}</p>
                </Typography>
                <Typography className="session-details">
                    <p>
                        <em>Group</em>
                    </p>
                    <p>{name}</p>
                </Typography>
                <Typography className="session-details">
                    <p>
                        <em>Status</em>
                    </p>
                    <p>{presence}</p>
                </Typography>
                <Button variant="contained" onClick={() => handleStatusChange(id, presence)}>
                    Update Status
                </Button>
            </CardContent>
        </Card>
    );
});

export default SessionItem;
