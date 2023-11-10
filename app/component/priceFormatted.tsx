
interface IPriceFormatted {
    price: number | null
    className?: string | null
}

const PriceFormatted = ({ price, className }: IPriceFormatted) => {
    return (
        <div className={`${className}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto', height: '100%' }}>
            {price && <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}} className="">{`${price.toString().split('.')[0]}`}</p>}
            {price && <p style={{display: 'flex', justifyContent: 'start', alignItems: 'start',height:'100%',fontSize:'17px'}}>{price.toString().split('.')[1] !== undefined ? `${price.toString().split('.')[1].slice(0, 2)}` : '00'}</p>}
        </div>
    )
}

export default PriceFormatted;
