import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const SearchInput = ({ title, postChange }) => {
    return (
        <div style={{ marginTop: 50, marginLeft: '40%' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={title}
                sx={{ width: 300 }}
                renderInput={(params) => {
                    postChange(params.inputProps.value)
                    return <TextField {...params}
                        autoFocus
                        label="Search your Title Here"
                        name="search-input"
                        data-testId="search-input"
                        id="search-input"
                    />
                }}
            />
        </div>
    )
}

export default SearchInput
