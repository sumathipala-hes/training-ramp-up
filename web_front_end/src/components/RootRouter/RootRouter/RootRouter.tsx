import { Route, Routes } from "react-router-dom";
import { ROUTE_HOME } from "../../../util/routes";

export default function Content() {
  return (
    <Routes>
      <Route path={ROUTE_HOME}  />
    </Routes>
  );
}
