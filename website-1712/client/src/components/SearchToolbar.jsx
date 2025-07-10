import React from 'react';
import { Box, Grid, TextField, FormControl, Select, MenuItem, InputAdornment, InputLabel } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchToolBar = ({
    entityName = "Items",
    searchTerm = "",
    onSearchChange = () => { },
    selectedCategory = "",
    onCategoryChange = () => { },
    categoryOptions = [],
    sortOption = "",
    onSortChange = () => { },
    sortOptions = [],
    visibleCount = 10,
    onVisibleCountChange = () => { },
    showCountOptions = [10, 20],
    totalCount = 0, // for "All"
}) => {
    return (
        <Box sx={{ marginBottom: 4, marginTop: 4 }}>
            <Grid container spacing={2} alignItems="center">

                {/* Search Field */}
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label={`Search ${entityName}`}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Category Filter */}
                <Grid item xs={12} sm={6} md={2.5}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            label="Category"
                            sx={selectStyles}
                        >
                            <MenuItem value="">All</MenuItem>
                            {categoryOptions.map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Sort Option */}
                <Grid item xs={12} sm={6} md={2.5}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            onChange={(e) => onSortChange(e.target.value)}
                            label="Sort By"
                            sx={selectStyles}
                        >
                            <MenuItem value="">Sort By</MenuItem>
                            {sortOptions.map((s) => (
                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Show Count */}
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Show</InputLabel>
                        <Select
                            value={visibleCount}
                            onChange={(e) => onVisibleCountChange(Number(e.target.value))}
                            label="Show"
                            sx={selectStyles}
                        >
                            {showCountOptions.map((count) => (
                                <MenuItem key={count} value={count}>{count}</MenuItem>
                            ))}
                            <MenuItem value={totalCount}>All</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
        </Box>
    );
};

const selectStyles = {
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#177F2E',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#145c1d',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#177F2E',
    },
    color: '#000',
};
export default SearchToolBar;