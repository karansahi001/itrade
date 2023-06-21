import { useDispatch } from 'react-redux';
import { updateNav } from '../../redux/navSlice';

const TrendingStocks = () => {
  const dispatch = useDispatch();

  dispatch(updateNav("trending"));
  return (
    <div>
      <h1>Trending</h1>
    </div>
  )
}

export default TrendingStocks