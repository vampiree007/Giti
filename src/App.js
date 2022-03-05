import HomePage from './pages';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import RepoPage from './pages/repo/repo.page';
import { useDispatch, useSelector } from 'react-redux';
import { addRepoData, setRepoData } from './redux/features/repo.slice';
import { useEffect } from 'react';
import axioz from './configs/axios.config';

const App = () => {
  const dispatch = useDispatch();
  const { activeFilterDate, page } = useSelector(state => state.filter);

  // STEP 1: CHANGE IN DATE
  useEffect(() => {
    fetchRepos(setRepoData, 1);
  }, [activeFilterDate]);

  // STEP 2: FETCH AND ADD DATA
  useEffect(() => {
    if (page === 1) return
    fetchRepos(addRepoData, page)
  }, [page])

  // FETCHES REPOS FROM GIT
  const fetchRepos = (func, pageNo) => {
    let date = new Date(activeFilterDate);
    date = date.toISOString().slice(0, 10);
    axioz.get(`/repositories?q=created:>${date}&sort=stars&order=desc&per_page=20&page=${pageNo}`).then(res => {
      res = pageNo === 1 ? res.data : res.data?.items;
      dispatch(func(res))
    })
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/repo/:repoName" element={<RepoPage />} />
      </Routes>
    </Router>
  )
}

export default App;
