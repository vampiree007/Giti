import HomePage from './pages';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import RepoPage from './pages/repo/repo.page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import sagaActions from './redux/sagas/repo/repoSaga.action';

const App = () => {
  const dispatch = useDispatch();
  const { activeFilterDate, page } = useSelector(state => state.filter);

  // STEP 1: CHANGE IN DATE
  useEffect(() => {
    dispatch({
      type: sagaActions.FETCH_REPO_SAGA,
      payload: {
        date: activeFilterDate,
        page
      }
    })
  }, [activeFilterDate]);

  // STEP 2: FETCH AND ADD DATA
  useEffect(() => {
    if (page === 1) return
    dispatch({
      type: sagaActions.ADD_REPOS_SAGA,
      payload: {
        date: activeFilterDate,
        page
      }
    })
  }, [page])

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
