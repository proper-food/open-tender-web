import styled from '@emotion/styled'
import { ContainerSite } from '..'

const SliderArrowsView = styled.div`
  position: absolute;
  z-index: 12;
  left: 0;
  right: 0;
  bottom: ${(props) => props.theme.layout.padding};
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
      <ContainerSite>
        <SliderArrowsContent position={position}>
          {children}
        </SliderArrowsContent>
      </ContainerSite>
    </SliderArrowsView>
  )
}

SliderArrows.displayName = 'SliderArrows'

export default SliderArrows
