import { useState } from 'react';
import './app.scss';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/loader';
import Popup from '../popup/popup';
import { changeSearchField } from '../../reducers/searchSlice';
import SkillsList from '../skillsList/skilsList';

export default function App() {
  const [searchQuery, setSearchQuery] = useState();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.searchSliceReducer);
  const message = <span>Type something to search...</span>;
  const indent = <div style={ { display: 'inline-block', width: '220px' } } />;
  const loader = loading ? <Loader /> : null;
  const popup = error ? <Popup text={error} /> : '';

  const handleOnChange = (value) => {
    setSearchQuery(value);
    dispatch(changeSearchField({ search: value }));
  };

  return (
    <>
      {loader}
      {popup}
      {searchQuery === '' ? message : indent}
      <input
        type='text'
        className='searchString'
        value={searchQuery}
        onChange={(ev) => handleOnChange(ev.target.value)}
      />
      <SkillsList />
    </>
  );
};