import styled from '@emotion/styled/macro';
import { useDispatch, useSelector } from 'react-redux';

import { getVisibilityFilter } from '../redux/selectors';
import { setVisibilityFilter, VisibilityFilters } from '../redux/actions';

const VisibilityFiltersContainer = styled.div`
  margin: 10px 0;
`;

function VisibilityFilterButtons() {
  const dispatch = useDispatch();
  const activeFilter = useSelector(getVisibilityFilter);
  return (
    <VisibilityFiltersContainer>
      <button
        disabled={activeFilter === VisibilityFilters.SHOW_ALL}
        onClick={() => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))}
      >
        Show all
      </button>
      <button
        disabled={activeFilter === VisibilityFilters.SHOW_COMPLETED}
        onClick={() => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))}
      >
        Show completed
        </button>
      <button
        disabled={activeFilter === VisibilityFilters.SHOW_ACTIVE}
        onClick={() => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE))}
      >
        Show active
      </button>
    </VisibilityFiltersContainer>
  );
}

export default VisibilityFilterButtons;
