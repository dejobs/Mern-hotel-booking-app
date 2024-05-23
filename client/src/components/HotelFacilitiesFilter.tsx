import {hotelFacilities} from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelFacilitiesFilter = ({selectedFacilities, onChange}: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-lg font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2">
          <input
            className="rounded"
            type="checkbox"
            value={facility}
            onChange={onChange}
            checked={selectedFacilities.includes(facility)}
          />
          <span className="truncate">{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelFacilitiesFilter;
