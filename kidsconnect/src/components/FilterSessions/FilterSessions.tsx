import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SessionFilterProps } from '../../Interface/SessionInterface';

const FilterSessions = ({ selectedGroups, listOfGroups, handleGroupFilter }: SessionFilterProps) => {
    return (
        <FormControl className="session-filter">
            <InputLabel>Filter by Groups</InputLabel>
            <Select
                multiple
                value={selectedGroups}
                onChange={handleGroupFilter}
                renderValue={(selected) => (selected as string[]).join(', ')}>
                <MenuItem value="" disabled={selectedGroups.length === 0}>
                    <em>Clear All Filter</em>
                </MenuItem>
                {listOfGroups.map((group) => (
                    <MenuItem key={group} value={group}>
                        {group}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterSessions;
