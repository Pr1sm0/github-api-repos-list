import React, { useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';
import { useGetReposQuery } from './store/slices/api.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getPageSelector } from './store/selectors/page.selector';
import { setNextPage, setPage, setPreviousPage } from './store/slices/page.slice';

const ITEMS_PER_PAGE = 3;

function App(): JSX.Element {
  const dispatch = useDispatch();
  const page = useSelector(getPageSelector);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const { data } = useGetReposQuery({ q: search || 'react', perPage: ITEMS_PER_PAGE, page });

  const numberOfPages = useMemo(() => Math.ceil(totalCount / ITEMS_PER_PAGE), [totalCount]);

  useEffect(() => {
    setTotalCount(data?.total_count > 20 ? 20 : data?.total_count);
  }, [data]);

  const handlePreviousClick = (): void => {
    dispatch(setPreviousPage());
  };
  const handleNextClick = (): void => {
    dispatch(setNextPage());
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <input placeholder="Search" className={styles.search} onChange={(e): void => setSearch(e.target.value)} />
        <div className={styles.repoContainer}>
          {search && totalCount < 1 && 'No repository was found for your request'}
          {data?.items.map((repo: any) => (
            <div key={repo.id} className={styles.repoItem}>
              <img
                src={repo.owner.avatar_url}
                alt="logo"
                width="144"
                style={{
                  borderRadius: '4px',
                }}
              />
              <div className={styles.repoContent}>
                <div style={{ marginRight: '10px' }}>
                  <h3 style={{ margin: 0 }}>{repo.name}</h3>
                  <p style={{ color: '#A5ADBB' }}>{repo.owner.login}</p>
                  <p style={{ color: '#A5ADBB' }}>{repo.language}</p>
                  <p style={{ color: '#6E798C' }}>{repo.description}</p>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/Vector.png" alt="icon" />
                    <p style={{ marginLeft: '10px' }}>
                      <b>{repo.stargazers_count}</b>
                      <span style={{ color: '#6E798C' }}> stars</span>
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/Level%20Icon.png" alt="icon" />
                    <p style={{ marginLeft: '10px' }}>
                      <b>{repo.watchers} watchers</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.paginationContainer}>
          {totalCount > 1 && (
            <button
              type="button"
              className={styles.paginationButton}
              onClick={handlePreviousClick}
              disabled={page === 1}
            >
              Previous
            </button>
          )}
          {Array.from({ length: numberOfPages }, (_, i) => i).map((i) => (
            <button
              key={i}
              type="button"
              className={`${styles.paginationButton} ${page === i + 1 ? styles.paginationButtonActive : ''}`}
              onClick={(): { payload: any; type: 'page/setPage' } => dispatch(setPage(i + 1))}
            >
              {i + 1}
            </button>
          ))}
          {totalCount > 1 && (
            <button
              type="button"
              className={styles.paginationButton}
              onClick={handleNextClick}
              disabled={page === numberOfPages}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
