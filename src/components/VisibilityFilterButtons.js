import styled from '@emotion/styled/macro';

const VisibilityFiltersContainer = styled.div`
  margin: 10px 0;
`;

function VisibilityFilterButtons() {
  return (
    <VisibilityFiltersContainer>
      <button disabled>Show all</button>
      <button>Show completed</button>
      <button>Show active</button>
    </VisibilityFiltersContainer>
  );
}

export default VisibilityFilterButtons;
