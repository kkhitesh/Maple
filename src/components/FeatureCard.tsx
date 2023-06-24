export const FeatureCard = ({ icon, title, desc, clr }) => {
  const clrs = ["purple", "orange", "green"];
  return (
    <div className="h-96 w-80 rounded-lg  p-5 shadow-xl">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-${clrs[clr]}-500 to-${clrs[clr]}-500/50 text-2xl font-semibold text-white shadow-xl shadow-${clrs[clr]}-300`}
      >
        {icon}
      </div>
      <h1 className="my-5 text-lg font-bold">{title}</h1>
      <hr className={`h-1 w-20 bg-${clrs[clr]}-500`} />
      <p className="text-md mt-5 font-semibold text-gray-600/80">{desc}</p>
    </div>
  );
};
