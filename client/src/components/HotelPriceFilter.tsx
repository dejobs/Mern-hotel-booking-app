type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const HotelPriceFilter = ({selectedPrice, onChange}: Props) => {
  return (
    <div className=" border-b border-slate-300 mb-5">
      <label className="flex flex-col">
        <h4 className="text-lg font-semibold mb-2">Max Price</h4>
        <select
          className="p-2 text-sm rounded-md border focus:outline-none"
          value={selectedPrice}
          onChange={(event) =>
            onChange(
              event.target.value ? parseInt(event.target.value) : undefined
            )
          }
        >
          <option value="">Select Max Price</option>
          {[50, 100, 200, 300, 400, 500].map((price) => (
            <option value={price}>{price}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default HotelPriceFilter;
