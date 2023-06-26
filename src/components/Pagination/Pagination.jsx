import React from 'react';
import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <Stack direction="row" justifyContent="center" mt={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        color="primary"
        sx={{
            '& .MuiPaginationItem-page.Mui-selected': {
              color: 'white', 
            },
          }}
      />
    </Stack>
  );
};

export default Pagination;