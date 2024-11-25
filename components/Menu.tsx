"use client";
interface MenuProps {
  open: boolean;
}
const Menu: React.FC<MenuProps> = ({ open }) => {
  return (
    <div
      className={`${open ? "pointer-events-auto block opacity-100" : "pointer-events-none hidden opacity-0"} absolute right-[67px] top-[67px] w-[200px] rounded-md bg-[#21262C] px-5 transition-all duration-200 ease-in-out`}
    >
      <p>Preferences</p>
      <button>Logout</button>
    </div>
  );
};

export default Menu;
