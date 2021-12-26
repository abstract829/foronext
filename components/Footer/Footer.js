const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full py-4 text-center shadow text-violet-500 bg-slate-50 ">
      Developed by{" "}
      <strong
        className="cursor-pointer"
        onClick={() => window.open("https://mcarrasco-portafolio.netlify.app/")}
      >
        Maximiliano Carrasco
      </strong>{" "}
      &copy;
    </footer>
  );
};

export default Footer;
