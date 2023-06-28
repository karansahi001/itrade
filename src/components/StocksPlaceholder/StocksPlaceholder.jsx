import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'

const StocksPlaceholder = () => {
  return (
    <Box sx={{ width: "100%", marginTop: 2 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  )
}

export default StocksPlaceholder