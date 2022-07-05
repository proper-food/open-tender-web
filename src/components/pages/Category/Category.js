import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentCategory,
  selectMenuSlug,
  setCurrentCategory,
} from '@open-tender/redux'

import { Content, Main, ScreenreaderTitle } from '../..'
import { MenuHeader, MenuCategory } from '../Menu'
import { Helmet } from 'react-helmet'
import { selectBrand } from '../../../slices'

const MenuCategoryView = styled.div``

const Category = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const category = useSelector(selectCurrentCategory)
  const { title: siteTitle } = useSelector(selectBrand)
  const menuSlug = useSelector(selectMenuSlug)

  useEffect(() => {
    if (!category) navigate(menuSlug)
  }, [category, navigate, menuSlug])

  useEffect(() => {
    return () => dispatch(setCurrentCategory(null))
  }, [dispatch])

  if (!category) return null

  return (
    <>
      <Helmet>
        <title>
          {category.name} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <MenuHeader backPath={menuSlug} />
        <Main>
          <ScreenreaderTitle>{category.name}</ScreenreaderTitle>
          <MenuCategoryView>
            <MenuCategory category={category} />
            {category.children.map((category) => (
              <MenuCategory
                key={category.id}
                category={category}
                isChild={true}
              />
            ))}
          </MenuCategoryView>
        </Main>
      </Content>
    </>
  )
}

export default Category
