import styled from '@emotion/styled'
import { Container } from '..'

const SliderArrowsView = styled.div`
  position: absolute;
  z-index: 12;
  left: 0;
  right: 0;
  bottom: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    bottom: ${(props) => props.theme.layout.paddingMobile};
  }
`

const SliderArrowsContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.position === 'RIGHT' ? 'flex-end' : 'flex-start'};
`

const SliderArrows = ({ position = 'RIGHT', children }) => {
  return (
    <SliderArrowsView>
      <Container>
        <SliderArrowsContent position={position}>
          {children}
        </SliderArrowsContent>
      </Container>
    </SliderArrowsView>
  )
}

SliderArrows.displayName = 'SliderArrows'

export default SliderArrows
