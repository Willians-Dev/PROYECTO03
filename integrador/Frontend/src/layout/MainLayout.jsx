import Header from "../components/Header";
import { useEffect } from "react";
import PropTypes from "prop-types";

const MainLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainLayout;
