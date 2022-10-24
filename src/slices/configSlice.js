import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { capitalize } from '@open-tender/js'
import { OpenTenderAPI } from '@open-tender/redux'
import { isBrowser } from 'react-device-detect'

// for testing
// const baseUrl = 'http://httpstat.us'
const baseUrl = process.env.REACT_APP_API_URL
const authUrl = process.env.REACT_APP_AUTH_URL

const initialState = {
  app: null,
  brand: null,
  content: null,
  theme: null,
  settings: null,
  api: null,
  loading: 'idle',
  error: null,
  retries: 0,
}

const clientId = process.env.REACT_APP_CLIENT_ID
const brandId = process.env.REACT_APP_BRAND_ID

// fetch config via origin
export const fetchConfig =
  clientId && brandId
    ? // fetch config via explicit brandId and clientId
      createAsyncThunk('config/getConfig', async (_, thunkAPI) => {
        try {
          const options = { baseUrl, authUrl, clientId, brandId }
          const api = new OpenTenderAPI(options)
          const response = await api.getConfig()
          const app = { baseUrl, authUrl, clientId, brandId }
          return { ...response, app }
        } catch (err) {
          return thunkAPI.rejectWithValue(err)
        }
      }) // fetch config via origin
    : createAsyncThunk('config/getConfig', async (_, thunkAPI) => {
        try {
          const options = { baseUrl, authUrl }
          const api = new OpenTenderAPI(options)
          // for testing
          // const response = await api.getHttpResponse(503)
          const response = await api.getConfig()
          const brandId = response.brand.brandId
          const clientId = response.clientId
          const app = { baseUrl, authUrl, clientId, brandId }
          return { ...response, app }
        } catch (err) {
          return thunkAPI.rejectWithValue(err)
        }
      })

const remsToInt = (rems) => {
  return parseInt(parseFloat(rems.replace('rem', '')) * 10, 10)
}

const remsToFloat = (rems) => {
  return parseFloat(rems.replace('rem', ''))
}

const intToRems = (int) => {
  return `${(int / 10).toFixed(2)}rem`
}

const flaotToRems = (n) => {
  return `${n.toFixed(3)}rem`
}

const adjustTheme = (theme) => {
  const { inputs } = theme
  const {
    bottomBorderOnly,
    paddingVertical,
    fontSize,
    fontSizeMobile,
    lineHeight,
    borderWidth,
  } = inputs
  const fontSizeFloat = remsToFloat(fontSize)
  const fontSizeMobileFloat = remsToFloat(fontSizeMobile)
  const selectSizeFloat = fontSizeFloat * parseFloat(lineHeight)
  const selectSizeMobileFloat = fontSizeMobileFloat * parseFloat(lineHeight)
  const selectSize = flaotToRems(selectSizeFloat)
  const selectSizeMobile = flaotToRems(selectSizeMobileFloat)
  const showLabel = true
  const paddingVerticalInt = remsToInt(paddingVertical)
  const paddingVerticalFloat = remsToFloat(paddingVertical)
  const borderWidthFloat = remsToFloat(borderWidth)
  let selectPaddingBottom = flaotToRems(paddingVerticalFloat + borderWidthFloat)
  let paddingTop = paddingVertical
  let paddingBottom = paddingVertical
  let paddingTopActive = paddingVertical
  let paddingBottomActive = paddingVertical
  let offset = '0'
  if (bottomBorderOnly) {
    const bottom = paddingVerticalInt / 2
    const top = paddingVerticalInt + bottom
    offset = intToRems(-top)
    paddingTop = intToRems(top)
    paddingBottom = intToRems(bottom)
    paddingTopActive = intToRems(top)
    paddingBottomActive = intToRems(bottom)
    const paddingBottomFloat = remsToFloat(paddingBottom)
    selectPaddingBottom = flaotToRems(paddingBottomFloat + borderWidthFloat)
  } else if (showLabel) {
    const bottom = paddingVerticalInt / 3
    const top = paddingVerticalInt + paddingVerticalInt * (2 / 3)
    offset = intToRems(bottom - paddingVerticalInt)
    paddingTopActive = intToRems(top)
    paddingBottomActive = intToRems(bottom)
  }
  const borderLeft = bottomBorderOnly ? 0.0 : remsToFloat(borderWidth)
  const iconLeft = flaotToRems(borderLeft + 1.0)
  const paddingIcon = '3.8rem'
  const label = { fontSize: '1.2rem', fontSizeMobile: '1.0rem', offset }
  const newInputs = {
    ...inputs,
    label,
    showLabel,
    showOutline: false,
    paddingTop,
    paddingBottom,
    paddingTopActive,
    paddingBottomActive,
    borderStyle: 'solid',
    selectSize,
    selectSizeMobile,
    selectPaddingBottom,
    paddingIcon,
    iconLeft,
  }
  return { ...theme, inputs: newInputs }
}

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    resetConfig: () => initialState,
    resetRetries: (state) => {
      state.retries = 0
    },
    incrementRetries: (state) => {
      state.retries = state.retries + 1
    },
  },
  extraReducers: {
    [fetchConfig.fulfilled]: (state, action) => {
      const { app, brand, content, theme, settings } = action.payload
      state.app = app
      state.brand = brand
      state.content = content
      state.theme = adjustTheme(theme)
      state.settings = settings
      state.loading = 'idle'
      state.api = new OpenTenderAPI(app)
      state.error = null
      state.retries = 0
    },
    [fetchConfig.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchConfig.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },
  },
})

export const { resetConfig, resetRetries, incrementRetries } =
  configSlice.actions

export const selectBrand = (state) => state.config.brand
export const selectTheme = (state) => state.config.theme
export const selectConfig = (state) => state.config.content
export const selectContent = (state) => state.config.content
export const selectSettings = (state) => state.config.settings
export const selectApi = (state) => state.config.api

export const selectContentSection = (page) => (state) =>
  state.config.content[page]

export const selectHasCatering = (state) => {
  const { orderTypes } = state.config.settings
  return orderTypes.includes('CATERING')
}

export const selectCateringOnly = (state) => {
  const { orderTypes } = state.config.settings
  return !!(orderTypes.includes('CATERING') && orderTypes.length === 1)
}

export const selectAccountConfig = (state) => state.config.content.account

export const selectOutpostName = (state) =>
  capitalize(state.config.settings.locationName.OUTPOST[0])

export const selectDisplaySettings = (state) => {
  const orderType = state.data.order.orderType || 'OLO'
  return state.config.settings.displaySettings[orderType]
}

export const selectConfigRetries = (state) => state.config.retries

export const selectLightColor = (state) =>
  state.theme ? state.theme.colors.light : '#ffffff'

export const selectOptIns = (state) => {
  const { accepts_marketing, order_notifications } = state.config.brand
  return { accepts_marketing, order_notifications }
}

export const selectFulfillment = (state) => state.config.brand.fulfillment

export const selectRecaptcha = (state) => state.config.settings.recaptcha

export const selectHeaderHeight = (state) => {
  if (!state.config.theme) return 0
  const { navHeight, navHeightMobile } = state.config.theme.layout
  const height = isBrowser ? navHeight : navHeightMobile
  return parseInt(height.replace('rem', '')) * 10
}

export default configSlice.reducer
