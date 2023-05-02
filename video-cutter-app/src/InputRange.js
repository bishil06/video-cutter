export default function InputRange({maxRange, setValue, value}) {
    return (<input className="inputRange" type="range" max={`${maxRange}`} onChange={(e) => setValue(e.target.value)} value={value}></input>)
}