import { memo } from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import { SessionItemProps } from '../../Interface/SessionInterface';

const SessionItem = memo(({ session, handleStatusChange }: SessionItemProps) => {
    const {
        presence,
        id,
        name: childname,
        avatar,
        start_time,
        child_id,
        end_time,
        group: { name },
    } = session;

    const getStatusClass = (presence: string) => {
        if (presence === 'unknown') {
            return 'unknown-status';
        } else if (presence === 'picked up') {
            return 'picked-up-status';
        } else {
            return 'present-status';
        }
    };
    return (
        <Card className={`session-card ${getStatusClass(presence)}`}>
            <CardContent>
                <Avatar src={avatar} alt="Avatar" sx={{ width: 40, height: 40 }} />

                <Typography variant="h5">{`${start_time} - ${end_time}`}</Typography>
                <div className="session-details">
                    <div>
                        <em>Child ID</em>
                    </div>
                    <div>{child_id}</div>
                </div>
                <div className="session-details">
                    <div>
                        <em>Child Name</em>
                    </div>
                    <div>{childname}</div>
                </div>
                <div className="session-details">
                    <div>
                        <em>Group</em>
                    </div>
                    <div>{name}</div>
                </div>
                <div className="session-details">
                    <div>
                        <em>Status</em>
                    </div>
                    <div>{presence}</div>
                </div>
                <Button variant="contained" onClick={() => handleStatusChange(id, presence)}>
                    Update Status
                </Button>
            </CardContent>
        </Card>
    );
});

export default SessionItem;
