import { LegalPage } from "./legal";
import { ResourcesPage } from "./premium-sections";
import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./shell";
import {
  ContactPage,
  HomePage,
  IdeasPage,
  NotFoundPage,
  ProcessPage,
  ProjectsPage,
  SectorsPage,
  SolutionDetailPage,
  SolutionsPage,
  AboutPage,
} from "./pages";

import { ServicesPage } from "./corporate";
import { PremiumHomePage } from "./premium";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: PremiumHomePage },
      { path: "unidades", Component: SolutionsPage },
      { path: "servicios", Component: ServicesPage },
      { path: "unidades/:solutionId", Component: SolutionDetailPage },
      { path: "soluciones", element: <Navigate to="/unidades" replace/> },
      { path: "soluciones/:solutionId", Component: SolutionDetailPage },
      { path: "sectores", Component: SectorsPage },
      { path: "proyectos", Component: ProjectsPage },
      { path: "recursos", Component: ResourcesPage },
      { path: "proceso", Component: ProcessPage },
      { path: "nosotros", Component: AboutPage },
      { path: "muro-de-ideas", Component: IdeasPage },
      { path: "contacto", Component: ContactPage },
      { path: "privacidad", element: <LegalPage type="privacidad" /> },
      { path: "terminos", element: <LegalPage type="terminos" /> },
      { path: "cookies", element: <LegalPage type="cookies" /> },
      { path: "proteccion-datos", element: <LegalPage type="proteccion-datos" /> },
      { path: "aviso-cookies", element: <LegalPage type="aviso-cookies" /> },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
