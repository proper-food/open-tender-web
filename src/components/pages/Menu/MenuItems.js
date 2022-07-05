import styled from '@emotion/styled'

const MenuItems = styled.div`
  display: grid;
  justify-content: center;
  padding: 0;
  gap: ${(props) => props.theme.layout.padding};
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1350px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 1.5rem;
  }

  & > div {
    margin: 0 0 2rem;
  }
`

export default MenuItems
