import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Landing from './pages/landing/Landing';
import NotFound from "./pages/error/NotFound";
import OnBoarding from "./pages/onboarding/OnBoarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />
  },
  {
    path: "/onboarding",
    element: <OnBoarding />
  },
  {
    path: "/mypage",
    element: <div>Implement MyPage UI here!</div>,
  }
]);

const App = () => {
  return (
    <div className='md:w-[640px] h-dvh container mx-auto'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
