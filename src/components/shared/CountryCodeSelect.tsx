import { Select, type SelectProps } from 'antd'
import { COUNTRY_DIAL_OPTIONS, dialCodeForIso } from '../../lib/countryDialCodes'

type CountryCodeSelectProps = Omit<SelectProps<string>, 'options' | 'showSearch' | 'filterOption'>

/**
 * Searchable country code picker. Value is the ISO code ("IN"); closed it
 * reads "IN +91", the list reads "India (+91)" and searches name, code and dial.
 */
export function CountryCodeSelect({
  className = 'w-[7.5rem]',
  popupMatchSelectWidth = 280,
  labelRender = ({ value }) => `${String(value)} ${dialCodeForIso(String(value))}`,
  ...props
}: CountryCodeSelectProps) {
  return (
    <Select
      showSearch
      options={COUNTRY_DIAL_OPTIONS}
      filterOption={(input, option) =>
        String(option?.search ?? option?.label ?? '')
          .toLowerCase()
          .includes(input.trim().toLowerCase())
      }
      aria-label="Country code"
      className={className}
      popupMatchSelectWidth={popupMatchSelectWidth}
      labelRender={labelRender}
      {...props}
    />
  )
}
