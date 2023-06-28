import { Skeleton } from '@mui/material'

const NewsPlaceholder = () => {
  return (
    <>
      <article style={{ display: "flex" }}>
        <Skeleton variant="rectangular" width={180} height={100} animation="wave" />
        <div style={{ marginLeft: 2 }}>
          <Skeleton variant="text" width={150} height={30} animation="wave" />
          <Skeleton variant="text" width={150} height={20} animation="wave" />
          <Skeleton variant="text" width={180} height={20} animation="wave" />
        </div>
      </article >
      <article style={{ display: "flex", marginTop: "1rem" }}>
        <Skeleton variant="rectangular" width={180} height={100} animation="wave" />
        <div style={{ marginLeft: 2 }}>
          <Skeleton variant="text" width={150} height={30} animation="wave" />
          <Skeleton variant="text" width={150} height={20} animation="wave" />
          <Skeleton variant="text" width={180} height={20} animation="wave" />
        </div>
      </article>
    </>
  )
}

export default NewsPlaceholder