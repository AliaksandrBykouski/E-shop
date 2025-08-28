export interface IProductSubtitleProps {
  subtitleClassName: string
  subtitleRectClassName?: string
}

export interface IProductItemActionBtnProps {
  text: string
  iconClass: string
  callback?: () => VoidFunction
  marginBottom?: number
  spinner?: boolean
  withTooltip?: boolean
}

export interface IProductAvailableProps {
  vendorCode: string
  inStock: number
}
