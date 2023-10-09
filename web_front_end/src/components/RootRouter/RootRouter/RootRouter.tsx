import { Route, Routes } from "react-router-dom";
import { ROUTE_HOME } from "../../../util/routes";
import Home from "../../../containers/Home/Home";

export default function Content() {
  return (
    <Routes>
      <Route path={ROUTE_HOME} element={<Home />}  />
    </Routes>
  );
}
