import { Icons } from './resolver'

function Icon({
  name,
  size,
  onClick,
  raw,
  color,
  disabled,
  bgColor,
  rounded
}) {
  const IconSVG = Icons[name]

  return (
    raw ? 
      <IconSVG size={size} color={color} />
    : <button
        type='button'
        disabled={disabled}
        onClick={!disabled ? onClick : () => {}}
        style={{
          width: '2.5rem',
          height : '2.5rem',
          background: `${bgColor || 'transparent'}`,
          outline:'none',
          border:'none',
          cursor:'pointer',
          borderRadius: `${rounded ? '20px' : '0px'}`,
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}
    >
        <IconSVG size={size} color={color}/>
    </button>
  )
}

Icon.defaultProps = {
    size: 25,
    onClick: () => undefined,
    raw: false,
    noHighlights: false,
    variant: 'primary',
    disabled: false,
    rounded: false
}

export default Icon