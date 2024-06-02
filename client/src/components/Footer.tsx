const Footer = () => {
  return (
    <footer className="bg-teal-800 dark:bg-slate-700   py-6 shadow-md mt-auto ">
      <div className="container mx-auto flex justify-between ">
        <span className="text-lg sm:text-3xl text-white font-bold tracking-tight">
          TravelMaker.com
        </span>
        <span className="text-white text-base sm:text-xl font-semibold sm:font-bold tracking-tight flex gap-4 items-center ">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
