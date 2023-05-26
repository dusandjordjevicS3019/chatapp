import { useHistory } from 'react-router-dom'

import './PageNotFound.css'

const PageNotFound = ({ isLoggedIn }) => {
  const history = useHistory()

  const returnToHome = () => {
    isLoggedIn ? history.push('/lobby') : history.push('/')
  }

  return (
    <div className="pageNotFound">
      <div>
        <h1 className="pageNotFound__title">404</h1>
      </div>
      <div>
        <p>The page you're trying to reach has not been found.</p>
      </div>
      <div className="pageNotFound__buttons">
        <button className="pageNotFound__returnButton" onClick={returnToHome}>
          Go Back
        </button>
      </div>
    </div>
  )
}

export default PageNotFound
