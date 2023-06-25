const getColorClass = (color) => {
  switch (color) {
    case 0:
      return "purple-500";
    case 1:
      return "orange-500";
    case 2:
      return "green-500";
    default:
      return "";
  }
};

export const FeatureCard = ({ icon, title, desc, clr }) => {
  // const clrs = ["purple", "orange", "green"];
  // console.log(getColorClass(clr));
  return (
    <div className="h-96 w-80 rounded-lg  p-5 shadow-xl">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand/40 text-2xl font-semibold text-white shadow-xl shadow-brand/50`}
      >
        {icon}
      </div>
      <h1 className="my-5 text-lg font-bold">{title}</h1>
      <hr className={`h-1 w-20 bg-brand`} />
      <p className="text-md mt-5 font-semibold text-gray-600/80">{desc}</p>
    </div>
  );
};
