interface ChoicesProps {
  state: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Choices: React.FC<ChoicesProps> = ({ state, name, handleChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={state}
        onChange={handleChange}
        className="h-5 w-5 bg-[#A657F6]"
      />
      <label htmlFor="amazon" className="text-xl font-medium">
        {name}
      </label>
    </div>
  );
};

export default Choices;
